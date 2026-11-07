import { IDEAS } from '@shared/ideas'
import { WEIGHTS } from '@shared/scoring'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'

const FACTORS: [keyof typeof WEIGHTS, string, string][] = [
  ['skills', 'Skills', 'How many of the core and helpful skills you already have.'],
  ['interests', 'Interests', 'Whether the opportunity sits in an area you care about.'],
  ['budget', 'Budget', 'Whether you can afford the realistic minimum startup cost.'],
  ['time', 'Time', 'Whether your weekly hours are enough to make steady progress.'],
  ['goal', 'Goal', 'Whether the business model supports what you want to achieve.'],
  ['workStyle', 'Work style', 'Clients, products, audience or solo — how you like to work.'],
  ['experience', 'Experience', 'How the difficulty compares to where you are today.'],
]

const PRINCIPLES = [
  ['No hype', 'We never promise income, show fake screenshots or invent success stories. Real businesses take real work.'],
  ['Transparent matching', 'Recommendations come from clear, rules-based scoring — no black box and no paid placements.'],
  ['Privacy by default', 'No accounts, no tracking cookies and no selling your data. Your answers stay on your device until you choose to buy.'],
  ['Fair pricing', 'Matches are free. The full report is a one-time purchase — never a subscription.'],
]

export default function About() {
  useSeo({
    title: 'About',
    description: 'Sidebase helps people find realistic online income opportunities that fit their skills, budget and time — without hype.',
    path: '/about',
  })
  const total = Object.values(WEIGHTS).reduce((a, b) => a + b, 0)

  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 -top-16 h-[420px]" />
      <Container className="relative pb-24 pt-12 sm:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">About Sidebase</p>
          <h1 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl">
            The honest way to find your next income stream.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            The internet is full of side hustle advice — most of it generic, much of it exaggerated. Sidebase exists to cut through
            the noise: tell us about your situation, and we’ll show you which opportunities genuinely fit, what they really cost, and
            exactly how to begin.
          </p>
        </div>

        <section className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-fg">How matching works</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Every one of our {IDEAS.length} opportunities is described by the skills it needs, its realistic startup cost and weekly
              time, its difficulty, business model and the goals it suits. Your answers are compared against each one across seven
              factors. Ideas you can’t afford or don’t have time for are penalized, so they never outrank ones you can start.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              The scoring is deterministic: the same answers always give the same results. There is no AI guesswork and nobody pays to be
              recommended.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="card divide-y divide-line">
              {FACTORS.map(([key, label, text]) => (
                <li key={key} className="grid grid-cols-[1fr_auto] items-center gap-6 px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-medium text-fg">{label}</p>
                    <p className="mt-0.5 text-sm text-muted">{text}</p>
                  </div>
                  <div className="flex w-28 items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(WEIGHTS[key] / 24) * 100}%` }} />
                    </div>
                    <span className="w-9 text-right text-xs tabular-nums text-muted">{Math.round((WEIGHTS[key] / total) * 100)}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-24">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-fg">What we stand for</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.08}>
                <div className="card h-full p-6">
                  <p className="font-semibold tracking-tight text-fg">{t}</p>
                  <p className="mt-2 leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-fg">Ready to see what fits?</h2>
          <ButtonLink to="/find" size="lg" className="mt-8">
            Find My Side Hustle <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </div>
  )
}
