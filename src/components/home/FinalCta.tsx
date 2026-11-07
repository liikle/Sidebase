import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function FinalCta() {
  return (
    <section className="border-t border-line py-24 sm:py-28">
      <Container>
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)]"
            />
            <div className="relative">
              <h2 className="text-balance mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
                Stop Wondering. Start Exploring.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-muted">
                Seven questions stand between you and a shortlist of opportunities that actually fit.
              </p>
              <ButtonLink to="/find" size="lg" className="mt-9">
                Find My Side Hustle
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
