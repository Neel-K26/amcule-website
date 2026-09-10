import { useEffect, useState } from 'react'
import { Logo } from '../ui/Logo'
import { MagneticButton } from '../ui/MagneticButton'
import { navSections } from '../../config/navigation'
import clsx from '../../lib/clsx'

/**
 * Sticky, blur-backed nav. Highlights the section currently in view via
 * IntersectionObserver and offers a lichen "Request Demo" CTA.
 * Collapses to a full-screen hamburger menu below the md breakpoint.
 */
export function Nav() {
  const [activeId, setActiveId] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={clsx('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'py-3' : 'py-5')}
    >
      <div
        className={clsx(
          'container-page flex items-center justify-between rounded-xl border border-slag-900/10 bg-ice-50/85 px-5 py-2.5 shadow-card backdrop-blur-md transition-all duration-300',
          scrolled && 'bg-ice-50/95 shadow-card-lg',
        )}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Amcule home"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={clsx(
                'flex items-center gap-1.5 font-body text-sm font-medium tracking-wide transition-colors',
                activeId === section.id ? 'text-slag-900' : 'text-slag-900/60 hover:text-slag-900',
              )}
            >
              {activeId === section.id && <span className="h-1.5 w-1.5 rounded-full bg-lichen-500" aria-hidden="true" />}
              {section.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton variant="dark" onClick={() => scrollTo('contact')} className="!px-6 !py-3 !text-sm">
            Request Demo
          </MagneticButton>
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 text-slag-900 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6L20 20M20 6L6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 13H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="container-page mt-2 lg:hidden">
          <div className="wet-surface flex flex-col gap-1 p-4">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={clsx(
                  'rounded-lg px-3 py-3 text-left font-body text-base font-medium transition-colors',
                  activeId === section.id ? 'text-slag-900 bg-lichen-500/15' : 'text-slag-900 hover:bg-ice-100',
                )}
              >
                {section.label}
              </button>
            ))}
            <MagneticButton variant="dark" onClick={() => scrollTo('contact')} className="mt-2">
              Request Demo
            </MagneticButton>
          </div>
        </div>
      )}
    </header>
  )
}
