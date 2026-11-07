import { LOGO, type LogoVariant, lockupInner, markInner } from '@shared/brand'
import { useId, useMemo } from 'react'
import { cn } from '../../lib/cn'

/** React's useId contains colons, which are awkward inside url(#…) references. */
function useSvgId(prefix: string) {
  const raw = useId()
  return `${prefix}${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`
}

/** The Sidebase "S" mark. Size it with a height class; width follows the aspect ratio. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useSvgId('sbm')
  const html = useMemo(() => markInner(id), [id])
  return (
    <svg
      viewBox={`0 0 ${LOGO.markWidth} ${LOGO.height}`}
      className={cn('h-7 w-auto shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/** Full lockup: mark | Sidebase.cc — exactly as the official artwork. */
export function Logo({ className, variant = 'onDark' }: { className?: string; variant?: LogoVariant }) {
  const id = useSvgId('sbl')
  const html = useMemo(() => lockupInner(id, variant), [id, variant])
  return (
    <svg
      viewBox={`0 0 ${LOGO.width} ${LOGO.height}`}
      className={cn('h-7 w-auto shrink-0', className)}
      role="img"
      aria-label="Sidebase.cc"
      dangerouslySetInnerHTML={{ __html: `<title>Sidebase.cc</title>${html}` }}
    />
  )
}
