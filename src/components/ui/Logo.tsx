import { cn } from '../../lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('h-7 w-7', className)}>
      <rect width="32" height="32" rx="8" fill="#38BDF8" />
      <rect x="8" y="8.5" width="10" height="3.5" rx="1.75" fill="#080B12" />
      <rect x="14" y="14.25" width="10" height="3.5" rx="1.75" fill="#080B12" />
      <rect x="8" y="20" width="16" height="3.5" rx="1.75" fill="#080B12" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-[15px] font-bold tracking-[0.14em] text-fg">
        SIDE<span className="text-accent">BASE</span>
      </span>
    </span>
  )
}
