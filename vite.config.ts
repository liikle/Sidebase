import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { IDEAS } from './shared/ideas.ts'

const SITE_URL = 'https://sidebase.cc'

/** Emits sitemap.xml at build time from the static routes and the idea catalog. */
function sitemap(): Plugin {
  return {
    name: 'sidebase-sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const routes: [string, string, string][] = [
        ['/', '1.0', 'weekly'],
        ['/find', '0.9', 'monthly'],
        ['/explore', '0.9', 'weekly'],
        ['/about', '0.6', 'monthly'],
        ['/contact', '0.4', 'yearly'],
        ['/terms', '0.2', 'yearly'],
        ['/privacy', '0.2', 'yearly'],
        ['/refunds', '0.2', 'yearly'],
        ...IDEAS.map((i): [string, string, string] => [`/explore/${i.id}`, '0.7', 'monthly']),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, priority, freq]) =>
      `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: {
    alias: { '@shared': fileURLToPath(new URL('./shared', import.meta.url)) },
  },
  server: {
    // During `npm run dev`, forward API calls to `wrangler pages dev` (see README).
    proxy: {
      '/api': 'http://127.0.0.1:8788',
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
})
