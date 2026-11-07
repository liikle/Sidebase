import { ArrowRight, Compass } from 'lucide-react'
import type { ReactNode } from 'react'
import { ButtonLink } from './Button'
import { Container } from './Container'

export function EmptyState({
  title,
  text,
  action,
  icon,
  secondary,
}: {
  title: string
  text: ReactNode
  action?: { to: string; label: string }
  secondary?: { to: string; label: string }
  icon?: ReactNode
}) {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-800 text-accent">
          {icon ?? <Compass className="h-5 w-5" />}
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-fg">{title}</h1>
        <div className="mt-3 leading-relaxed text-muted">{text}</div>
        {(action || secondary) && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {action && (
              <ButtonLink to={action.to}>
                {action.label} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            )}
            {secondary && (
              <ButtonLink to={secondary.to} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
