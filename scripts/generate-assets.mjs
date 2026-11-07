// Renders the social preview image and PNG icons from HTML using Playwright.
// Usage: node scripts/generate-assets.mjs   (requires Playwright + Chromium)
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
// Node 22+ strips TypeScript types natively, so the brand module is the single source of truth.
import { lockupSvg, markSvg } from '../shared/brand.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const font = readFileSync(`${root}node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2`).toString('base64')
const sized = (svg, w, h) => svg.replace(/width="[^"]*" height="[^"]*"/, `width="${w}" height="${h}"`)
const squareMark = (size, id) => sized(markSvg({ square: true, id }), size, size)

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
  <div style="position:relative;display:flex;align-items:center;">
    ${sized(lockupSvg('onDark', 'og'), 344, 55)}
  </div>
  <div style="position:relative;margin-top:auto;">
    <div style="font-size:84px;line-height:1.02;font-weight:600;letter-spacing:-.045em;max-width:900px;">Your Next Income Stream <span style="color:#7DD3FC">Starts Here.</span></div>
    <div style="margin-top:28px;font-size:28px;color:#94A3B8;max-width:860px;line-height:1.4;">Online business ideas and side hustles matched to your skills, budget and time.</div>
  </div>
  <div style="position:relative;margin-top:44px;display:flex;gap:14px;font-size:20px;color:#94A3B8;">
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">7 quick questions</span>
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">Free matches</span>
    <span style="border:1px solid #2A364D;border-radius:999px;padding:10px 18px;">One-time report, no subscription</span>
  </div>
</div>`

const icon = (size, pad) => `${base}<div style="width:${size}px;height:${size}px;background:#080B12;display:flex;align-items:center;justify-content:center;">${squareMark(size - pad * 2, 'i' + size)}</div>`
const plainMark = (size) => `${base}<style>body{background:transparent}</style><div style="width:${size}px;height:${size}px;">${squareMark(size, 'p' + size)}</div>`

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
await shot(icon(180, 30), 180, 180, 'apple-touch-icon.png')
await shot(icon(192, 32), 192, 192, 'icon-192.png')
await shot(icon(512, 86), 512, 512, 'icon-512.png')
await shot(plainMark(32), 32, 32, 'favicon-32.png', true)
// PNG exports of the logo for social profiles, Stripe branding, etc.
const lockupPng = `${base}<style>body{background:#080B12}</style><div style="padding:120px 140px;">${sized(lockupSvg('onDark', 'lp'), 1874, 300)}</div>`
await shot(lockupPng, 2154, 540, '../brand/sidebase-logo.png')
await shot(`${base}<style>body{background:transparent}</style>${sized(lockupSvg('onDark', 'lt'), 1874, 300)}`, 1874, 300, '../brand/sidebase-logo-transparent.png', true)
await shot(icon(1024, 170), 1024, 1024, '../brand/sidebase-icon-1024.png')
writeFileSync(`${root}brand/sidebase-logo.svg`, lockupSvg('onDark'))
writeFileSync(`${root}brand/sidebase-logo-on-light.svg`, lockupSvg('onLight'))
writeFileSync(`${root}brand/sidebase-mark.svg`, markSvg())
writeFileSync(`${root}public/favicon.svg`, markSvg({ square: true, padding: 8, id: 'fav' }))
console.log('wrote brand/*.svg and public/favicon.svg')
await browser.close()
