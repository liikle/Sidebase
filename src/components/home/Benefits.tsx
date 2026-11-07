import { GraduationCap, ListChecks, Target } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const BENEFITS = [
  {
    icon: Target,
    title: 'Personalized Ideas',
    text: 'Discover opportunities that match your situation — your skills, budget, schedule and the way you like to work.',
    detail: ['Skills', 'Budget', 'Time', 'Interests'],
  },
  {
    icon: ListChecks,
    title: 'Clear Starting Steps',
    text: 'Know exactly how to begin. Every recommendation comes with a practical launch plan, tools and a first-customer playbook.',
    detail: ['Launch plan', 'Tools', 'First sale'],
  },
  {
    icon: GraduationCap,
    title: 'No Experience Required',
    text: 'Explore opportunities suitable for beginners. We match difficulty to where you are today, not where you might be.',
    detail: ['Beginner-friendly', 'Low cost'],
  },
]

export function Benefits() {
  return (
    <section className="border-t border-line py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Sidebase"
            title="Clarity, not another list of 100 random ideas."
            description="Most side hustle advice is generic. Sidebase narrows hundreds of possibilities down to the few that genuinely fit your life."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <article className="card group h-full p-6 transition-colors duration-300 hover:border-line-strong sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{b.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{b.text}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {b.detail.map((d) => (
                    <span key={d} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 text-xs text-subtle">
                      {d}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
