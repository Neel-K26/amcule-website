import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'

const stats = [
  { value: '25%', label: 'Lower Operational Risk' },
  { value: '30%', label: 'Higher Asset Uptime' },
  { value: '2×', label: 'Faster Decision Cycles' },
]

/**
 * Hero — orchestrated page-load sequence, compressed to ~900ms total:
 * eyebrow → headline lines → subhead → CTAs → stats row. Runs once on
 * mount; respects prefers-reduced-motion by skipping straight to the
 * end state.
 *
 * Warm-stone canvas, per the Section Color Map: the rig photo is a true
 * grid column (right 55%), bleeding to the edge with no gradient mask.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (prefersReducedMotion) {
        gsap.set(['.hero-eyebrow', '.hero-line', '.hero-subhead', '.hero-ctas', '.hero-stats'], {
          opacity: 1,
          y: 0,
        })
        return
      }

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.35 })
        .from('.hero-line', { opacity: 0, y: 28, duration: 0.45, stagger: 0.08 }, '-=0.15')
        .from('.hero-subhead', { opacity: 0, y: 16, duration: 0.4 }, '-=0.2')
        .from('.hero-ctas', { opacity: 0, y: 12, duration: 0.35 }, '-=0.22')
        .from('.hero-stats', { opacity: 0, y: 12, duration: 0.35 }, '-=0.15')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden bg-ice-50">
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[45fr_55fr]">
        {/* Left 45% — warm stone, headline + subtext + CTAs + stats */}
        <div className="relative flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <div className="hero-eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-lichen-dark" aria-hidden="true" />
              <p className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-stone-500">
                Real Fields. Real Data. Real Impact.
              </p>
            </div>

            <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-slag-900 sm:text-5xl xl:text-[3.75rem]">
              <span className="hero-line block">Intelligence for what moves</span>
              <span className="hero-line block">
                the <span className="text-lichen-dark">world.</span>
              </span>
            </h1>

            <p className="hero-subhead mt-8 max-w-xl text-lg leading-relaxed text-slag-700 sm:text-xl">
              Domain-specific language models and AI agents, trained on your data, deployed on your
              infrastructure &mdash; for safer, smarter, and more efficient operations.
            </p>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton variant="dark">Request Demo</MagneticButton>
              <MagneticButton variant="ghost">Explore Our Platform</MagneticButton>
            </div>

            <div className="hero-stats mt-14 flex flex-wrap items-start divide-x divide-slag-900/15">
              {stats.map((s) => (
                <div key={s.label} className="px-6 first:pl-0">
                  <p className="font-display text-3xl font-bold text-slag-900">{s.value}</p>
                  <p className="mt-1 text-sm leading-snug text-stone-500">{s.label}</p>
                </div>
              ))}
              <div className="px-6">
                <p className="text-sm font-medium leading-snug text-slag-900">
                  Real
                  <br />
                  Measurable
                  <br />
                  Impact
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-3">
            <span className="h-px w-10 bg-slag-900/20" aria-hidden="true" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-stone-500">
              Engineering Intelligence for a More Resilient Tomorrow.
            </p>
          </div>
        </div>

        {/* Right 55% — the image column, edge-to-edge, full height, no
            gradient mask — the photo runs straight to the edge. */}
        <div className="relative h-[52vh] lg:h-auto">
          <SiteImage
            filename="hero-rig.png"
            alt="Amcule-monitored drilling rig at sunset"
            label="Hero — rig / facility"
            className="h-full w-full rounded-none border-0"
          />

          <TopoLines variant="contour" dark corner="top-right" className="opacity-[0.12]" />

          <div className="absolute bottom-6 right-6 text-right sm:bottom-8 sm:right-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-white/80">
              Built for
              <br />
              Real Worlds.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
