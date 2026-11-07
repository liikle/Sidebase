import { LegalPage } from '../../components/layout/LegalPage'
import { useSeo } from '../../lib/seo'
import { SITE } from '../../lib/site'

export default function Privacy() {
  useSeo({ title: 'Privacy Policy', description: 'How Sidebase handles your data: no accounts, no tracking cookies, minimal data.', path: '/privacy' })
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Sidebase is designed to collect as little personal data as possible. There are no accounts, no advertising trackers and no data sales."
    >
      <h2>1. Who is responsible</h2>
      <p>
        {SITE.operator} operates Sidebase and is the controller of personal data processed through the site. Contact:{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. Questionnaire answers</h2>
      <p>
        Your answers are processed in your browser to calculate your matches and are saved in your browser’s local storage so your results
        are still there when you return. They are not sent to our servers unless you start a purchase. You can delete them at any time by
        clearing your browser’s site data.
      </p>

      <h2>3. Purchases</h2>
      <ul>
        <li>
          When you buy the Report, your answers are attached to your Stripe Checkout Session so we can generate the Report you paid for.
          Answers describe preferences (for example “budget under $50”) and do not identify you.
        </li>
        <li>
          Stripe processes your payment and collects the information required for it, such as your email address and payment details,
          under its own <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>. We can see transaction
          details in our Stripe dashboard (for support, refunds and accounting) but never your full card number.
        </li>
        <li>
          On our side, we store only a record that a purchase reference has been paid, together with the encoded answers and timestamps,
          so your Report can be unlocked. We do not store your name, email or address in this record.
        </li>
      </ul>

      <h2>4. Legal bases</h2>
      <p>
        We process purchase data to perform our contract with you, and keep transaction records to meet legal accounting obligations.
        Technical data needed to run the site securely is processed based on our legitimate interest in operating a safe service.
      </p>

      <h2>5. Hosting, security and logs</h2>
      <p>
        The site is hosted on Cloudflare, which processes technical data such as IP addresses to deliver the site and protect it from
        abuse. We do not use advertising or tracking cookies.
      </p>

      <h2>6. Local storage</h2>
      <p>
        We use your browser’s local and session storage — not cookies — to remember your answers, your progress in the questionnaire and
        your purchase reference. This is strictly necessary to provide the features you request.
      </p>

      <h2>7. Retention</h2>
      <p>
        Purchase records are kept for up to two years so you can re-open your Report, and transaction records in Stripe are kept as long
        as required by law.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or export your personal data, to object to or
        restrict processing, and to complain to a data protection authority. To exercise your rights, email{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>9. International transfers</h2>
      <p>
        Our service providers (Stripe and Cloudflare) may process data outside your country, using safeguards such as standard
        contractual clauses.
      </p>

      <h2>10. Changes</h2>
      <p>We may update this policy and will change the “last updated” date when we do.</p>
    </LegalPage>
  )
}
