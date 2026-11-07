import { describe, expect, it } from 'vitest'
import { IDEAS } from '../shared/ideas.ts'
import { rankIdeas, topMatches } from '../shared/scoring.ts'
import { decodeAnswers, encodeAnswers, validateAnswers } from '../shared/questions.ts'
import type { Answers } from '../shared/types.ts'

const base: Answers = {
  goal: 'freelancing',
  budget: 'free',
  time: '5-10',
  skills: ['video-editing'],
  interests: ['content-creation', 'social-media'],
  workStyle: 'clients',
  experience: 'beginner',
}

describe('catalog', () => {
  it('has at least 50 unique ideas', () => {
    expect(IDEAS.length).toBeGreaterThanOrEqual(50)
    expect(new Set(IDEAS.map((i) => i.id)).size).toBe(IDEAS.length)
  })
})

describe('scoring', () => {
  it('is deterministic', () => {
    expect(rankIdeas(base).map((r) => r.idea.id)).toEqual(rankIdeas(base).map((r) => r.idea.id))
  })

  it('surfaces video work for a video editor', () => {
    const top = topMatches(base, 3).map((r) => r.idea.id)
    expect(top.some((id) => ['clip-editor', 'freelance-video-editor', 'podcast-production'].includes(id))).toBe(true)
  })

  it('surfaces programming ideas for developers', () => {
    const top = topMatches(
      { ...base, skills: ['programming'], interests: ['software'], goal: 'scale', workStyle: 'products', budget: '200-500', time: '20-40', experience: 'advanced' },
      3,
    ).map((r) => r.idea.category)
    expect(top.every((c) => c === 'software' || c === 'digital-products')).toBe(true)
  })

  it('never ranks unaffordable ideas first on a $0 budget', () => {
    const top = topMatches({ ...base, skills: ['research', 'marketing'], interests: ['ecommerce'], goal: 'scale' }, 5)
    expect(top.every((r) => r.idea.startupCost.min <= 50)).toBe(true)
  })

  it('handles "no skills yet"', () => {
    const top = topMatches({ ...base, skills: ['none'], interests: ['online-services'], goal: 'extra-money' }, 3)
    expect(top.every((r) => r.idea.beginnerFriendly)).toBe(true)
  })

  it('scores are within 1–98 with reasons', () => {
    for (const r of rankIdeas(base)) {
      expect(r.score).toBeGreaterThanOrEqual(1)
      expect(r.score).toBeLessThanOrEqual(98)
    }
    expect(topMatches(base, 1)[0].reasons.length).toBeGreaterThan(0)
  })
})

describe('answers encoding', () => {
  it('round-trips', () => {
    const enc = encodeAnswers(base)
    expect(enc.length).toBeLessThan(500)
    expect(decodeAnswers(enc)).toEqual(base)
  })
  it('rejects invalid answers', () => {
    expect(validateAnswers({ ...base, goal: 'nope' })).toBeNull()
    expect(validateAnswers({ ...base, skills: [] })).toBeNull()
    expect(validateAnswers({ ...base, skills: ['writing', 'hacking'] })).toBeNull()
    expect(decodeAnswers('garbage')).toBeNull()
  })
  it('drops "none" when combined with real skills', () => {
    expect(validateAnswers({ ...base, skills: ['none', 'writing'] })?.skills).toEqual(['writing'])
  })
})
