import { REPORT_PRICE } from '@shared/pricing'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const FAQ = [
  {
    q: 'Is the finder free?',
    a: 'Yes. Answering the questions and seeing your top three matches is completely free. You only pay if you want the full report.',
  },
  {
    q: 'Is this a subscription?',
    a: `No. The full report is a single ${REPORT_PRICE.display} payment. There are no recurring charges, trials or hidden fees.`,
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. Sidebase works without accounts or logins. After purchase, your report is unlocked on your device and you can download it as a PDF.',
  },
  {
    q: 'How are matches calculated?',
    a: 'A transparent, rules-based scoring system compares your answers against each opportunity’s skills, costs, time needs, difficulty and business model. The same answers always produce the same results.',
  },
  {
    q: 'Will I make money?',
    a: 'We can’t promise that, and you should be wary of anyone who does. Sidebase helps you choose a realistic starting point and gives you a practical plan — the results depend on your effort and circumstances.',
  },
]

export function Faq() {
  return (
    <section className="border-t border-line py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <p className="mt-4 text-sm text-muted">
            Something else?{' '}
            <Link to="/contact" className="text-accent underline-offset-4 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-fg">
                  {item.q}
                  <Plus className="h-4 w-4 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 pr-8 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
