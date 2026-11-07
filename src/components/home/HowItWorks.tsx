import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const STEPS = [
  {
    n: '01',
    title: 'Answer a Few Questions',
    text: 'Tell us about your skills, interests, budget, and available time.',
    meta: '7 questions · about 2 minutes',
  },
  {
    n: '02',
    title: 'Discover Your Opportunities',
    text: 'Our matching system finds side hustles suited to your answers.',
    meta: 'Free preview of your top 3',
  },
  {
    n: '03',
    title: 'Get Your Action Plan',
    text: 'Unlock detailed recommendations and practical instructions.',
    meta: 'Top 10 matches + PDF report',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-16 border-t border-line bg-ink-900/40 py-24 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="From “what should I do?” to a plan in minutes." />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to="/find" variant="secondary">
              Start the finder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <li className="card relative h-full p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-accent">{s.n}</span>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px flex-1 translate-x-7 bg-gradient-to-r from-line-strong to-transparent md:ml-6 md:block" />
                  )}
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-tight text-fg">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
                <p className="mt-8 border-t border-line pt-4 text-xs text-subtle">{s.meta}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
