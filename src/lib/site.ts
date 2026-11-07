/**
 * Business details shown on legal and contact pages.
 * Update these before going live (see README → "Before launch").
 */
export const SITE = {
  name: 'Sidebase',
  /**
   * The address the site is being served from (e.g. https://sidebase.<you>.workers.dev today,
   * https://sidebase.cc once that domain is attached). Read at runtime so nothing is hard-coded.
   */
  url: typeof window === 'undefined' ? '' : window.location.origin,
  /** Bare host for display, e.g. "sidebase.cc". */
  host: typeof window === 'undefined' ? '' : window.location.host,
  tagline: 'Find Your Next Income Stream.',
  email: 'hello@sidebase.cc',
  /** Legal name of the business operating the site. */
  operator: 'Sidebase',
  /** Country/state whose laws govern the Terms. */
  governingLaw: 'the country in which the operator is established',
  lastUpdated: 'November 7, 2026',
} as const
