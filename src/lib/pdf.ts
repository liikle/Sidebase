import { LOGO, lockupSvg } from '@shared/brand'
import { DIFFICULTY_LABEL, formatCost, formatHours } from '@shared/ideas'
import type { Report, ReportItem } from '@shared/types'
import { profileRows } from '../components/results/ProfileSummary'

type RGB = [number, number, number]
const C = {
  ink: [8, 11, 18] as RGB,
  ink2: [20, 27, 41] as RGB,
  line: [226, 232, 240] as RGB,
  lineDark: [36, 48, 71] as RGB,
  sky: [56, 189, 248] as RGB,
  skyDeep: [2, 132, 199] as RGB,
  text: [15, 23, 42] as RGB,
  body: [51, 65, 85] as RGB,
  muted: [100, 116, 139] as RGB,
  white: [248, 250, 252] as RGB,
  mutedDark: [148, 163, 184] as RGB,
}

/** The built-in PDF fonts only cover Latin-1; normalize typographic characters. */
function clean(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/…/g, '...')
    .replace(/→/g, '->')
    .replace(/[^\x20-\x7E\xA0-\xFF\n]/g, '')
}

/** Rasterizes an SVG string to a PNG data URL (used to embed the vector logo crisply). */
async function svgToPng(svg: string, width: number, height: number): Promise<string> {
  const img = new Image()
  img.decoding = 'async'
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Logo could not be rendered'))
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  })
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  ctx.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL('image/png')
}

