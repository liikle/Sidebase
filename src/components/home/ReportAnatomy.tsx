import { REPORT_PRICE } from '@shared/pricing'
import { FileText } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export const REPORT_SECTIONS = [
  ['What the business is', 'A clear, honest explanation of how it works.'],
  ['Why it matches you', 'The specific answers that made it a fit — and any trade-offs.'],
  ['What you need to start', 'Skills, equipment and budget, without the fluff.'],
  ['Recommended tools', 'Mostly free or low-cost tools to get going.'],
  ['Step-by-step launch plan', 'Six concrete steps from zero to open for business.'],
  ['Finding your first customer', 'Where to look and how to approach them.'],
  ['Making your first sale', 'How to price, pitch and get paid.'],
  ['Common mistakes to avoid', 'The traps that stall most beginners.'],
  ['Ways to scale', 'How to grow once the first income arrives.'],
] as const

export function ReportAnatomy() {
  return (
    <section className="border-t border-line py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="The full report"
            title="Ten matches. Every one with a real plan."
            description={`Your free preview shows your top three. The full report unlocks your top ten — each broken down into nine practical sections — for a one-time ${REPORT_PRICE.display}.`}
          />
          <div className="mt-8 flex items-center gap-3 text-sm text-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/[0.03]">
              <FileText className="h-4 w-4 text-accent" />
            </span>
            Includes a beautifully formatted PDF you can keep.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="card divide-y divide-line overflow-hidden">
            {REPORT_SECTIONS.map(([title, text], i) => (
              <li key={title} className="flex gap-4 px-5 py-4 sm:px-6">
                <span className="mt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}
