import { type Env, PRODUCT_KEY, errorJson, json } from '../_lib/env.ts'
import { revokeByPaymentIntent, savePurchase } from '../_lib/purchases.ts'
import { verifyStripeSignature } from '../_lib/stripe.ts'

interface CheckoutSessionObject {
  id: string
  livemode: boolean
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  payment_intent: string | null
  metadata?: Record<string, string>
}

interface ChargeObject {
  payment_intent: string | null
  refunded: boolean
}

/**
 * POST /api/stripe-webhook
 * Receives Stripe events, verifies their signature and records verified purchases.
 * Subscribe the endpoint to:
 *   checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded
 */
export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_WEBHOOK_SECRET) return errorJson('Webhook not configured', 503)

  const rawBody = await request.text()
  const valid = await verifyStripeSignature(rawBody, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET)
  if (!valid) return errorJson('Invalid signature', 400)

  let event: { type: string; data: { object: unknown } }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return errorJson('Invalid payload', 400)
  }

  if (!env.PURCHASES) {
    console.warn('PURCHASES KV binding missing — purchase not recorded; /api/report will verify via the Stripe API instead.')
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as CheckoutSessionObject
      if (session.metadata?.product !== PRODUCT_KEY || !session.metadata.answers) break
      if (session.payment_status !== 'paid') break // async methods: wait for async_payment_succeeded
      await savePurchase(
        env,
        {
          sessionId: session.id,
          answers: session.metadata.answers,
          paidAt: new Date().toISOString(),
          livemode: session.livemode,
          source: 'webhook',
        },
        session.payment_intent,
      )
      break
    }
    case 'charge.refunded': {
      const charge = event.data.object as ChargeObject
      if (charge.refunded && charge.payment_intent) await revokeByPaymentIntent(env, charge.payment_intent)
      break
    }
    default:
      break
  }

  return json({ received: true })
}

/** Cloudflare Pages Functions entry (the Worker in worker/index.ts calls handleStripeWebhook directly). */
export const onRequestPost: PagesFunction<Env> = ({ request, env }) => handleStripeWebhook(request, env)
