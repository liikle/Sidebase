import { topMatches } from '../../shared/scoring.ts'
import type { Answers, Report } from '../../shared/types.ts'
import { DETAILS } from './content/index.ts'

export const REPORT_SIZE = 10

export function buildReport(answers: Answers, generatedAt = new Date()): Report {
  const items = topMatches(answers, REPORT_SIZE).map((m) => {
    const details = DETAILS[m.idea.id]
    if (!details) throw new Error(`Missing report content for idea "${m.idea.id}"`)
    return { ...m, details }
  })
  return { version: 1, answers, generatedAt: generatedAt.toISOString(), items }
}
