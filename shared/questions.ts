import type {
  Answers,
  BudgetId,
  ExperienceId,
  GoalId,
  InterestId,
  SkillId,
  TimeId,
  WorkStyleId,
} from './types.ts'

export interface Option<T extends string> {
  id: T
  label: string
  hint?: string
}

export interface Question<K extends keyof Answers = keyof Answers> {
  key: K
  title: string
  subtitle: string
  multi: boolean
  options: Option<string>[]
}

export const GOALS: Option<GoalId>[] = [
  { id: 'extra-money', label: 'Make extra money', hint: 'A reliable second income on the side' },
  { id: 'full-time', label: 'Build a full-time online business', hint: 'Replace a job over time' },
  { id: 'passive', label: 'Create passive income', hint: 'Build once, earn repeatedly' },
  { id: 'freelancing', label: 'Start freelancing', hint: 'Sell your skills to clients' },
  { id: 'scale', label: 'Build something that could scale', hint: 'Growth beyond your own hours' },
]

export const BUDGETS: Option<BudgetId>[] = [
  { id: 'free', label: '$0', hint: 'I want to start for free' },
  { id: 'under-50', label: 'Under $50', hint: 'A small starting budget' },
  { id: '50-200', label: '$50–$200', hint: 'Room for basic tools' },
  { id: '200-500', label: '$200–$500', hint: 'Tools, samples or inventory' },
  { id: '500-plus', label: '$500+', hint: 'Ready to invest seriously' },
]

export const TIMES: Option<TimeId>[] = [
  { id: 'lt5', label: 'Less than 5 hours', hint: 'per week' },
  { id: '5-10', label: '5–10 hours', hint: 'per week' },
  { id: '10-20', label: '10–20 hours', hint: 'per week' },
  { id: '20-40', label: '20–40 hours', hint: 'per week' },
  { id: 'full-time', label: 'Full-time', hint: '40+ hours per week' },
]

export const SKILLS: Option<SkillId>[] = [
  { id: 'video-editing', label: 'Video editing' },
  { id: 'graphic-design', label: 'Graphic design' },
  { id: 'writing', label: 'Writing' },
  { id: 'programming', label: 'Programming' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'communication', label: 'Communication' },
  { id: 'sales', label: 'Sales' },
  { id: 'research', label: 'Research' },
  { id: 'organization', label: 'Organization' },
  { id: 'photography', label: 'Photography' },
  { id: 'none', label: 'No particular skills yet' },
]

export const INTERESTS: Option<InterestId>[] = [
  { id: 'content-creation', label: 'Content creation' },
  { id: 'digital-products', label: 'Digital products' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'freelancing', label: 'Freelancing' },
  { id: 'software', label: 'Software and technology' },
  { id: 'social-media', label: 'Social media' },
  { id: 'education', label: 'Education' },
  { id: 'online-services', label: 'Online services' },
  { id: 'marketing', label: 'Marketing' },
]

export const WORK_STYLES: Option<WorkStyleId>[] = [
  { id: 'independent', label: 'Completely independently', hint: 'Just me, on my own terms' },
  { id: 'clients', label: 'Working with clients', hint: 'Direct relationships, paid for results' },
  { id: 'products', label: 'Create once, sell repeatedly', hint: 'Products that keep selling' },
  { id: 'audience', label: 'Building an audience', hint: 'Grow a following and monetize it' },
  { id: 'any', label: 'I don’t mind', hint: 'Open to whatever fits best' },
]

export const EXPERIENCE: Option<ExperienceId>[] = [
  { id: 'beginner', label: 'Complete beginner', hint: 'I have never earned money online' },
  { id: 'some', label: 'Some experience', hint: 'I have tried a few things' },
  { id: 'intermediate', label: 'Intermediate', hint: 'I have earned some income online' },
  { id: 'advanced', label: 'Advanced', hint: 'I have run an online business' },
]

