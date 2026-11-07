import { Mail, ReceiptText, Clock } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { useSeo } from '../lib/seo'
import { SITE } from '../lib/site'

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Get in touch with Sidebase for support, report access or refunds.', path: '/contact' })
  return (
    <Container className="pb-24 pt-12 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">We’re here to help.</h1>
        <p className="mt-4 text-lg text-muted">Questions about your report, a refund or anything else — reach out and a human will reply.</p>

        <a
          href={`mailto:${SITE.email}`}
          className="card group mt-10 flex items-center justify-between gap-6 p-6 transition-colors hover:border-accent/40 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted">Email us</p>
              <p className="text-lg font-medium text-fg sm:text-xl">{SITE.email}</p>
            </div>
          </div>
          <span className="hidden text-sm text-muted group-hover:text-accent sm:block">Write an email →</span>
        </a>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card p-6">
            <Clock className="h-5 w-5 text-accent" />
            <p className="mt-4 font-medium text-fg">Response time</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">We aim to reply within two business days.</p>
          </div>
          <div className="card p-6">
            <ReceiptText className="h-5 w-5 text-accent" />
            <p className="mt-4 font-medium text-fg">About a purchase?</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Include the email used at checkout or your Stripe receipt so we can find your order quickly.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
