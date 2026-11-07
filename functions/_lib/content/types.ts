import type { IdeaDetails } from '../../../shared/types.ts'

/** Compact authoring format for premium content. Converted to IdeaDetails by `expand`. */
export interface RawDetails {
  overview: string
  requirements: string[]
  tools: [name: string, use: string][]
  steps: [title: string, detail: string][]
  firstCustomer: string[]
  firstSale: string[]
  mistakes: string[]
  scaling: string[]
}

export function expand(r: RawDetails): IdeaDetails {
  return {
    overview: r.overview,
    requirements: r.requirements,
    tools: r.tools.map(([name, use]) => ({ name, use })),
    steps: r.steps.map(([title, detail]) => ({ title, detail })),
    firstCustomer: r.firstCustomer,
    firstSale: r.firstSale,
    mistakes: r.mistakes,
    scaling: r.scaling,
  }
}
