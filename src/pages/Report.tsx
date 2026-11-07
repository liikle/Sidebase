import { formatCost, formatHours } from '@shared/ideas'
import type { Report as ReportData } from '@shared/types'
import { motion } from 'framer-motion'
import { AlertCircle, Bookmark, Check, ChevronRight, Download, Link2, RefreshCw, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IdeaDrawer } from '../components/report/IdeaDrawer'
import { ProfileSummary } from '../components/results/ProfileSummary'
import { Button, ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { DifficultyMeter } from '../components/ui/Difficulty'
import { EmptyState } from '../components/ui/EmptyState'
import { MatchRing } from '../components/ui/MatchRing'
import { Spinner } from '../components/ui/Spinner'
import { ApiError, fetchReport } from '../lib/api'
import { useSeo } from '../lib/seo'
import { SITE } from '../lib/site'
import { loadPurchaseRef, savePurchaseRef } from '../lib/storage'

type State =
  | { kind: 'loading' }
  | { kind: 'pending' }
  | { kind: 'error'; message: string; code?: string; retryable: boolean }
  | { kind: 'ready'; report: ReportData }

const MAX_PENDING_POLLS = 12

export default function Report() {
  useSeo({ title: 'Your Full Report', path: '/report', noindex: true })
  const [params, setParams] = useSearchParams()
  const urlSession = params.get('session_id')
  const sessionId = useMemo(() => urlSession ?? loadPurchaseRef(), [urlSession])
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (urlSession) savePurchaseRef(urlSession)
    else if (sessionId) setParams({ session_id: sessionId }, { replace: true })
  }, [urlSession, sessionId, setParams])

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    let timer: number | undefined
    let polls = 0

    const run = async () => {
      try {
        const res = await fetchReport(sessionId)
        if (cancelled) return
        if (res.status === 'paid') {
          setState({ kind: 'ready', report: res.report })
        } else if (polls < MAX_PENDING_POLLS) {
          polls++
          setState({ kind: 'pending' })
          timer = window.setTimeout(run, 2500)
        } else {
          setState({
            kind: 'error',
            message: 'Your payment is still processing. This can take a few minutes for some payment methods — please check back shortly.',
            retryable: true,
          })
        }
      } catch (e) {
        if (cancelled) return
        const err = e instanceof ApiError ? e : new ApiError('We could not reach Sidebase. Check your connection and try again.', 0)
        if (['refunded', 'not_found', 'invalid_session'].includes(err.code ?? '')) savePurchaseRef(null)
        setState({
          kind: 'error',
          message: err.message,
          code: err.code,
          retryable: err.status === 0 || err.status >= 500,
        })
      }
    }
    setState({ kind: 'loading' })
    run()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [sessionId, attempt])

  if (!sessionId) {
    return (
      <EmptyState
        title="No report on this device"
        text={
          <>
            Reports are unlocked on the device used for purchase. If you bought a report on another device, open your report link there —
            or contact <a className="text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a> with your Stripe receipt and we’ll help.
          </>
        }
        action={{ to: '/find', label: 'Find My Side Hustle' }}
        secondary={{ to: '/contact', label: 'Contact support' }}
      />
    )
  }

  if (state.kind === 'loading' || state.kind === 'pending') {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-20">
        <div className="max-w-sm text-center" aria-live="polite">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-800">
            <Spinner className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-fg">
            {state.kind === 'pending' ? 'Confirming your payment' : 'Verifying your purchase'}
          </h1>
          <p className="mt-3 text-muted">
            {state.kind === 'pending'
              ? 'Your payment is being processed by Stripe. This page will update automatically.'
              : 'Securely confirming your payment with Stripe and preparing your report.'}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-subtle">
            <ShieldCheck className="h-4 w-4" /> Verified server-side — no account needed
          </p>
        </div>
      </Container>
    )
  }

  if (state.kind === 'error') {
    return (
      <EmptyState
        icon={<AlertCircle className="h-5 w-5" />}
        title={state.code === 'refunded' ? 'Report unavailable' : 'We couldn’t load your report'}
        text={
          <>
            <p>{state.message}</p>
            {state.retryable && (
              <Button variant="secondary" className="mt-6" onClick={() => setAttempt((a) => a + 1)}>
                <RefreshCw className="h-4 w-4" /> Try again
              </Button>
            )}
            <p className="mt-6 text-sm">
              Paid and still stuck? Email <a className="text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a> with your receipt.
            </p>
          </>
        }
        action={state.retryable ? undefined : { to: '/find', label: 'Back to the finder' }}
      />
    )
  }

  return <ReportView report={state.report} />
}

