import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/#how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || open ? 'border-line bg-ink-950/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" aria-label="Sidebase home" className="rounded-lg">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm transition-colors',
                  isActive && !l.to.includes('#') ? 'text-fg' : 'text-muted hover:text-fg',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink to="/find" size="sm" className="px-4">
            Find My Side Hustle
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink-950 md:hidden"
          >
            <Container className="flex h-full flex-col py-6">
              <nav className="flex flex-col" aria-label="Mobile">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link to={l.to} className="block border-b border-line py-4 text-2xl font-medium tracking-tight text-fg">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pb-6">
                <ButtonLink to="/find" size="lg" className="w-full">
                  Find My Side Hustle <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
