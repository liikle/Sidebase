/**
 * Cloudflare Worker entry for Sidebase.
 *
 * Static files (the built React app in ./dist) are served by Workers Static Assets.
 * Only requests under /api/* reach this script (see `run_worker_first` in wrangler.jsonc);
 * everything else goes straight to the assets, with SPA fallback to index.html.
 */
import { handleCheckout } from '../functions/api/checkout.ts'
import { handleHealth } from '../functions/api/health.ts'
import { handleReport } from '../functions/api/report.ts'
import { handleStripeWebhook } from '../functions/api/stripe-webhook.ts'
import { type Env, errorJson } from '../functions/_lib/env.ts'

interface WorkerEnv extends Env {
  ASSETS: Fetcher
}

type Handler = (request: Request, env: WorkerEnv) => Response | Promise<Response>

const ROUTES: Record<string, { method: 'GET' | 'POST'; handler: Handler }> = {
  '/api/health': { method: 'GET', handler: (_req, env) => handleHealth(env) },
  '/api/report': { method: 'GET', handler: handleReport },
  '/api/checkout': { method: 'POST', handler: handleCheckout },
  '/api/stripe-webhook': { method: 'POST', handler: handleStripeWebhook },
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (!pathname.startsWith('/api/')) return env.ASSETS.fetch(request)

    const route = ROUTES[pathname.replace(/\/+$/, '')]
    if (!route) return errorJson('Not found', 404, 'not_found')

    const method = request.method === 'HEAD' && route.method === 'GET' ? 'GET' : request.method
    if (method !== route.method) {
      const res = errorJson('Method not allowed', 405, 'method_not_allowed')
      res.headers.set('allow', route.method)
      return res
    }

    try {
      return await route.handler(request, env)
    } catch (err) {
      console.error('unhandled_api_error', pathname, err instanceof Error ? err.message : err)
      return errorJson('Something went wrong. Please try again.', 500, 'internal_error')
    }
  },
} satisfies ExportedHandler<WorkerEnv>
