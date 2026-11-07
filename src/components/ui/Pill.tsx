import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Pill({ children, className, tone = 'default' }: { children: ReactNode; className?: string; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tone === 'accent' ? 'border-accent/25 bg-accent/10 text-accent-soft' : 'border-line bg-white/[0.03] text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
