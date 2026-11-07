import { IDEAS } from '@shared/ideas'
import { INTERESTS } from '@shared/questions'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Categories() {
  const cats = INTERESTS.map((c) => {
    const ideas = IDEAS.filter((i) => i.category === c.id)
    return { ...c, count: ideas.length, examples: ideas.slice(0, 2).map((i) => i.name) }
  }).filter((c) => c.count > 0)

  return (
    <section className="border-t border-line py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Explore"
            title={`${IDEAS.length} opportunities across ${cats.length} categories.`}
            description="Every idea includes realistic startup costs, time requirements and difficulty — browse them all for free."
          />
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <Link
                to={`/explore?category=${c.id}`}
                className="card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-fg">{c.label}</h3>
                  <ArrowUpRight className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-1 text-xs tabular-nums text-subtle">
                  {c.count} {c.count === 1 ? 'idea' : 'ideas'}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{c.examples.join(' · ')}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
