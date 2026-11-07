import { describe, expect, it } from 'vitest'
import { IDEAS } from '../shared/ideas.ts'
import { DETAILS } from '../functions/_lib/content/index.ts'
import { buildReport } from '../functions/_lib/report.ts'
import { SESSION_ID_RE, hmacSha256Hex, verifyStripeSignature } from '../functions/_lib/stripe.ts'

describe('premium content', () => {
  it('exists for every idea and nothing else', () => {
    expect(Object.keys(DETAILS).sort()).toEqual(IDEAS.map((i) => i.id).sort())
  })
  it('is complete for every idea', () => {
    for (const [id, d] of Object.entries(DETAILS)) {
      const ctx = `idea ${id}`
      expect(d.overview.length, ctx).toBeGreaterThan(150)
      expect(d.requirements.length, ctx).toBeGreaterThanOrEqual(3)
      expect(d.tools.length, ctx).toBeGreaterThanOrEqual(3)
      expect(d.steps.length, ctx).toBeGreaterThanOrEqual(5)
      expect(d.firstCustomer.length, ctx).toBeGreaterThanOrEqual(2)
      expect(d.firstSale.length, ctx).toBeGreaterThanOrEqual(2)
      expect(d.mistakes.length, ctx).toBeGreaterThanOrEqual(3)
      expect(d.scaling.length, ctx).toBeGreaterThanOrEqual(3)
    }
  })
  it('builds a 10-item report', () => {
    const r = buildReport({
      goal: 'passive', budget: 'free', time: 'lt5', skills: ['none'], interests: ['digital-products'], workStyle: 'any', experience: 'beginner',
    })
    expect(r.items).toHaveLength(10)
    expect(r.items[0].details.steps.length).toBeGreaterThan(0)
  })
})

describe('stripe webhook signatures', () => {
  const secret = 'whsec_test_secret'
  const body = JSON.stringify({ id: 'evt_1', type: 'checkout.session.completed' })
  const now = 1_700_000_000

  it('accepts a valid signature', async () => {
    const sig = await hmacSha256Hex(secret, `${now}.${body}`)
    expect(await verifyStripeSignature(body, `t=${now},v1=${sig}`, secret, 300, now)).toBe(true)
  })
  it('accepts when one of several v1 signatures matches', async () => {
    const sig = await hmacSha256Hex(secret, `${now}.${body}`)
    expect(await verifyStripeSignature(body, `t=${now},v1=deadbeef,v1=${sig},v0=abc`, secret, 300, now)).toBe(true)
  })
  it('rejects a tampered body', async () => {
    const sig = await hmacSha256Hex(secret, `${now}.${body}`)
    expect(await verifyStripeSignature(body + ' ', `t=${now},v1=${sig}`, secret, 300, now)).toBe(false)
  })
  it('rejects the wrong secret', async () => {
    const sig = await hmacSha256Hex('whsec_other', `${now}.${body}`)
    expect(await verifyStripeSignature(body, `t=${now},v1=${sig}`, secret, 300, now)).toBe(false)
  })
  it('rejects stale timestamps (replay protection)', async () => {
    const sig = await hmacSha256Hex(secret, `${now}.${body}`)
    expect(await verifyStripeSignature(body, `t=${now},v1=${sig}`, secret, 300, now + 301)).toBe(false)
  })
  it('rejects missing headers', async () => {
    expect(await verifyStripeSignature(body, null, secret)).toBe(false)
    expect(await verifyStripeSignature(body, 'garbage', secret)).toBe(false)
  })
})

describe('session id validation', () => {
  it('accepts Stripe checkout session ids and rejects others', () => {
    expect(SESSION_ID_RE.test('cs_test_a1B2c3D4e5F6g7H8i9J0')).toBe(true)
    expect(SESSION_ID_RE.test('cs_live_a1B2c3D4e5F6g7H8i9J0')).toBe(true)
    expect(SESSION_ID_RE.test('pi_123')).toBe(false)
    expect(SESSION_ID_RE.test('cs_test_../../etc')).toBe(false)
  })
})
