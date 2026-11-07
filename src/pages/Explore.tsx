import { DIFFICULTY_LABEL, IDEAS, formatCost, formatHours } from '@shared/ideas'
import { INTERESTS, labelFor } from '@shared/questions'
import type { Difficulty, InterestId } from '@shared/types'
import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { DifficultyMeter } from '../components/ui/Difficulty'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'

const COST_FILTERS = [
  { id: 'all', label: 'Any budget', max: Infinity },
  { id: 'free', label: 'Start for $0', max: 0 },
  { id: '50', label: 'Under $50', max: 50 },
  { id: '200', label: 'Under $200', max: 200 },
] as const

export default function Explore() {
  useSeo({
    title: 'Explore Online Business Ideas',
    description: `Browse ${IDEAS.length} online business ideas and side hustles with realistic startup costs, time requirements and difficulty levels.`,
    path: '/explore',
  })
  const [params, setParams] = useSearchParams()
  const category = (params.get('category') ?? 'all') as InterestId | 'all'
  const [query, setQuery] = useState('')
  const [cost, setCost] = useState<(typeof COST_FILTERS)[number]['id']>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | 0>(0)
  const [beginner, setBeginner] = useState(false)

  const setCategory = (c: string) => {
    const next = new URLSearchParams(params)
    if (c === 'all') next.delete('category')
    else next.set('category', c)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const maxCost = COST_FILTERS.find((c) => c.id === cost)?.max ?? Infinity
    return IDEAS.filter(
      (i) =>
        (category === 'all' || i.category === category || i.interests.includes(category)) &&
        i.startupCost.min <= maxCost &&
        (difficulty === 0 || i.difficulty === difficulty) &&
        (!beginner || i.beginnerFriendly) &&
        (!q || `${i.name} ${i.tagline} ${i.businessModel}`.toLowerCase().includes(q)),
    )
  }, [category, cost, difficulty, beginner, query])

  const hasFilters = category !== 'all' || cost !== 'all' || difficulty !== 0 || beginner || query !== ''
  const reset = () => {
    setQuery('')
    setCost('all')
    setDifficulty(0)
    setBeginner(false)
    setCategory('all')
  }

  const chip = (active: boolean) =>
    cn(
      'h-9 shrink-0 rounded-full border px-3.5 text-sm transition-colors',
      active ? 'border-accent/50 bg-accent/10 text-fg' : 'border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-fg',
    )

  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 -top-16 h-[420px]" />
      <Container className="relative pb-24 pt-12 sm:pt-16">
        <p className="eyebrow">Explore</p>
        <h1 className="text-balance mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
          {IDEAS.length} online income opportunities, honestly described.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Realistic startup costs, weekly time and difficulty for every idea. Want to know which fit you best?{' '}
          <Link to="/find" className="text-accent underline-offset-4 hover:underline">
            Take the finder
          </Link>
          .
        </p>

        {/* Filters */}
        <div className="mt-10 space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ideas…"
              aria-label="Search ideas"
              className="h-11 w-full rounded-xl border border-line bg-ink-800 pl-10 pr-4 text-[15px] text-fg placeholder:text-subtle focus:border-accent/50 focus:outline-none"
            />
          </div>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Category">
            <button type="button" className={chip(category === 'all')} onClick={() => setCategory('all')} aria-pressed={category === 'all'}>
              All categories
            </button>
            {INTERESTS.map((c) => (
              <button key={c.id} type="button" className={chip(category === c.id)} onClick={() => setCategory(c.id)} aria-pressed={category === c.id}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {COST_FILTERS.map((c) => (
              <button key={c.id} type="button" className={chip(cost === c.id)} onClick={() => setCost(c.id)} aria-pressed={cost === c.id}>
                {c.label}
              </button>
            ))}
            <span className="mx-1 hidden w-px self-stretch bg-line sm:block" />
            {([1, 2, 3] as Difficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                className={chip(difficulty === d)}
                onClick={() => setDifficulty(difficulty === d ? 0 : d)}
                aria-pressed={difficulty === d}
              >
                {DIFFICULTY_LABEL[d]}
              </button>
            ))}
            <button type="button" className={chip(beginner)} onClick={() => setBeginner((b) => !b)} aria-pressed={beginner}>
              Beginner-friendly
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted">
          <p aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'idea' : 'ideas'}
          </p>
          {hasFilters && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="font-medium text-fg">No ideas match those filters.</p>
            <p className="mt-2 text-sm text-muted">Try widening your budget or clearing a filter.</p>
            <button type="button" onClick={reset} className="mt-5 text-sm text-accent hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((idea) => (
              <li key={idea.id}>
                <Link
                  to={`/explore/${idea.id}`}
                  className="card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-subtle">{labelFor(INTERESTS, idea.category)}</span>
                    {idea.beginnerFriendly && (
                      <span className="rounded-full border border-accent/20 bg-accent/[0.07] px-2 py-0.5 text-[11px] text-accent-soft">Beginner-friendly</span>
                    )}
                  </div>
                  <h2 className="mt-3 text-[17px] font-semibold tracking-tight text-fg">{idea.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{idea.tagline}</p>
                  <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-4 text-xs">
                    <div>
                      <dt className="text-subtle">Startup</dt>
                      <dd className="mt-1 tabular-nums text-fg">{formatCost(idea.startupCost)}</dd>
                    </div>
                    <div>
                      <dt className="text-subtle">Time</dt>
                      <dd className="mt-1 tabular-nums text-fg">{formatHours(idea.weeklyHours).replace(' hrs/wk', 'h/wk')}</dd>
                    </div>
                    <div>
                      <dt className="text-subtle">Difficulty</dt>
                      <dd className="mt-1 text-fg">
                        <DifficultyMeter level={idea.difficulty} />
                      </dd>
                    </div>
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-ink-900/50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-lg font-semibold tracking-tight text-fg">Not sure where to start?</p>
            <p className="mt-1 text-muted">Answer seven questions and we’ll rank every idea for you — free.</p>
          </div>
          <ButtonLink to="/find">
            Find My Side Hustle <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </div>
  )
}
