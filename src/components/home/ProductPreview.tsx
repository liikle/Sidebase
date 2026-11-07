import { formatCost } from '@shared/ideas'
import { topMatches } from '@shared/scoring'
import type { Answers } from '@shared/types'
import { motion } from 'framer-motion'
import { Check, Download, Lock } from 'lucide-react'
import { useMemo } from 'react'
import { cn } from '../../lib/cn'
import { DifficultyMeter } from '../ui/Difficulty'
import { LogoMark } from '../ui/Logo'
import { MatchRing } from '../ui/MatchRing'

/** A real profile run through the real matching engine — the preview shows genuine output. */
const SAMPLE: Answers = {
  goal: 'passive',
  budget: 'under-50',
  time: '5-10',
  skills: ['graphic-design', 'writing'],
  interests: ['digital-products', 'social-media'],
  workStyle: 'products',
  experience: 'some',
}

const PROFILE = [
  ['Goal', 'Passive income'],
  ['Budget', 'Under $50'],
  ['Time', '5–10 hrs / week'],
  ['Level', 'Some experience'],
] as const

const ease = [0.22, 1, 0.36, 1] as const

/** Step titles shown in the teaser (titles only — the detailed plan stays in the paid report). */
const PREVIEW_STEPS: Record<string, string[]> = {
  'kdp-publishing': ['Research topics with real demand', 'Outline a short, practical guide', 'Design a professional cover'],
  'canva-templates': ['Research what buyers search for', 'Design your first 5 products', 'Write keyword-rich listings'],
  'printables-shop': ['Pick a specific niche', 'Create 5–10 products', 'Optimize listings for search'],
}
const FALLBACK_STEPS = ['Validate demand in your niche', 'Create your first offer', 'Reach your first customers']

export function ProductPreview() {
  const matches = useMemo(() => topMatches(SAMPLE, 4), [])
  const top = matches[0]

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-x-8 top-8 -z-10 h-72 rounded-full bg-accent/[0.12] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="card overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        role="img"
        aria-label="Preview of a Sidebase results dashboard showing recommended side hustles with match scores, startup costs, difficulty and time requirements."
      >
        {/* Window bar */}
        <div className="flex h-11 items-center justify-between border-b border-line bg-ink-900/60 px-4">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" />
            <span className="text-[13px] font-medium text-fg">Your Side Hustle Report</span>
          </div>
          <span className="hidden items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[11px] text-muted sm:inline-flex">
            <Download className="h-3 w-3" /> PDF
          </span>
        </div>

        <div className="grid sm:grid-cols-[148px_1fr]">
          {/* Profile column */}
          <aside className="hidden border-r border-line bg-ink-900/30 p-4 sm:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-subtle">Your profile</p>
            <dl className="mt-3 space-y-3">
              {PROFILE.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] text-subtle">{k}</dt>
                  <dd className="text-[12px] font-medium text-fg">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-[10px] text-subtle">Skills</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {['Design', 'Writing'].map((s) => (
                    <span key={s} className="rounded border border-line bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          {/* Matches */}
          <div className="min-w-0 p-3 sm:p-4">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <p className="text-[12px] font-medium text-fg">Top matches</p>
              <p className="text-[11px] text-subtle">Sorted by match</p>
            </div>
            <ul className="space-y-1.5">
              {matches.map((m, i) => (
                <motion.li
                  key={m.idea.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.09 }}
                  className={cn(
                    'grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border px-3 py-2.5',
                    i === 0 ? 'border-accent/30 bg-accent/[0.06]' : 'border-transparent bg-white/[0.02]',
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-fg">{m.idea.name}</p>
                    <div className="mt-1 flex items-center gap-3 whitespace-nowrap text-[11px] text-muted">
                      <span className="tabular-nums">{formatCost(m.idea.startupCost)}</span>
                      <DifficultyMeter level={m.idea.difficulty} className="text-[11px]" />
                      <span className="hidden tabular-nums xl:inline">{m.idea.weeklyHours.min}+ hrs/wk</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-white/[0.08] sm:block">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.score}%` }}
                        transition={{ duration: 1, ease, delay: 0.6 + i * 0.09 }}
                      />
                    </div>
                    <span className="w-9 text-right text-[12px] font-semibold tabular-nums text-fg">{m.score}%</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Detail strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.95 }}
              className="mt-3 rounded-xl border border-line bg-ink-900/50 p-3.5"
            >
              <div className="flex items-start gap-3">
                <MatchRing score={top.score} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-fg">{top.idea.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {top.idea.businessModel} · {top.idea.monetization[0]}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-subtle">Launch plan</p>
              <ul className="mt-2 space-y-1.5">
                {(PREVIEW_STEPS[top.idea.id] ?? FALLBACK_STEPS).map((s, i) => (
                  <li key={s} className="flex items-center gap-2 text-[12px]">
                    <span
                      className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                        i < 2 ? 'border-accent bg-accent text-ink-950' : 'border-line-strong',
                      )}
                    >
                      {i < 2 && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                    </span>
                    <span className={i < 2 ? 'text-muted line-through decoration-subtle/50' : 'text-fg'}>{s}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2 text-[12px] text-subtle">
                  <Lock className="h-3.5 w-3.5" /> 3 more steps, tools & first-sale playbook
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
