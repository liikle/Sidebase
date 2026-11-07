import { REPORT_PRICE } from '@shared/pricing'
import type { Answers } from '@shared/types'
import { AlertCircle, ArrowRight, Check, Lock, ShieldCheck } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiError, createCheckout } from '../../lib/api'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'

const INCLUDED = [
  'Your top 10 personalized matches, ranked',
  'Why each opportunity fits your answers',
  'Step-by-step launch plans and recommended tools',
  'How to find your first customer and make your first sale',
  'Common mistakes to avoid and ways to scale',
  'A professionally designed PDF to keep',
]

export function UnlockPanel({ answers }: { answers: Answers }) {
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const consentId = useId()

  async function startCheckout() {
    if (!consent) {
      setError('Please confirm the checkbox above to continue.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const url = await createCheckout(answers, true)
      window.location.assign(url)
    } catch (e) {
      setLoading(false)
      setError(e instanceof ApiError ? e.message : 'We could not start checkout. Please try again.')
    }
  }

  return (
    <section id="unlock" aria-labelledby="unlock-title" className="card relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-64 w-96 rounded-full bg-accent/[0.10] blur-3xl" />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-soft">
            <Lock className="h-3 w-3" /> Premium report
          </span>
          <h2 id="unlock-title" className="text-balance mt-5 text-3xl font-semibold tracking-[-0.035em] text-fg sm:text-4xl">
            Your Full Side Hustle Report Is Ready.
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            Unlock your personalized recommendations, detailed starting instructions, required tools, and practical action plans.
          </p>
          <ul className="mt-8 grid gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] text-fg/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border border-line bg-ink-900/70 p-6 sm:p-7">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-[-0.04em] text-fg">{REPORT_PRICE.display}</span>
            <span className="pb-1.5 text-sm text-muted">USD</span>
          </div>
          <p className="mt-2 text-sm font-medium text-accent-soft">One-time payment · Not a subscription</p>
          <p className="mt-1 text-sm text-muted">Instant access. No account required.</p>

          <label htmlFor={consentId} className="mt-7 flex cursor-pointer gap-3 text-[13px] leading-relaxed text-muted">
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (e.target.checked) setError(null)
              }}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line-strong bg-ink-800 accent-[#38BDF8]"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" target="_blank" className="text-fg underline underline-offset-2 hover:text-accent">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/refunds" target="_blank" className="text-fg underline underline-offset-2 hover:text-accent">
                Refund Policy
              </Link>
              . I request immediate access to this digital report and understand that my right of withdrawal ends once it is delivered.
            </span>
          </label>

          <Button size="lg" onClick={startCheckout} disabled={loading} className={cn('mt-6 w-full', !consent && 'opacity-90')}>
            {loading ? (
              <>
                <Spinner className="h-4 w-4 border-ink-950/30 border-t-ink-950" /> Redirecting to secure checkout…
              </>
            ) : (
              <>
                Unlock My Full Report <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>

          {error && (
            <p role="alert" className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2.5 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-auto pt-6">
            <p className="flex items-center gap-2 text-xs text-subtle">
              <ShieldCheck className="h-4 w-4 text-muted" />
              Secure checkout by Stripe. We never see your card details.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
