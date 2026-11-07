export type GoalId = 'extra-money' | 'full-time' | 'passive' | 'freelancing' | 'scale'
export type BudgetId = 'free' | 'under-50' | '50-200' | '200-500' | '500-plus'
export type TimeId = 'lt5' | '5-10' | '10-20' | '20-40' | 'full-time'
export type SkillId =
  | 'video-editing'
  | 'graphic-design'
  | 'writing'
  | 'programming'
  | 'marketing'
  | 'communication'
  | 'sales'
  | 'research'
  | 'organization'
  | 'photography'
  | 'none'
export type InterestId =
  | 'content-creation'
  | 'digital-products'
  | 'ecommerce'
  | 'freelancing'
  | 'software'
  | 'social-media'
  | 'education'
  | 'online-services'
  | 'marketing'
export type WorkStyleId = 'independent' | 'clients' | 'products' | 'audience' | 'any'
export type ExperienceId = 'beginner' | 'some' | 'intermediate' | 'advanced'

export interface Answers {
  goal: GoalId
  budget: BudgetId
  time: TimeId
  skills: SkillId[]
  interests: InterestId[]
  workStyle: WorkStyleId
  experience: ExperienceId
}

export type Difficulty = 1 | 2 | 3

export type ModelType = 'service' | 'product' | 'content' | 'commerce' | 'software'

/** Public information about an idea. Safe to ship to the browser. */
export interface Idea {
  id: string
  name: string
  /** One-line summary used on cards. */
  tagline: string
  /** Two to three sentence description. */
  description: string
  category: InterestId
  interests: InterestId[]
  /** Core skills the idea relies on. Empty means anyone can start. */
  skills: Exclude<SkillId, 'none'>[]
  /** Skills that help but are not essential. */
  bonusSkills: Exclude<SkillId, 'none'>[]
  /** Realistic startup cost range in USD. */
  startupCost: { min: number; max: number }
  /** Realistic weekly hours needed to make progress. */
  weeklyHours: { min: number; max: number }
  difficulty: Difficulty
  beginnerFriendly: boolean
  modelType: ModelType
  businessModel: string
  monetization: string[]
  workStyles: Exclude<WorkStyleId, 'any'>[]
  goals: GoalId[]
  /** Typical time before the first dollar, stated honestly. */
  timeToFirstRevenue: string
}

/** Premium, paid-only content. Lives server-side only. */
export interface IdeaDetails {
  overview: string
  requirements: string[]
  tools: { name: string; use: string }[]
  steps: { title: string; detail: string }[]
  firstCustomer: string[]
  firstSale: string[]
  mistakes: string[]
  scaling: string[]
}

export interface MatchResult {
  idea: Idea
  /** 0–100 */
  score: number
  reasons: string[]
  cautions: string[]
}

export interface ReportItem extends MatchResult {
  details: IdeaDetails
}

export interface Report {
  version: 1
  answers: Answers
  generatedAt: string
  items: ReportItem[]
}
