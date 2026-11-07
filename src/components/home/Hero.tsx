import { IDEAS } from '@shared/ideas'
import { REPORT_PRICE } from '@shared/pricing'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { ProductPreview } from './ProductPreview'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.14),transparent)]"
      />

      <Container className="relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pl-1.5 pr-3 text-xs text-muted"
          >
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-medium text-accent-soft">7 questions</span>
            {IDEAS.length} vetted online income opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="text-balance mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] text-fg sm:text-6xl lg:text-[4.25rem]"
          >
            Your Next Income Stream{' '}
            <span className="bg-gradient-to-r from-white via-accent-soft to-accent bg-clip-text text-transparent">
              Starts Here.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="text-pretty mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Discover online business ideas and side hustles matched to your skills, interests, budget, and lifestyle.
            Find something you can actually start.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink to="/find" size="lg">
              Find My Side Hustle
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to="/#how-it-works" size="lg" variant="secondary">
              How It Works
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {['Free matches', 'No account needed', `Full report ${REPORT_PRICE.display} one-time`].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <ProductPreview />
      </Container>
    </section>
  )
}