export const QUESTIONS: Question[] = [
  {
    key: 'goal',
    title: 'What is your main goal?',
    subtitle: 'This shapes the type of opportunities we prioritize.',
    multi: false,
    options: GOALS,
  },
  {
    key: 'budget',
    title: 'How much money can you invest?',
    subtitle: 'Be honest — many great options start at $0.',
    multi: false,
    options: BUDGETS,
  },
  {
    key: 'time',
    title: 'How much time can you dedicate?',
    subtitle: 'Consistency matters more than volume.',
    multi: false,
    options: TIMES,
  },
  {
    key: 'skills',
    title: 'What are your strongest skills?',
    subtitle: 'Select all that apply.',
    multi: true,
    options: SKILLS,
  },
  {
    key: 'interests',
    title: 'What interests you most?',
    subtitle: 'Select all that apply.',
    multi: true,
    options: INTERESTS,
  },
  {
    key: 'workStyle',
    title: 'How do you prefer working?',
    subtitle: 'There is no wrong answer here.',
    multi: false,
    options: WORK_STYLES,
  },
  {
    key: 'experience',
    title: 'What describes your experience?',
    subtitle: 'We match difficulty to where you are today.',
    multi: false,
    options: EXPERIENCE,
  },
]

export function labelFor<T extends string>(options: Option<T>[], id: T): string {
  return options.find((o) => o.id === id)?.label ?? id
}

// ---------- Validation & compact encoding (used for Stripe metadata) ----------

const ids = <T extends string>(o: Option<T>[]) => new Set<string>(o.map((x) => x.id))
const GOAL_IDS = ids(GOALS)
const BUDGET_IDS = ids(BUDGETS)
const TIME_IDS = ids(TIMES)
const SKILL_IDS = ids(SKILLS)
const INTEREST_IDS = ids(INTERESTS)
const STYLE_IDS = ids(WORK_STYLES)
const EXP_IDS = ids(EXPERIENCE)

/** Returns a normalized Answers object, or null if the input is invalid. */
export function validateAnswers(input: unknown): Answers | null {
  if (!input || typeof input !== 'object') return null
  const a = input as Record<string, unknown>
  const str = (v: unknown, set: Set<string>) => (typeof v === 'string' && set.has(v) ? v : null)
  const list = (v: unknown, set: Set<string>) => {
    if (!Array.isArray(v) || v.length === 0 || v.length > 20) return null
    const unique = [...new Set(v)]
    return unique.every((x) => typeof x === 'string' && set.has(x)) ? (unique as string[]) : null
  }
  const goal = str(a.goal, GOAL_IDS)
  const budget = str(a.budget, BUDGET_IDS)
  const time = str(a.time, TIME_IDS)
  const workStyle = str(a.workStyle, STYLE_IDS)
  const experience = str(a.experience, EXP_IDS)
  let skills = list(a.skills, SKILL_IDS)
  const interests = list(a.interests, INTEREST_IDS)
  if (!goal || !budget || !time || !workStyle || !experience || !skills || !interests) return null
  // "No particular skills yet" is exclusive.
  if (skills.includes('none') && skills.length > 1) skills = skills.filter((s) => s !== 'none')
  return {
    goal: goal as GoalId,
    budget: budget as BudgetId,
    time: time as TimeId,
    skills: skills as SkillId[],
    interests: interests as InterestId[],
    workStyle: workStyle as WorkStyleId,
    experience: experience as ExperienceId,
  }
}

/** Compact, human-readable encoding that fits comfortably in Stripe metadata (500 chars). */
export function encodeAnswers(a: Answers): string {
  return [
    `g=${a.goal}`,
    `b=${a.budget}`,
    `t=${a.time}`,
    `s=${a.skills.join(',')}`,
    `i=${a.interests.join(',')}`,
    `w=${a.workStyle}`,
    `e=${a.experience}`,
  ].join(';')
}

export function decodeAnswers(s: string): Answers | null {
  if (typeof s !== 'string' || s.length > 500) return null
  const map = new Map<string, string>()
  for (const part of s.split(';')) {
    const idx = part.indexOf('=')
    if (idx > 0) map.set(part.slice(0, idx), part.slice(idx + 1))
  }
  return validateAnswers({
    goal: map.get('g'),
    budget: map.get('b'),
    time: map.get('t'),
    skills: map.get('s')?.split(',').filter(Boolean),
    interests: map.get('i')?.split(',').filter(Boolean),
    workStyle: map.get('w'),
    experience: map.get('e'),
  })
}
