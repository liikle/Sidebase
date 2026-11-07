/**
 * Cloudflare Worker entry for Sidebase.
 *
 * Static files (the built React app in ./dist) are served by Workers Static Assets.
 * Only /api/*, /sitemap.xml and /robots.txt reach this script (see `run_worker_first` in
 * wrangler.jsonc); everything else goes straight to the assets, with SPA fallback to index.html.
 */
import { handleCheckout } from '../functions/api/checkout.ts'
import { handleHealth } from '../functions/api/health.ts'
import { handleReport } from '../functions/api/report.ts'
import { handleStripeWebhook } from '../functions/api/stripe-webhook.ts'
import { type Env, errorJson } from '../functions/_lib/env.ts'
import { buildRobots, buildSitemap } from '../shared/sitemap.ts'

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
    const url = new URL(request.url)
    const { pathname } = url

    if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
      const origin = env.SITE_URL || url.origin
      const xml = pathname === '/sitemap.xml'
      return new Response(xml ? buildSitemap(origin) : buildRobots(origin), {
        headers: {
          'content-type': xml ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8',
          'cache-control': 'public, max-age=3600',
        },
      })
    }

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
