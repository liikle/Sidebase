import { formatCost, formatHours } from '@shared/ideas'
import type { MatchResult } from '@shared/types'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'
import { DifficultyMeter } from '../ui/Difficulty'
import { MatchRing } from '../ui/MatchRing'

export function MatchCard({ match, rank, featured, delay = 0 }: { match: MatchResult; rank: number; featured?: boolean; delay?: number }) {
  const { idea, score, reasons } = match
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn('card relative flex h-full flex-col p-6', featured && 'border-accent/35')}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full border border-accent/30 bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-accent-soft">
          Best match
        </span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs text-subtle">#{rank}</p>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-fg">{idea.name}</h3>
        </div>
        <MatchRing score={score} />
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{idea.tagline}</p>

      <ul className="mt-5 space-y-2">
        {reasons.slice(0, 2).map((r) => (
          <li key={r} className="flex gap-2 text-sm text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-5 text-sm">
        <div>
          <dt className="text-xs text-subtle">Startup</dt>
          <dd className="mt-1 font-medium tabular-nums text-fg">{formatCost(idea.startupCost)}</dd>
        </div>
        <div>
          <dt className="text-xs text-subtle">Difficulty</dt>
          <dd className="mt-1 font-medium text-fg">
            <DifficultyMeter level={idea.difficulty} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-subtle">Time</dt>
          <dd className="mt-1 font-medium tabular-nums text-fg">{formatHours(idea.weeklyHours).replace(' hrs/wk', 'h')}</dd>
        </div>
      </dl>
    </motion.article>
  )
}
