import type { IdeaDetails } from '../../../shared/types.ts'
import { creative } from './creative.ts'
import { educationCommerce } from './education-commerce.ts'
import { marketingServices } from './marketing-services.ts'
import { expand } from './types.ts'
import { writingSoftware } from './writing-software.ts'

/**
 * Paid report content, keyed by idea id. This module is only imported by
 * Cloudflare Pages Functions, so it never ships in the browser bundle.
 */
export const DETAILS: Record<string, IdeaDetails> = Object.fromEntries(
  Object.entries({ ...creative, ...writingSoftware, ...marketingServices, ...educationCommerce }).map(([id, raw]) => [
    id,
    expand(raw),
  ]),
)