export async function downloadReportPdf(report: Report): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const ratio = LOGO.width / LOGO.height
  const RASTER_H = 240
  const [logoOnDark, logoOnLight] = await Promise.all([
    svgToPng(lockupSvg('onDark', 'pdfd'), Math.round(RASTER_H * ratio), RASTER_H),
    svgToPng(lockupSvg('onLight', 'pdfl'), Math.round(RASTER_H * ratio), RASTER_H),
  ])
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const M = 48
  const CW = W - M * 2
  let y = M

  const font = (style: 'normal' | 'bold', size: number, color: RGB) => {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.setTextColor(...color)
  }

  /** Draws the Sidebase lockup with its top-left corner at (x, top) and the given height in points. */
  const drawLogo = (x: number, top: number, h: number, variant: 'onDark' | 'onLight') => {
    doc.addImage(variant === 'onDark' ? logoOnDark : logoOnLight, 'PNG', x, top, h * ratio, h, undefined, 'FAST')
  }

  const generated = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // ───────────── Cover ─────────────
  doc.setFillColor(...C.ink)
  doc.rect(0, 0, W, H, 'F')
  drawLogo(M, M, 26, 'onDark')

  font('normal', 10, C.sky)
  doc.text('PERSONAL REPORT', M, 128)
  font('bold', 38, C.white)
  doc.text('Your Side Hustle', M, 170)
  doc.text('Report', M, 210)
  font('normal', 12, C.mutedDark)
  doc.text(clean(`Prepared ${generated} - your top ${report.items.length} matches with launch plans.`), M, 238)

  // Profile box
  let py = 268
  doc.setFillColor(...C.ink2)
  doc.setDrawColor(...C.lineDark)
  const rows = profileRows(report.answers)
  const rowH = 22
  doc.roundedRect(M, py, CW, rows.length * rowH + 40, 10, 10, 'FD')
  font('bold', 9, C.mutedDark)
  doc.text('YOUR PROFILE', M + 20, py + 26)
  py += 46
  rows.forEach(([k, v]) => {
    font('normal', 9.5, C.mutedDark)
    doc.text(k, M + 20, py)
    font('normal', 10.5, C.white)
    const lines = doc.splitTextToSize(clean(v), CW - 150)
    doc.text(lines[0] + (lines.length > 1 ? '...' : ''), M + 130, py)
    py += rowH
  })

  // Top matches table
  py += 26
  font('bold', 9, C.mutedDark)
  doc.text('YOUR TOP MATCHES', M, py)
  py += 16
  report.items.forEach((item, i) => {
    doc.setDrawColor(...C.lineDark)
    doc.line(M, py, M + CW, py)
    py += 15
    font('normal', 9, C.mutedDark)
    doc.text(String(i + 1).padStart(2, '0'), M, py)
    font('normal', 10.5, C.white)
    doc.text(clean(item.idea.name), M + 26, py)
    font('normal', 9.5, C.mutedDark)
    doc.text(clean(formatCost(item.idea.startupCost)), M + CW - 120, py)
    font('bold', 10.5, C.sky)
    doc.text(`${item.score}%`, M + CW, py, { align: 'right' })
    py += 7
  })

  font('normal', 8, C.muted)
  doc.text(
    doc.splitTextToSize(
      'Match scores show how well each opportunity fits your answers. They are not income predictions. Sidebase provides educational information only and does not guarantee earnings.',
      CW,
    ),
    M,
    H - 46,
  )

  // ───────────── Idea pages ─────────────
  let pageNo = 1

  const footer = () => {
    font('normal', 8, C.muted)
    doc.text(window.location.host, M, H - 26)
    doc.text(String(pageNo), W - M, H - 26, { align: 'right' })
  }

  const newPage = (title?: string) => {
    doc.addPage()
    pageNo++
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, W, H, 'F')
    drawLogo(M, 29, 15, 'onLight')
    if (title) {
      font('normal', 8.5, C.muted)
      doc.text(clean(title), W - M, 42, { align: 'right' })
    }
    doc.setDrawColor(...C.line)
    doc.line(M, 58, W - M, 58)
    footer()
    y = 84
  }

  let currentTitle = ''
  const ensure = (h: number) => {
    if (y + h > H - 56) newPage(currentTitle)
  }

  const paragraph = (text: string, size = 10.5, color: RGB = C.body, indent = 0, lineGap = 1.5) => {
    font('normal', size, color)
    const lines: string[] = doc.splitTextToSize(clean(text), CW - indent)
    const lh = size * lineGap
    for (const line of lines) {
      ensure(lh)
      doc.text(line, M + indent, y)
      y += lh
    }
  }

  const heading = (n: number, text: string) => {
    ensure(48)
    y += 14
    font('bold', 8.5, C.skyDeep)
    doc.text(String(n).padStart(2, '0'), M, y)
    font('bold', 13, C.text)
    doc.text(clean(text), M + 22, y)
    y += 18
  }

  const bullets = (items: string[], marker: 'dot' | 'num' = 'dot') => {
    items.forEach((it, i) => {
      font('normal', 10.5, C.body)
      const lines: string[] = doc.splitTextToSize(clean(it), CW - 22)
      ensure(lines.length * 15.75 + 4)
      if (marker === 'dot') {
        doc.setFillColor(...C.sky)
        doc.circle(M + 4, y - 3.5, 2, 'F')
      } else {
        font('bold', 9.5, C.skyDeep)
        doc.text(`${i + 1}.`, M, y)
        font('normal', 10.5, C.body)
      }
      lines.forEach((l) => {
        doc.text(l, M + 22, y)
        y += 15.75
      })
      y += 4
    })
  }

  const ideaSection = (item: ReportItem, index: number) => {
    const { idea, details } = item
    currentTitle = `#${index + 1} ${idea.name}`
    newPage(currentTitle)

    font('normal', 9, C.skyDeep)
    doc.text(`MATCH #${index + 1}`, M, y)
    y += 24
    font('bold', 24, C.text)
    const titleLines: string[] = doc.splitTextToSize(clean(idea.name), CW - 90)
    titleLines.forEach((l) => {
      doc.text(l, M, y)
      y += 28
    })
    // Score badge
    doc.setFillColor(240, 249, 255)
    doc.setDrawColor(186, 230, 253)
    doc.roundedRect(W - M - 74, y - 28 * titleLines.length - 22, 74, 40, 8, 8, 'FD')
    font('bold', 16, C.skyDeep)
    doc.text(`${item.score}%`, W - M - 37, y - 28 * titleLines.length + 2, { align: 'center' })
    font('normal', 7.5, C.muted)
    doc.text('MATCH', W - M - 37, y - 28 * titleLines.length + 11, { align: 'center' })

    paragraph(idea.tagline, 11.5, C.muted)
    y += 10

    // Stats grid
    const stats: [string, string][] = [
      ['Startup cost', formatCost(idea.startupCost)],
      ['Weekly time', formatHours(idea.weeklyHours)],
      ['Difficulty', DIFFICULTY_LABEL[idea.difficulty]],
      ['First revenue', idea.timeToFirstRevenue.split(' (')[0]],
    ]
    const cw = (CW - 18) / 4
    ensure(56)
    stats.forEach(([k, v], i) => {
      const x = M + i * (cw + 6)
      doc.setFillColor(248, 250, 252)
      doc.setDrawColor(...C.line)
      doc.roundedRect(x, y, cw, 48, 6, 6, 'FD')
      font('normal', 8, C.muted)
      doc.text(k.toUpperCase(), x + 10, y + 18)
      font('bold', 10.5, C.text)
      doc.text(clean(v), x + 10, y + 35)
    })
    y += 62
    font('normal', 9.5, C.muted)
    paragraph(`Business model: ${idea.businessModel}  |  Monetization: ${idea.monetization.join(', ')}`, 9.5, C.muted)

    heading(1, 'What the business is')
    paragraph(details.overview)

    heading(2, 'Why it matches you')
    bullets(item.reasons)
    if (item.cautions.length) {
      y += 2
      font('bold', 9.5, C.text)
      ensure(16)
      doc.text('Keep in mind', M, y)
      y += 15
      bullets(item.cautions)
    }

    heading(3, 'What you need to start')
    bullets(details.requirements)

    heading(4, 'Recommended tools')
    details.tools.forEach((t) => {
      font('bold', 10.5, C.text)
      const lines: string[] = doc.splitTextToSize(clean(t.use), CW - 22)
      ensure(16 + lines.length * 15)
      doc.setFillColor(...C.sky)
      doc.circle(M + 4, y - 3.5, 2, 'F')
      doc.text(clean(t.name), M + 22, y)
      y += 15
      font('normal', 10, C.muted)
      lines.forEach((l) => {
        doc.text(l, M + 22, y)
        y += 15
      })
      y += 3
    })

    heading(5, 'Step-by-step launch plan')
    details.steps.forEach((s, i) => {
      font('normal', 10.5, C.body)
      const lines: string[] = doc.splitTextToSize(clean(s.detail), CW - 30)
      ensure(20 + lines.length * 15.75)
      doc.setFillColor(...C.sky)
      doc.circle(M + 8, y - 4, 8, 'F')
      font('bold', 8.5, C.ink)
      doc.text(String(i + 1), M + 8, y - 1, { align: 'center' })
      font('bold', 11, C.text)
      doc.text(clean(s.title), M + 30, y)
      y += 16
      font('normal', 10.5, C.body)
      lines.forEach((l) => {
        doc.text(l, M + 30, y)
        y += 15.75
      })
      y += 6
    })

    heading(6, 'How to find your first customer')
    bullets(details.firstCustomer)
    heading(7, 'How to make your first sale')
    bullets(details.firstSale)
    heading(8, 'Common mistakes to avoid')
    bullets(details.mistakes)
    heading(9, 'Ways to scale')
    bullets(details.scaling)
  }

  report.items.forEach((item, i) => ideaSection(item, i))

  // Closing page notes
  currentTitle = 'Notes'
  ensure(120)
  y += 24
  doc.setDrawColor(...C.line)
  doc.line(M, y, W - M, y)
  y += 24
  paragraph(
    'This report was generated by Sidebase from your answers using a deterministic matching system. Startup costs, time requirements and timelines are typical ranges, not guarantees. Your results depend on your effort, skills, market and circumstances. Sidebase does not guarantee any earnings.',
    9,
    C.muted,
  )

  doc.save(`sidebase-report-${report.generatedAt.slice(0, 10)}.pdf`)
}
