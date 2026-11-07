import type { ReactNode } from 'react'
import { Container } from '../ui/Container'
import { SITE } from '../../lib/site'

export function LegalPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <Container className="pb-24 pt-12 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-subtle">Last updated {SITE.lastUpdated}</p>
        {intro && <div className="mt-8 text-lg leading-relaxed text-muted">{intro}</div>}
        <div className="prose-legal mt-6">{children}</div>
      </div>
    </Container>
  )
}
