import { REPORT_PRICE } from '@shared/pricing'
import { LegalPage } from '../../components/layout/LegalPage'
import { useSeo } from '../../lib/seo'
import { SITE } from '../../lib/site'

export default function Refunds() {
  useSeo({ title: 'Refund Policy', description: 'Refunds for the Sidebase Full Side Hustle Report, a one-time digital purchase.', path: '/refunds' })
  return (
    <LegalPage
      title="Refund Policy"
      intro={<>The Full Side Hustle Report is a one-time {REPORT_PRICE.display} digital purchase. Here is how refunds work.</>}
    >
      <h2>One-time payment, no subscription</h2>
      <p>You pay once. There are no recurring charges, so there is nothing to cancel.</p>

      <h2>Immediate digital delivery</h2>
      <p>
        Your Report is delivered instantly after payment. At checkout you request immediate access and acknowledge that, where the law
        provides a right of withdrawal for digital content, it ends once delivery has begun.
      </p>

      <h2>When we will refund you</h2>
      <ul>
        <li>You were charged but could not access your Report and we cannot resolve the problem.</li>
        <li>You were charged more than once for the same purchase.</li>
        <li>The Report is materially defective (for example, content is missing or broken).</li>
      </ul>
      <p>
        Beyond these cases, we still review every request in good faith. If you are unhappy with your Report, contact us within 14 days of
        purchase and tell us why — we want Sidebase to be worth it.
      </p>

      <h2>How to request a refund</h2>
      <p>
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the email address used at checkout or your Stripe receipt. We aim to
        reply within two business days. Approved refunds go back to the original payment method; banks typically take 5–10 business days
        to show them.
      </p>

      <h2>After a refund</h2>
      <p>Access to the refunded Report is removed.</p>

      <h2>Your statutory rights</h2>
      <p>This policy does not affect any rights you have under applicable consumer protection law.</p>
    </LegalPage>
  )
}