function ReportView({ report }: { report: ReportData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [pdfState, setPdfState] = useState<'idle' | 'working' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const items = report.items

  const navigate = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : Math.min(items.length - 1, Math.max(0, i + delta)))),
    [items.length],
  )
  const close = useCallback(() => setOpenIndex(null), [])

  async function downloadPdf() {
    setPdfState('working')
    try {
      const { downloadReportPdf } = await import('../lib/pdf')
      await downloadReportPdf(report)
      setPdfState('idle')
    } catch (e) {
      console.error(e)
      setPdfState('error')
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked; the URL is still in the address bar */
    }
  }

  const date = new Date(report.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="relative">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-x-0 -top-16 h-[480px]" />
      <Container className="relative pb-24 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-xs font-medium text-emerald-200">
              <Check className="h-3 w-3" strokeWidth={3} /> Payment verified
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">Your Side Hustle Report</h1>
            <p className="mt-3 text-muted">Prepared {date} · Top {items.length} matches with complete launch plans</p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Button variant="secondary" onClick={copyLink}>
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
              {copied ? 'Link copied' : 'Copy report link'}
            </Button>
            <Button onClick={downloadPdf} disabled={pdfState === 'working'}>
              {pdfState === 'working' ? <Spinner className="h-4 w-4 border-ink-950/30 border-t-ink-950" /> : <Download className="h-4 w-4" />}
              {pdfState === 'working' ? 'Preparing PDF…' : 'Download PDF'}
            </Button>
          </div>
        </motion.div>

        {pdfState === 'error' && (
          <p role="alert" className="mt-4 text-sm text-red-200">
            The PDF could not be generated. Please try again, or use your browser’s print function.
          </p>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-ink-800/60 px-4 py-3 text-sm text-muted">
          <Bookmark className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Keep your report: download the PDF or bookmark this page. Anyone with this link can view the report, so share it only with people you trust.
          </p>
        </div>

        <div className="card mt-8 p-5 sm:p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-subtle">Your profile</p>
          <ProfileSummary answers={report.answers} />
        </div>

        <h2 className="mt-14 text-xl font-semibold tracking-tight text-fg">Your top {items.length} opportunities</h2>
        <p className="mt-1.5 text-sm text-muted">Select any opportunity to see why it fits and exactly how to start.</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[48px_1fr_88px_112px_104px_150px_24px] items-center gap-4 border-b border-line bg-ink-900/60 px-5 py-3 text-xs text-subtle lg:grid">
            <span>#</span>
            <span>Opportunity</span>
            <span>Match</span>
            <span>Startup cost</span>
            <span>Difficulty</span>
            <span>Weekly time</span>
            <span />
          </div>
          <ul className="divide-y divide-line">
            {items.map((item, i) => (
              <motion.li
                key={item.idea.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 bg-ink-800/40 px-5 py-4 text-left transition-colors hover:bg-ink-800 lg:grid-cols-[48px_1fr_88px_112px_104px_150px_24px]"
                >
                  <span className="hidden font-mono text-xs text-subtle lg:block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-subtle lg:hidden">{String(i + 1).padStart(2, '0')}</span>
                      <span className="truncate font-medium text-fg">{item.idea.name}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted">{item.idea.monetization.slice(0, 2).join(' · ')}</span>
                    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted lg:hidden">
                      <span className="tabular-nums">{formatCost(item.idea.startupCost)}</span>
                      <DifficultyMeter level={item.idea.difficulty} />
                      <span className="tabular-nums">{formatHours(item.idea.weeklyHours)}</span>
                    </span>
                  </span>
                  <span className="lg:hidden">
                    <MatchRing score={item.score} size={48} animate={false} />
                  </span>
                  <span className="hidden items-center gap-2 lg:flex">
                    <span className="text-sm font-semibold tabular-nums text-fg">{item.score}%</span>
                  </span>
                  <span className="hidden text-sm tabular-nums text-fg lg:block">{formatCost(item.idea.startupCost)}</span>
                  <span className="hidden text-sm text-fg lg:block">
                    <DifficultyMeter level={item.idea.difficulty} />
                  </span>
                  <span className="hidden text-sm tabular-nums text-fg lg:block">{formatHours(item.idea.weeklyHours)}</span>
                  <ChevronRight className="hidden h-4 w-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent lg:block" />
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-ink-900/40 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-fg">Situation changed?</p>
            <p className="mt-1 text-sm text-muted">You can retake the free finder any time to explore a different direction.</p>
          </div>
          <ButtonLink to="/find" variant="secondary">
            Retake the finder
          </ButtonLink>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-subtle">
          This report is educational. Match scores reflect fit with your answers, not expected income. Costs and timelines are typical ranges.
          Sidebase does not guarantee earnings.
        </p>
      </Container>

      <IdeaDrawer
        item={openIndex === null ? null : items[openIndex]}
        rank={(openIndex ?? 0) + 1}
        total={items.length}
        onClose={close}
        onNavigate={navigate}
      />
    </div>
  )
}
