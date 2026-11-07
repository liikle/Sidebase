// Renders the social preview image and PNG icons from HTML using Playwright.
// Usage: node scripts/generate-assets.mjs   (requires Playwright + Chromium)
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const font = readFileSync(`${root}node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2`).toString('base64')
const mark = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#38BDF8"/><rect x="8" y="8.5" width="10" height="3.5" rx="1.75" fill="#080B12"/><rect x="14" y="14.25" width="10" height="3.5" rx="1.75" fill="#080B12"/><rect x="8" y="20" width="16" height="3.5" rx="1.75" fill="#080B12"/></svg>`

const base = `
<style>
@font-face { font-family: Geist; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { font-family: Geist, sans-serif; background: #080B12; color: #F8FAFC; -webkit-font-smoothing: antialiased; }
</style>`

const og = `${base}
<div style="width:1200px;height:630px;position:relative;overflow:hidden;padding:72px 80px;display:flex;flex-direction:column;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(to right,rgba(148,163,184,.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(148,163,184,.07) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 70% 0%,#000 30%,transparent 75%);"></div>
  <div style="position:absolute;right:-160px;top:-260px;width:820px;height:620px;border-radius:50%;background:radial-gradient(closest-side,rgba(56,189,248,.22),transparent);"></div>
  <div style="position:relative;display:flex;align-items:center;gap:16px;">
    ${mark(48)}
    <span style="font-size:26px;font-weight:700;letter-spacing:.14em;">SIDE<span style="color:#38BDF8">BASE</span></span>
  </div>
  <div style="position:relative;margin-top:auto;">
    <div style="font-size:84px;line-height:1.02;font-weight:600;letter-spacing:-.045em;max-width:900px;">Your Next Income Stream <span style="color:#7DD3FC">Starts Here.</span></div>
    <div style="margin-top:28px;font-size:28px;color:#94A3B8;max-width:860px;line-height:1.4;">Online business ideas and side hustles matched to your skills, budget and time.</div>
  </div>
  <div style="position:relative;margin-top:44px;display:flex;gap:14px;font-size:20px;color:#94A3B8;">
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">7 quick questions</span>
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">Free matches</span>
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">sidebase.cc</span>
  </div>
</div>`

const icon = (size, pad) => `${base}<div style="width:${size}px;height:${size}px;background:#080B12;display:flex;align-items:center;justify-content:center;">${mark(size - pad * 2)}</div>`
const plainMark = (size) => `${base}<style>body{background:transparent}</style><div style="width:${size}px;height:${size}px;">${mark(size)}</div>`

const browser = await chromium.launch()
const shot = async (html, w, h, out, transparent = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${root}public/${out}`, omitBackground: transparent })
  await page.close()
  console.log('wrote', out)
}
await shot(og, 1200, 630, 'og-image.png')
await shot(icon(180, 22), 180, 180, 'apple-touch-icon.png')
await shot(icon(192, 24), 192, 192, 'icon-192.png')
await shot(icon(512, 64), 512, 512, 'icon-512.png')
await shot(plainMark(32), 32, 32, 'favicon-32.png', true)
await browser.close()
