import { describe, expect, it } from 'vitest'
import { LOGO, lockupSvg, markSvg } from '../shared/brand.ts'

describe('brand logo', () => {
  it('has the expected proportions', () => {
    expect(LOGO.width / LOGO.height).toBeCloseTo(6.26, 1)
    expect(LOGO.markWidth).toBeLessThan(LOGO.width)
  })
  it('produces self-contained SVGs with unique, prefixed ids', () => {
    const svg = lockupSvg('onDark', 'x1')
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('id="x1-a"')
    expect(svg).toContain(LOGO.colors.cc)
    expect(svg).not.toContain('id="sb-')
    expect(lockupSvg('onLight')).toContain(LOGO.colors.wordOnLight)
  })
  it('builds a square mark for favicons', () => {
    const svg = markSvg({ square: true, padding: 8 })
    const [, , w, h] = svg.match(/viewBox="([^"]+)"/)![1].split(' ').map(Number)
    expect(w).toBeCloseTo(h, 5)
  })
})
