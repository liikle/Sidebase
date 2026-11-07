import { IDEAS } from '@shared/ideas'
import { QUESTIONS, validateAnswers, type Option } from '@shared/questions'
import type { Answers } from '@shared/types'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { iconFor } from '../components/finder/optionIcons'
import { Button } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'
import { loadDraft, saveAnswers, saveDraft } from '../lib/storage'

type PartialAnswers = { [K in keyof Answers]?: Answers[K] }

const ease = [0.22, 1, 0.36, 1] as const
const TOTAL = QUESTIONS.length

function isAnswered(value: unknown): boolean {
  return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.length > 0
}

export default function Finder() {
  useSeo({
    title: 'Side Hustle Finder',
    description: 'Answer seven quick questions and discover online side hustles matched to your skills, budget and time.',
    path: '/find',
  })
  const navigate = useNavigate()
  const draft = useRef(loadDraft()).current
  const [step, setStep] = useState(() => Math.min(Math.max(draft?.step ?? 0, 0), TOTAL - 1))
  const [answers, setAnswers] = useState<PartialAnswers>(() => (draft?.answers as PartialAnswers) ?? {})
  const [direction, setDirection] = useState(1)
  const [phase, setPhase] = useState<'questions' | 'analyzing'>('questions')
  const advanceTimer = useRef<number | undefined>(undefined)

  const q = QUESTIONS[step]
  const value = answers[q.key]
  const answered = isAnswered(value)

  useEffect(() => {
    saveDraft({ step, answers })
  }, [step, answers])

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  const finish = useCallback(
    (final: PartialAnswers) => {
      const valid = validateAnswers(final)
      if (!valid) return
      saveAnswers(valid)
      saveDraft(null)
      setPhase('analyzing')
    },
    [],
  )

  const goNext = useCallback(
    (current: PartialAnswers = answers) => {
      window.clearTimeout(advanceTimer.current)
      if (!isAnswered(current[QUESTIONS[step].key])) return
      if (step === TOTAL - 1) return finish(current)
      setDirection(1)
      setStep((s) => s + 1)
    },
    [answers, step, finish],
  )

  const goBack = useCallback(() => {
    window.clearTimeout(advanceTimer.current)
    if (step === 0) return
    setDirection(-1)
    setStep((s) => s - 1)
  }, [step])

  const select = useCallback(
    (opt: Option<string>) => {
      if (q.multi) {
        const current = (answers[q.key] as string[] | undefined) ?? []
        let next: string[]
        if (current.includes(opt.id)) next = current.filter((x) => x !== opt.id)
        else if (opt.id === 'none') next = ['none']
        else next = [...current.filter((x) => x !== 'none'), opt.id]
        setAnswers((a) => ({ ...a, [q.key]: next }))
      } else {
        const next = { ...answers, [q.key]: opt.id }
        setAnswers(next)
        window.clearTimeout(advanceTimer.current)
        advanceTimer.current = window.setTimeout(() => goNext(next), 320)
      }
    },
    [answers, q, goNext],
  )

  // Keyboard: 1–9 to pick, Enter to continue, Backspace/← to go back.
  useEffect(() => {
    if (phase !== 'questions') return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= q.options.length) {
        e.preventDefault()
        select(q.options[n - 1])
      } else if (e.key === 'Enter' && answered && target.tagName !== 'BUTTON' && target.tagName !== 'A') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' && step > 0) {
        goBack()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, q, select, answered, goNext, goBack, step])

  useEffect(() => {
    if (phase !== 'analyzing') return
    const t = window.setTimeout(() => navigate('/results', { replace: true }), 2300)
    return () => window.clearTimeout(t)
  }, [phase, navigate])

  const progress = phase === 'analyzing' ? 100 : ((step + (answered ? 1 : 0.35)) / TOTAL) * 100

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="Sidebase home" className="rounded-lg">
            <Logo />
          </Link>
          {phase === 'questions' && (
            <p className="text-sm tabular-nums text-muted" aria-live="polite">
              <span className="text-fg">{step + 1}</span> / {TOTAL}
            </p>
          )}
          <Link
            to="/"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
            aria-label="Exit the finder"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>
        <div className="h-[2px] w-full bg-white/[0.04]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <motion.div
            className="h-full bg-accent shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </header>

      {phase === 'analyzing' ? (
        <Analyzing />
      ) : (
        <>
          <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-36 pt-10 sm:px-8 sm:pt-16">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.section
                key={q.key}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.32, ease }}
                aria-labelledby={`q-${q.key}`}
              >
                <p className="eyebrow">Question {step + 1}</p>
                <h1 id={`q-${q.key}`} className="text-balance mt-3 text-3xl font-semibold tracking-[-0.035em] text-fg sm:text-4xl">
                  {q.title}
                </h1>
                <p className="mt-3 text-muted">
                  {q.subtitle}
                  {q.multi && Array.isArray(value) && value.length > 0 && (
                    <span className="ml-2 text-accent-soft">· {value.length} selected</span>
                  )}
                </p>

                <div
                  role={q.multi ? 'group' : 'radiogroup'}
                  aria-labelledby={`q-${q.key}`}
                  className={cn('mt-9 grid gap-2.5', q.multi ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1')}
                >
                  {q.options.map((opt, i) => {
                    const selected = q.multi ? ((value as string[] | undefined) ?? []).includes(opt.id) : value === opt.id
                    const Icon = q.key === 'budget' || q.key === 'time' ? undefined : iconFor(q.key, opt.id)
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        role={q.multi ? 'checkbox' : 'radio'}
                        aria-checked={selected}
                        onClick={() => select(opt)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease, delay: 0.04 + i * 0.03 }}
                        className={cn(
                          'group flex w-full items-center gap-4 rounded-2xl border px-4 text-left transition-all duration-200',
                          q.multi ? 'min-h-[60px] py-3' : 'min-h-[68px] py-4 sm:px-5',
                          selected
                            ? 'border-accent/70 bg-accent/[0.08] shadow-[0_0_0_1px_rgba(56,189,248,0.25)_inset]'
                            : 'border-line bg-ink-800/70 hover:border-line-strong hover:bg-ink-800',
                        )}
                      >
                        {Icon && (
                          <span
                            className={cn(
                              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors',
                              selected ? 'border-accent/30 bg-accent/15 text-accent' : 'border-line bg-white/[0.03] text-muted group-hover:text-fg',
                            )}
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className={cn('block font-medium', q.multi ? 'text-[15px]' : 'text-base', selected ? 'text-fg' : 'text-fg/90')}>
                            {opt.label}
                          </span>
                          {opt.hint && <span className="mt-0.5 block text-sm text-muted">{opt.hint}</span>}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-200',
                            q.multi ? 'rounded-md' : 'rounded-full',
                            selected ? 'border-accent bg-accent text-ink-950' : 'border-line-strong',
                          )}
                        >
                          {selected && <Check className="h-3 w-3" strokeWidth={3.5} />}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>

                <p className="mt-6 hidden text-xs text-subtle sm:block">
                  Tip: press <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">1</kbd>–
                  <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">{Math.min(q.options.length, 9)}</kbd> to select
                  {answered && (
                    <>
                      , <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">Enter</kbd> to continue
                    </>
                  )}
                </p>
              </motion.section>
            </AnimatePresence>
          </main>

          {/* Bottom bar */}
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-3xl items-center justify-between gap-3 px-5 sm:px-8">
              <Button variant="ghost" onClick={goBack} disabled={step === 0} className="px-3">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => goNext()} disabled={!answered} className="min-w-[148px]">
                {step === TOTAL - 1 ? 'See my matches' : 'Continue'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const ANALYSIS_STEPS = [
  'Reviewing your skills and interests',
  'Checking budget and time fit',
  `Scoring ${IDEAS.length} opportunities`,
  'Ranking your best matches',
]

function Analyzing() {
  const [done, setDone] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setDone((d) => Math.min(d + 1, ANALYSIS_STEPS.length)), 480)
    return () => window.clearInterval(t)
  }, [])

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-16" aria-live="polite">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease }}
        className="w-full max-w-sm text-center"
      >
        <div className="relative mx-auto h-20 w-20">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent [animation-duration:900ms]" />
          <div className="absolute inset-3 rounded-full bg-accent/10 blur-md" />
        </div>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-fg">Finding your best matches</h1>
        <ul className="mx-auto mt-8 space-y-3 text-left">
          {ANALYSIS_STEPS.map((s, i) => (
            <li key={s} className={cn('flex items-center gap-3 text-sm transition-colors duration-300', i < done ? 'text-fg' : 'text-subtle')}>
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                  i < done ? 'border-accent bg-accent text-ink-950' : 'border-line-strong',
                )}
              >
                {i < done && <Check className="h-3 w-3" strokeWidth={3.5} />}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  )
}
