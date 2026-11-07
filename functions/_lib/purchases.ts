import type { Env } from './env.ts'

/**
 * A verified purchase. Deliberately contains no personal data:
 * only the Checkout Session id, the encoded quiz answers and timestamps.
 */
export interface PurchaseRecord {
  sessionId: string
  answers: string
  paidAt: string
  livemode: boolean
  source: 'webhook' | 'api'
  revoked?: boolean
}

const TWO_YEARS = 60 * 60 * 24 * 365 * 2

export async function getPurchase(env: Env, sessionId: string): Promise<PurchaseRecord | null> {
  if (!env.PURCHASES) return null
  return (await env.PURCHASES.get<PurchaseRecord>(`session:${sessionId}`, 'json')) ?? null
}

export async function savePurchase(env: Env, record: PurchaseRecord, paymentIntentId?: string | null): Promise<void> {
  if (!env.PURCHASES) return
  await env.PURCHASES.put(`session:${record.sessionId}`, JSON.stringify(record), { expirationTtl: TWO_YEARS })
  if (paymentIntentId) {
    await env.PURCHASES.put(`pi:${paymentIntentId}`, record.sessionId, { expirationTtl: TWO_YEARS })
  }
}

export async function revokeByPaymentIntent(env: Env, paymentIntentId: string): Promise<boolean> {
  if (!env.PURCHASES) return false
  const sessionId = await env.PURCHASES.get(`pi:${paymentIntentId}`)
  if (!sessionId) return false
  const record = await getPurchase(env, sessionId)
  if (!record) return false
  await savePurchase(env, { ...record, revoked: true })
  return true
}
