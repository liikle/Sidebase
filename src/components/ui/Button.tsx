import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-40'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink-950 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_8px_24px_-8px_rgba(56,189,248,0.55)] hover:bg-accent-soft active:translate-y-px',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg hover:border-subtle/60 hover:bg-white/[0.06] active:translate-y-px',
  ghost: 'text-muted hover:bg-white/[0.04] hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base sm:h-13 sm:px-7',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, CommonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  ),
)
Button.displayName = 'Button'

export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: CommonProps & LinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  )
}
