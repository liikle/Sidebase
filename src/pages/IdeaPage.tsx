import { DIFFICULTY_LABEL, IDEAS, IDEA_BY_ID, formatCost, formatHours } from '@shared/ideas'
import { INTERESTS, SKILLS, labelFor } from '@shared/questions'
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { REPORT_SECTIONS } from '../components/home/ReportAnatomy'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { DifficultyMeter } from '../components/ui/Difficulty'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

export default function IdeaPage() {
  const { id = '' } = useParams()
  const idea = IDEA_BY_ID[id]
  useSeo(
    idea
      ? { title: `${idea.name}: How to Start`, description: `${idea.tagline} Startup cost ${formatCost(idea.startupCost)}, ${formatHours(idea.weeklyHours)}, ${DIFFICULTY_LABEL[idea.difficulty].toLowerCase()} difficulty.`, path: `/explore/${idea.id}` }
      : { title: 'Idea not found', noindex: true },
  )
  if (!idea) return <NotFound />

  const related = IDEAS.filter((i) => i.id !== idea.id && i.category === idea.category).slice(0, 3)
  const stats: [string, ReactNode][] = [
    ['Startup cost', formatCost(idea.startupCost)],
    ['Weekly time', formatHours(idea.weeklyHours)],
    ['Difficulty', <DifficultyMeter key="d" level={idea.difficulty} />],
    ['Time to first revenue', idea.timeToFirstRevenue],
    ['Business model', idea.businessModel],
    ['Beginner-friendly', idea.beginnerFriendly ? 'Yes' : 'Some experience helps'],
  ]

  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 -top-16 h-[420px]" />
      <Container className="relative pb-24 pt-10 sm:pt-14">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> All ideas
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow">{labelFor(INTERESTS, idea.category)}</p>
            <h1 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">{idea.name}</h1>
            <p className="mt-4 text-lg text-muted">{idea.tagline}</p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-fg/85">{idea.description}</p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {stats.map(([k, v]) => (
                <div key={k} className="bg-ink-800 p-4 sm:p-5">
                  <dt className="text-xs text-subtle">{k}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-fg">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-medium text-fg">Skills that matter</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {idea.skills.length === 0 && <span className="text-sm text-muted">No specific skills required</span>}
                  {idea.skills.map((s) => (
                    <span key={s} className="rounded-lg border border-accent/25 bg-accent/[0.07] px-2.5 py-1 text-sm text-accent-soft">
                      {labelFor(SKILLS, s)}
                    </span>
                  ))}
                  {idea.bonusSkills.map((s) => (
                    <span key={s} className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-1 text-sm text-muted">
                      {labelFor(SKILLS, s)}
                    </span>
                  ))}
                </div>
                {idea.skills.length > 0 && <p className="mt-2 text-xs text-subtle">Highlighted skills are core; others help.</p>}
              </div>
              <div>
                <h2 className="text-sm font-medium text-fg">How it makes money</h2>
                <ul className="mt-3 space-y-2">
                  {idea.monetization.map((m) => (
                    <li key={m} className="flex gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="font-semibold tracking-tight text-fg">Is this right for you?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The finder scores this idea — and {IDEAS.length - 1} others — against your skills, budget and time.
              </p>
              <ButtonLink to="/find" className="mt-5 w-full">
                Find My Side Hustle <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">In the full report</p>
                <ul className="mt-3 space-y-2">
                  {REPORT_SECTIONS.slice(1).map(([t]) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-muted">
                      <Lock className="h-3.5 w-3.5 text-subtle" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-xl font-semibold tracking-tight text-fg">Related ideas</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/explore/${r.id}`} className="card group block h-full p-5 transition-colors hover:border-line-strong">
                    <p className="font-medium text-fg">{r.name}</p>
                    <p className="mt-2 text-sm text-muted">{r.tagline}</p>
                    <p className="mt-4 text-xs tabular-nums text-subtle">
                      {formatCost(r.startupCost)} · {DIFFICULTY_LABEL[r.difficulty]}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </div>
  )
}
