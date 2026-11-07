import { IDEAS, formatCost } from './ideas.ts'
import { BUDGETS, GOALS, INTERESTS, SKILLS, labelFor } from './questions.ts'
import type {
  Answers,
  BudgetId,
  Difficulty,
  ExperienceId,
  GoalId,
  Idea,
  MatchResult,
  SkillId,
  TimeId,
} from './types.ts'

/**
 * Deterministic matching. Same answers → same results, every time.
 *
 * Each idea gets a 0–1 fit on seven dimensions, which are combined with the
 * weights below. Hard constraints (budget, time) also apply a multiplier so an
 * idea you cannot afford never outranks one you can.
 */
export const WEIGHTS = {
  skills: 24,
  interests: 20,
  budget: 14,
  time: 12,
  goal: 11,
  workStyle: 11,
  experience: 8,
} as const

const BUDGET_MAX: Record<BudgetId, number> = {
  free: 0,
  'under-50': 50,
  '50-200': 200,
  '200-500': 500,
  '500-plus': Number.POSITIVE_INFINITY,
}

const HOURS: Record<TimeId, number> = {
  lt5: 4,
  '5-10': 8,
  '10-20': 15,
  '20-40': 30,
  'full-time': 45,
}

const DIFFICULTY_FIT: Record<ExperienceId, Record<Difficulty, number>> = {
  beginner: { 1: 1, 2: 0.6, 3: 0.15 },
  some: { 1: 1, 2: 0.85, 3: 0.45 },
  intermediate: { 1: 0.8, 2: 1, 3: 0.8 },
  advanced: { 1: 0.65, 2: 0.9, 3: 1 },
}

const GOAL_PHRASE: Record<GoalId, string> = {
  'extra-money': 'making extra money',
  'full-time': 'building a full-time online business',
  passive: 'creating passive income',
  freelancing: 'starting freelancing',
  scale: 'building something that can scale',
}

const STYLE_PHRASE = {
  independent: 'Lets you work completely independently',
  clients: 'Built around working directly with clients',
  products: 'Create once and sell repeatedly',
  audience: 'Grows by building an audience',
} as const

const realSkills = (skills: SkillId[]) => skills.filter((s): s is Exclude<SkillId, 'none'> => s !== 'none')

