import { decodeAnswers } from '../../shared/questions.ts'
import { type Env, PRODUCT_KEY, errorJson, json } from '../_lib/env.ts'
import { type PurchaseRecord, getPurchase, savePurchase } from '../_lib/purchases.ts'
import { buildReport } from '../_lib/report.ts'
import { SESSION_ID_RE, StripeError, stripe } from '../_lib/stripe.ts'

interface RetrievedSession {
  id: string
  livemode: boolean
  status: 'open' | 'complete' | 'expired'
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  metadata?: Record<string, string>
  payment_intent: null | { id: string; latest_charge: null | { refunded: boolean } }
}

/**
 * GET /api/report?session_id=cs_...
 *
 * Returns the full report only for a verified payment:
 *  1. Purchases recorded by the signed Stripe webhook (KV) are trusted directly.
 *  2. If the webhook has not arrived yet, the session is fetched from Stripe with the
 *     secret key (server-to-server) and must be `paid`. The redirect alone is never trusted.
 */
export async function handleReport(request: Request, env: Env): Promise<Response> {
  const sessionId = new URL(request.url).searchParams.get('session_id') ?? ''
  if (!SESSION_ID_RE.test(sessionId)) return errorJson('Invalid purchase reference.', 400, 'invalid_session')

  let record: PurchaseRecord | null = await getPurchase(env, sessionId)

  if (!record) {
    let session: RetrievedSession
    try {
      session = await stripe<RetrievedSession>(env, 'GET', `/checkout/sessions/${sessionId}`, {
        'expand[]': 'payment_intent.latest_charge',
      })
    } catch (err) {
      if (err instanceof StripeError && err.status === 404) {
        return errorJson('We could not find this purchase.', 404, 'not_found')
      }
      console.error('session_lookup_failed', err instanceof Error ? err.message : err)
      return errorJson('We could not verify your payment right now. Please retry.', 502, 'stripe_error')
    }

    if (session.metadata?.product !== PRODUCT_KEY || !session.metadata.answers) {
      return errorJson('We could not find this purchase.', 404, 'not_found')
    }
    if (session.payment_status !== 'paid') {
      if (session.status === 'complete') return json({ status: 'pending' }, 202)
      return errorJson('This checkout has not been paid.', 402, 'unpaid')
    }
    if (session.payment_intent?.latest_charge?.refunded) {
      return errorJson('This purchase was refunded, so the report is no longer available.', 410, 'refunded')
    }

    record = {
      sessionId: session.id,
      answers: session.metadata.answers,
      paidAt: new Date().toISOString(),
      livemode: session.livemode,
      source: 'api',
    }
    await savePurchase(env, record, session.payment_intent?.id)
  }

  if (record.revoked) {
    return errorJson('This purchase was refunded, so the report is no longer available.', 410, 'refunded')
  }

  const answers = decodeAnswers(record.answers)
  if (!answers) return errorJson('Your report data is corrupted. Please contact support.', 500, 'corrupt')

  return json({ status: 'paid', report: buildReport(answers, new Date(record.paidAt)) })
}

/** Cloudflare Pages Functions entry (the Worker in worker/index.ts calls handleReport directly). */
export const onRequestGet: PagesFunction<Env> = ({ request, env }) => handleReport(request, env)
