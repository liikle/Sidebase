import { IDEAS } from './ideas.ts'

/**
 * sitemap.xml and robots.txt are generated per request by the Worker, using the site's
 * public origin (SITE_URL if set, otherwise the host the request came in on). That way they
 * are correct on *.workers.dev today and on a custom domain later, without a rebuild.
 */

const STATIC_ROUTES: [path: string, priority: string, changefreq: string][] = [
  ['/', '1.0', 'weekly'],
  ['/find', '0.9', 'monthly'],
  ['/explore', '0.9', 'weekly'],
  ['/about', '0.6', 'monthly'],
  ['/contact', '0.4', 'yearly'],
  ['/terms', '0.2', 'yearly'],
  ['/privacy', '0.2', 'yearly'],
  ['/refunds', '0.2', 'yearly'],
]

export function sitemapRoutes(): [string, string, string][] {
  return [...STATIC_ROUTES, ...IDEAS.map((i): [string, string, string] => [`/explore/${i.id}`, '0.7', 'monthly'])]
}

export function buildSitemap(origin: string): string {
  const base = origin.replace(/\/+$/, '')
  const urls = sitemapRoutes()
    .map(
      ([path, priority, freq]) =>
        `  <url><loc>${base}${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots(origin: string): string {
  const base = origin.replace(/\/+$/, '')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /report',
    'Disallow: /results',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ].join('\n')
}
