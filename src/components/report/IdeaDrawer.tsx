import { DIFFICULTY_LABEL, formatCost, formatHours } from '@shared/ideas'
import type { ReportItem } from '@shared/types'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, TrendingUp, Wrench, X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { MatchRing } from '../ui/MatchRing'

interface Props {
  item: ReportItem | null
  rank: number
  total: number
  onClose: () => void
  onNavigate: (delta: number) => void
}

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-2">
      <h3 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-fg">
        <span className="font-mono text-xs font-medium text-accent">{String(n).padStart(2, '0')}</span>
        {title}
      </h3>
      <div className="mt-4 pl-0 sm:pl-8">{children}</div>
    </section>
  )
}

function List({ items, icon = 'check' }: { items: string[]; icon?: 'check' | 'warn' | 'grow' | 'dot' }) {
  const Icon = icon === 'warn' ? AlertTriangle : icon === 'grow' ? TrendingUp : Check
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          {icon === 'dot' ? (
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          ) : (
            <Icon className={`mt-1 h-4 w-4 shrink-0 ${icon === 'warn' ? 'text-amber-300/80' : 'text-accent'}`} strokeWidth={2.25} />
          )}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export function IdeaDrawer({ item, rank, total, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!item) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose, onNavigate])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [item?.idea.id])

  return (
    <AnimatePresence>
      {item && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 34, stiffness: 320 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-line bg-ink-900 shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
              <p className="text-sm text-muted">
                Match <span className="tabular-nums text-fg">#{rank}</span> of {total}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/[0.05] hover:text-fg"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-5 pb-10 pt-8 sm:px-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow">{item.idea.businessModel}</p>
                    <h2 id="drawer-title" className="text-balance mt-2 text-3xl font-semibold tracking-[-0.035em] text-fg">
                      {item.idea.name}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">{item.idea.tagline}</p>
                  </div>
                  <MatchRing score={item.score} size={68} />
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                  {[
                    ['Startup cost', formatCost(item.idea.startupCost)],
                    ['Weekly time', formatHours(item.idea.weeklyHours)],
                    ['Difficulty', DIFFICULTY_LABEL[item.idea.difficulty]],
                    ['First revenue', item.idea.timeToFirstRevenue.split(' (')[0]],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-ink-800 px-4 py-3.5">
                      <dt className="text-xs text-subtle">{k}</dt>
                      <dd className="mt-1 text-sm font-medium tabular-nums text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-muted">
                  <span className="text-subtle">Monetization: </span>
                  {item.idea.monetization.join(' · ')}
                </p>

                <div className="mt-6">
                  <Section n={1} title="What the business is">
                    <p className="text-[15px] leading-relaxed text-muted">{item.details.overview}</p>
                  </Section>

                  <Section n={2} title="Why it matches you">
                    <List items={item.reasons} />
                    {item.cautions.length > 0 && (
                      <div className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-4">
                        <p className="text-sm font-medium text-amber-100/90">Keep in mind</p>
                        <div className="mt-3">
                          <List items={item.cautions} icon="warn" />
                        </div>
                      </div>
                    )}
                  </Section>

                  <Section n={3} title="What you need to start">
                    <List items={item.details.requirements} icon="dot" />
                  </Section>

                  <Section n={4} title="Recommended tools">
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {item.details.tools.map((t) => (
                        <div key={t.name} className="rounded-xl border border-line bg-ink-800/70 p-4">
                          <p className="flex items-center gap-2 text-sm font-medium text-fg">
                            <Wrench className="h-3.5 w-3.5 text-accent" />
                            {t.name}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.use}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section n={5} title="Step-by-step launch plan">
                    <ol className="relative space-y-6">
                      <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-line" />
                      {item.details.steps.map((s, i) => (
                        <li key={s.title} className="relative flex gap-4">
                          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-ink-900 font-mono text-xs text-accent">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-medium text-fg">{s.title}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  <Section n={6} title="How to find your first customer">
                    <List items={item.details.firstCustomer} />
                  </Section>

                  <Section n={7} title="How to make your first sale">
                    <List items={item.details.firstSale} />
                  </Section>

                  <Section n={8} title="Common mistakes to avoid">
                    <List items={item.details.mistakes} icon="warn" />
                  </Section>

                  <Section n={9} title="Ways to scale">
                    <List items={item.details.scaling} icon="grow" />
                  </Section>
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                disabled={rank <= 1}
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-muted hover:bg-white/[0.04] hover:text-fg disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                disabled={rank >= total}
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-muted hover:bg-white/[0.04] hover:text-fg disabled:opacity-30"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