function listJoin(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function skillFit(idea: Idea, userSkills: SkillId[]): number {
  const mine = new Set(realSkills(userSkills))
  const coreHits = idea.skills.filter((s) => mine.has(s)).length
  const bonusHits = idea.bonusSkills.filter((s) => mine.has(s)).length

  if (mine.size === 0) {
    // No particular skills yet: favor ideas anyone can start.
    if (idea.skills.length === 0) return 0.9
    return idea.beginnerFriendly ? 0.38 : 0.12
  }
  if (idea.skills.length === 0) {
    return Math.min(1, 0.7 + bonusHits * 0.12)
  }
  const coverage = coreHits / idea.skills.length
  return Math.min(1, coverage * 0.82 + Math.min(bonusHits, 2) * 0.09 + (coverage === 0 ? 0.05 : 0))
}

function interestFit(idea: Idea, interests: Answers['interests']): number {
  if (interests.includes(idea.category)) return 1
  const hits = idea.interests.filter((i) => interests.includes(i)).length
  if (hits >= 2) return 0.85
  if (hits === 1) return 0.7
  return 0.1
}

function budgetFit(idea: Idea, budget: BudgetId): number {
  const max = BUDGET_MAX[budget]
  const need = idea.startupCost.min
  if (need <= max) return 1
  if (max === 0) return need <= 20 ? 0.6 : 0
  return Math.max(0, 1 - (need - max) / need) * 0.8
}

function timeFit(idea: Idea, time: TimeId): number {
  const have = HOURS[time]
  const need = idea.weeklyHours.min
  if (have >= need) return 1
  const r = have / need
  return Math.max(0, r * r)
}

function experienceFit(idea: Idea, experience: ExperienceId): number {
  let fit = DIFFICULTY_FIT[experience][idea.difficulty]
  if (experience === 'beginner' && idea.beginnerFriendly) fit = Math.min(1, fit + 0.15)
  if (experience === 'beginner' && !idea.beginnerFriendly) fit *= 0.75
  return fit
}

export function scoreIdea(idea: Idea, a: Answers): MatchResult {
  const f = {
    skills: skillFit(idea, a.skills),
    interests: interestFit(idea, a.interests),
    budget: budgetFit(idea, a.budget),
    time: timeFit(idea, a.time),
    goal: idea.goals.includes(a.goal) ? 1 : 0.3,
    workStyle:
      a.workStyle === 'any' ? 0.85 : idea.workStyles.includes(a.workStyle) ? 1 : 0.2,
    experience: experienceFit(idea, a.experience),
  }

  let raw = 0
  for (const k of Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]) raw += f[k] * WEIGHTS[k]

  // Hard constraints: being unable to afford or fit an idea matters more than a weighted average implies.
  if (f.budget < 0.5) raw *= 0.7
  if (f.time < 0.5) raw *= 0.85

  const score = Math.max(1, Math.min(98, Math.round(raw)))

  // ---------- Explanations ----------
  const reasons: string[] = []
  const cautions: string[] = []
  const mine = realSkills(a.skills)
  const matchedSkills = [...idea.skills, ...idea.bonusSkills]
    .filter((s) => mine.includes(s))
    .map((s) => labelFor(SKILLS, s).toLowerCase())

  if (matchedSkills.length > 0) {
    reasons.push(`Puts your ${listJoin(matchedSkills.slice(0, 3))} skills to work`)
  } else if (idea.skills.length === 0) {
    reasons.push('No specific skills required to get started')
  }

  const missing = idea.skills.filter((s) => !mine.includes(s)).map((s) => labelFor(SKILLS, s).toLowerCase())
  if (missing.length > 0) {
    cautions.push(`You will need to build ${listJoin(missing)} skills — budget time for learning`)
  }

  const interestHit = idea.interests.find((i) => a.interests.includes(i))
  if (interestHit) reasons.push(`Matches your interest in ${labelFor(INTERESTS, interestHit).toLowerCase()}`)

  if (f.budget === 1) {
    reasons.push(
      idea.startupCost.min === 0
        ? 'Can be started for $0'
        : `Fits your budget (${labelFor(BUDGETS, a.budget)}) — typical startup cost ${formatCost(idea.startupCost)}`,
    )
  } else {
    cautions.push(`Usually needs at least $${idea.startupCost.min.toLocaleString('en-US')} to start properly`)
  }

  if (f.time === 1) {
    reasons.push(`Works with the time you have — progress starts at about ${idea.weeklyHours.min} hours a week`)
  } else {
    cautions.push(`Works best with at least ${idea.weeklyHours.min} hours a week`)
  }

  if (idea.goals.includes(a.goal)) reasons.push(`Aligned with your goal of ${GOAL_PHRASE[a.goal]}`)

  if (a.workStyle !== 'any' && idea.workStyles.includes(a.workStyle)) {
    reasons.push(STYLE_PHRASE[a.workStyle])
  }

  if (a.experience === 'beginner' && idea.beginnerFriendly) reasons.push('Beginner-friendly with a clear learning path')
  if (a.experience === 'beginner' && idea.difficulty === 3) {
    cautions.push('A challenging pick for a complete beginner — consider it a longer-term goal')
  }
  if ((a.experience === 'advanced' || a.experience === 'intermediate') && idea.difficulty === 3) {
    reasons.push('A higher-skill opportunity that suits your experience')
  }

  return { idea, score, reasons, cautions }
}

/** Ranks every idea for the given answers. Ties are broken alphabetically for determinism. */
export function rankIdeas(a: Answers, ideas: Idea[] = IDEAS): MatchResult[] {
  return ideas
    .map((idea) => scoreIdea(idea, a))
    .sort((x, y) => y.score - x.score || x.idea.name.localeCompare(y.idea.name))
}

export function topMatches(a: Answers, n: number): MatchResult[] {
  return rankIdeas(a).slice(0, n)
}

export function goalLabel(goal: GoalId): string {
  return labelFor(GOALS, goal)
}
