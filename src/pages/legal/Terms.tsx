import { REPORT_PRICE } from '@shared/pricing'
import { Link } from 'react-router-dom'
import { LegalPage } from '../../components/layout/LegalPage'
import { useSeo } from '../../lib/seo'
import { SITE } from '../../lib/site'

export default function Terms() {
  useSeo({ title: 'Terms of Service', description: 'The terms that apply when you use Sidebase and purchase a report.', path: '/terms' })
  return (
    <LegalPage
      title="Terms of Service"
      intro={<>These terms apply to your use of {SITE.url.replace('https://', '')} (“Sidebase”, “we”, “us”), operated by {SITE.operator}. By using the site you agree to them.</>}
    >
      <h2>1. What Sidebase provides</h2>
      <p>
        Sidebase offers a free questionnaire that matches you with online business ideas and side hustles, a free preview of your top
        three matches, and an optional paid digital product: the Full Side Hustle Report (“Report”). The Report contains your top ten
        matches with detailed descriptions, launch steps, tool suggestions and guidance, and can be downloaded as a PDF.
      </p>

      <h2>2. Educational information only — no earnings guarantee</h2>
      <p>
        All content on Sidebase, including the Report, is general educational information. It is not financial, legal, tax or business
        advice tailored to your circumstances. <strong>We do not guarantee that you will earn any money.</strong> Startup costs, time
        requirements and timelines are typical ranges and may differ for you. Any business involves risk, and results depend on your
        effort, skills, market conditions and other factors outside our control. Consult a qualified professional before making financial
        decisions.
      </p>

      <h2>3. Purchases and pricing</h2>
      <ul>
        <li>The Report costs {REPORT_PRICE.display} (USD) as a <strong>single, one-time payment</strong>. It is not a subscription and you will not be charged again.</li>
        <li>Prices are shown before checkout. Your bank may apply currency conversion or foreign transaction fees.</li>
        <li>Payments are processed by Stripe. We never receive or store your full card details.</li>
        <li>The Report is generated from the answers you submitted at the time of purchase.</li>
      </ul>

      <h2>4. Digital delivery and right of withdrawal</h2>
      <p>
        The Report is digital content delivered immediately after successful payment, on the page you are redirected to. Before
        purchasing, you expressly request immediate delivery and acknowledge that, where applicable law grants a right of withdrawal for
        digital content (for example in the EU, EEA or UK), you lose that right once delivery has begun. This does not affect your
        rights if the Report is defective or not delivered — see our <Link to="/refunds">Refund Policy</Link>.
      </p>

      <h2>5. Access to your Report</h2>
      <p>
        Sidebase does not use accounts. Your Report is linked to your purchase reference and is accessible through the link shown after
        payment on the device you used. Please download the PDF or bookmark the link. Anyone with your link can view your Report, so keep
        it private. If you lose access, contact us with your Stripe receipt and we will help.
      </p>

      <h2>6. License and acceptable use</h2>
      <p>
        We grant you a personal, non-transferable license to use the Report for your own purposes. You may not resell, republish or
        redistribute the Report or the site’s content, or attempt to access paid content without paying, interfere with the site, or use
        automated tools to scrape it.
      </p>

      <h2>7. Third-party tools and links</h2>
      <p>
        The Report mentions third-party products, platforms and services. We are not affiliated with them unless stated, do not control
        them, and are not responsible for their content, pricing or terms. Check their current terms before using them.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Sidebase is provided “as is”, and our total liability for any claim relating to the site or the
        Report is limited to the amount you paid for the Report. We are not liable for indirect or consequential losses, including lost
        profits or business decisions you make based on the content. Nothing in these terms limits liability that cannot be limited by
        law, or your statutory consumer rights.
      </p>

      <h2>9. Changes</h2>
      <p>We may update these terms. The version in force when you make a purchase applies to that purchase.</p>

      <h2>10. Governing law and contact</h2>
      <p>
        These terms are governed by the laws of {SITE.governingLaw}, without prejudice to mandatory consumer protection laws of your
        country of residence. Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalPage>
  )
}
