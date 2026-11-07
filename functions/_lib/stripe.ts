import type { Env } from './env.ts'

const API = 'https://api.stripe.com/v1'

export class StripeError extends Error {
  constructor(
    message: string,
    public status: number,
    public type?: string,
  ) {
    super(message)
  }
}

/** Minimal Stripe REST client using fetch — no SDK needed on Workers. */
export async function stripe<T = Record<string, unknown>>(
  env: Env,
  method: 'GET' | 'POST',
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  if (!env.STRIPE_SECRET_KEY) throw new StripeError('Stripe is not configured', 503, 'not_configured')
  const body = params ? new URLSearchParams(params).toString() : undefined
  const url = method === 'GET' && body ? `${API}${path}?${body}` : `${API}${path}`
  const res = await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
      'stripe-version': '2024-06-20',
    },
    body: method === 'POST' ? body : undefined,
  })
  const data = (await res.json()) as T & { error?: { message?: string; type?: string } }
  if (!res.ok) {
    throw new StripeError(data.error?.message ?? `Stripe request failed (${res.status})`, res.status, data.error?.type)
  }
  return data
}

const encoder = new TextEncoder()

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ])
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)))
}

/**
 * Verifies a `Stripe-Signature` header exactly as Stripe's SDKs do:
 * HMAC-SHA256 over `${timestamp}.${rawBody}` compared against every v1 signature,
 * with a timestamp tolerance to prevent replay attacks.
 */
export async function verifyStripeSignature(
  rawBody: string,
  header: string | null,
  secret: string,
  toleranceSeconds = 300,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  if (!header || !secret) return false
  let timestamp: string | undefined
  const signatures: string[] = []
  for (const part of header.split(',')) {
    const [k, v] = part.split('=', 2).map((s) => s.trim())
    if (k === 't') timestamp = v
    if (k === 'v1' && v) signatures.push(v)
  }
  if (!timestamp || signatures.length === 0) return false
  const ts = Number(timestamp)
  if (!Number.isFinite(ts) || Math.abs(nowSeconds - ts) > toleranceSeconds) return false
  const expected = await hmacSha256Hex(secret, `${timestamp}.${rawBody}`)
  return signatures.some((sig) => timingSafeEqual(sig, expected))
}

export const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/
