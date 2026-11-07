export interface Env {
  /** Stripe secret key (sk_test_… or sk_live_…). Set as an encrypted secret. */
  STRIPE_SECRET_KEY?: string
  /** Signing secret of the Stripe webhook endpoint (whsec_…). Set as an encrypted secret. */
  STRIPE_WEBHOOK_SECRET?: string
  /** Optional Stripe Price ID for the report. If unset, an inline $7.99 price is used. */
  STRIPE_PRICE_ID?: string
  /** Canonical site URL, e.g. https://sidebase.cc. Falls back to the request origin. */
  SITE_URL?: string
  /** KV namespace that records verified purchases (no personal data). */
  PURCHASES?: KVNamespace
}

export const PRODUCT_KEY = 'sidebase-report-v1'

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  })
}

export function errorJson(message: string, status: number, code?: string): Response {
  return json({ error: message, code }, status)
}
