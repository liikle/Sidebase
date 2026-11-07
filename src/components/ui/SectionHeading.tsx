import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.035em] text-fg sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="text-pretty mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}
