import { encodeAnswers, validateAnswers } from '../../shared/questions.ts'
import { REPORT_PRICE } from '../../shared/pricing.ts'
import { type Env, PRODUCT_KEY, errorJson, json } from '../_lib/env.ts'
import { StripeError, stripe } from '../_lib/stripe.ts'

/**
 * POST /api/checkout
 * Body: { answers: Answers, consent: true }
 * Creates a Stripe Checkout Session for the one-time report purchase and returns its URL.
 */
export async function handleCheckout(request: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_SECRET_KEY) {
    return errorJson('Payments are not configured yet. Please try again later.', 503, 'not_configured')
  }
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > 8_192) return errorJson('Request too large.', 413)

  let body: { answers?: unknown; consent?: unknown }
  try {
    body = await request.json()
  } catch {
    return errorJson('Invalid request body.', 400)
  }

  const answers = validateAnswers(body.answers)
  if (!answers) return errorJson('Your answers look incomplete. Please retake the finder.', 400, 'invalid_answers')
  if (body.consent !== true) {
    return errorJson('Please accept the terms and digital delivery conditions to continue.', 400, 'consent_required')
  }

  const origin = (env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '')
  const encoded = encodeAnswers(answers)

  const params: Record<string, string> = {
    mode: 'payment',
    submit_type: 'pay',
    success_url: `${origin}/report?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/results?checkout=canceled`,
    'line_items[0][quantity]': '1',
    'metadata[product]': PRODUCT_KEY,
    'metadata[answers]': encoded,
    'payment_intent_data[metadata][product]': PRODUCT_KEY,
    'payment_intent_data[description]': REPORT_PRICE.productName,
    allow_promotion_codes: 'true',
    billing_address_collection: 'auto',
    'custom_text[submit][message]':
      'One-time payment — no subscription. By paying you request immediate access to your digital report and acknowledge that your statutory right of withdrawal ends once the report is delivered. See sidebase.cc/refunds.',
  }

  if (env.STRIPE_PRICE_ID) {
    params['line_items[0][price]'] = env.STRIPE_PRICE_ID
  } else {
    params['line_items[0][price_data][currency]'] = REPORT_PRICE.currency
    params['line_items[0][price_data][unit_amount]'] = String(REPORT_PRICE.amount)
    params['line_items[0][price_data][product_data][name]'] = REPORT_PRICE.productName
    params['line_items[0][price_data][product_data][description]'] = REPORT_PRICE.productDescription
  }

  try {
    const session = await stripe<{ id: string; url: string }>(env, 'POST', '/checkout/sessions', params)
    return json({ url: session.url, id: session.id })
  } catch (err) {
    console.error('checkout_session_failed', err instanceof Error ? err.message : err)
    const status = err instanceof StripeError && err.status === 503 ? 503 : 502
    return errorJson('We could not start checkout. Please try again in a moment.', status, 'stripe_error')
  }
}

/** Cloudflare Pages Functions entry (the Worker in worker/index.ts calls handleCheckout directly). */
export const onRequestPost: PagesFunction<Env> = ({ request, env }) => handleCheckout(request, env)
