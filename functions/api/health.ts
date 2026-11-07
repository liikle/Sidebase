import { type Env, json } from '../_lib/env.ts'

/** GET /api/health — deployment check. Reveals only whether things are configured, never values. */
export const handleHealth = (env: Env): Response =>
  json({
    ok: true,
    payments: Boolean(env.STRIPE_SECRET_KEY),
    webhook: Boolean(env.STRIPE_WEBHOOK_SECRET),
    purchasesStore: Boolean(env.PURCHASES),
    mode: env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : env.STRIPE_SECRET_KEY ? 'test' : 'unset',
  })

/** Cloudflare Pages Functions entry. */
export const onRequestGet: PagesFunction<Env> = ({ env }) => handleHealth(env)
