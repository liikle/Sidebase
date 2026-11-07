import { IDEAS } from '@shared/ideas'
import { rankIdeas } from '@shared/scoring'
import { motion } from 'framer-motion'
import { Info, Lock, RotateCcw } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MatchCard } from '../components/results/MatchCard'
import { ProfileSummary } from '../components/results/ProfileSummary'
import { UnlockPanel } from '../components/results/UnlockPanel'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { useSeo } from '../lib/seo'
import { loadAnswers } from '../lib/storage'

export default function Results() {
  useSeo({ title: 'Your Matches', path: '/results', noindex: true })
  const answers = useMemo(() => loadAnswers(), [])
  const [params] = useSearchParams()
  const canceled = params.get('checkout') === 'canceled'
  const ranked = useMemo(() => (answers ? rankIdeas(answers) : []), [answers])

  if (!answers) {
    return (
      <EmptyState
        title="No results yet"
        text="Answer seven quick questions and we’ll match you with online income opportunities that fit your life."
        action={{ to: '/find', label: 'Find My Side Hustle' }}
      />
    )
  }

  const top = ranked.slice(0, 3)
  const lockedCount = 7

  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 -top-16 h-[480px]" />
      <Container className="relative pb-24 pt-10 sm:pt-14">
        {canceled && (
          <div role="status" className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-ink-800 px-4 py-3 text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Checkout was canceled — you have not been charged. Your matches are saved below whenever you’re ready.
          </div>
        )}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow">Your results</p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
              Your top matches are in.
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              We scored all {IDEAS.length} opportunities against your answers. Here are the three that fit you best.
            </p>
          </motion.div>
          <ButtonLink to="/find" variant="secondary" size="sm" className="self-start md:self-auto">
            <RotateCcw className="h-3.5 w-3.5" /> Retake
          </ButtonLink>
        </div>

        <div className="card mt-10 p-5 sm:p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-subtle">Your profile</p>
          <ProfileSummary answers={answers} />
        </div>

        <div className="mt-10 grid gap-5 pt-3 md:grid-cols-3">
          {top.map((m, i) => (
            <MatchCard key={m.idea.id} match={m} rank={i + 1} featured={i === 0} delay={0.1 + i * 0.08} />
          ))}
        </div>

        {/* Locked matches */}
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-ink-900/40">
          <ul aria-hidden="true" className="divide-y divide-line blur-[5px] select-none">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-subtle">#{i + 4}</span>
                  <span className="h-3 rounded bg-white/15" style={{ width: 120 + ((i * 53) % 90) }} />
                </div>
                <span className="h-3 w-10 rounded bg-accent/40" />
              </li>
            ))}
          </ul>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-ink-950/30 to-ink-950/70 px-4">
            <a
              href="#unlock"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/90 px-4 py-2 text-sm text-fg backdrop-blur transition-colors hover:border-accent/40"
            >
              <Lock className="h-3.5 w-3.5 text-accent" /> {lockedCount} more matches in your full report
            </a>
          </div>
        </div>

        <div className="mt-16">
          <UnlockPanel answers={answers} />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-subtle">
          Match scores reflect how well each opportunity fits your answers. They are not predictions of income. Startup costs and
          time requirements are typical ranges and vary by person and market.
        </p>
      </Container>
    </div>
  )
}
