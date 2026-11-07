import { Link } from 'react-router-dom'
import { SITE } from '../../lib/site'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { to: '/find', label: 'Side Hustle Finder' },
      { to: '/explore', label: 'Explore Ideas' },
      { to: '/#how-it-works', label: 'How It Works' },
      { to: '/report', label: 'My Report' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms of Service' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/refunds', label: 'Refund Policy' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{SITE.tagline} Personalized online business ideas with clear starting steps.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-fg">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-relaxed text-subtle md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.operator}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Sidebase provides educational information only. Results depend on your effort, skills and market conditions — we do not guarantee any earnings.
          </p>
        </div>
      </Container>
    </footer>
  )
}
