import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { VerticalMarker } from '../ui/VerticalMarker'
import { StatBadge } from '../ui/StatBadge'

interface WellReading {
  label: string
  value: number
  unit: string
  decimals: number
  drift: number
}

const initialReadings: WellReading[] = [
  { label: 'Pressure', value: 4793, unit: 'psi', decimals: 0, drift: 5 },
  { label: 'ROP', value: 38.2, unit: 'm/hr', decimals: 1, drift: 0.5 },
  { label: 'Torque', value: 14.5, unit: 'kNm', decimals: 1, drift: 0.3 },
  { label: 'Temp', value: 92.5, unit: '°C', decimals: 1, drift: 0.15 },
]

/**
 * Charcoal live-telemetry instrument: TENETDrill readout for Well F-15.
 * Floats over the bottom-right of the hero image on desktop. Values
 * drift by a fraction of a percent every few seconds — live
 * instrumentation, not a dramatic fluctuation.
 */
function LiveDashboardCard({ className = '' }: { className?: string }) {
  const [readings, setReadings] = useState(initialReadings)

  useEffect(() => {
    const id = setInterval(() => {
      setReadings((prev) =>
        prev.map((r) => {
          const next = r.value + (Math.random() - 0.5) * r.drift
          return { ...r, value: Math.max(0, next) }
        }),
      )
    }, 3400)
    return () => clearInterval(id)
  }, [])

  return (
    <WetSurface dark className={`hero-dashboard w-full max-w-sm p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="font-display text-sm font-bold tracking-wide text-white">TENETDrill</p>
          <p className="text-xs text-white/50">Well F-15 &middot; Live telemetry</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-lichen-500/20 px-2.5 py-1 text-[11px] font-semibold text-lichen-400">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-lichen-400" />
          LIVE
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-4 py-5">
        {readings.map((r) => (
          <div key={r.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-white/45">{r.label}</dt>
            <dd className="mt-1 font-display text-2xl font-bold text-white tabular-nums">
              {r.value.toFixed(r.decimals)}
              <span className="ml-1 text-sm font-medium text-white/45">{r.unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between rounded-xl border border-lichen-400/25 bg-lichen-400/10 px-4 py-3">
        <span className="text-xs font-medium text-white/70">ILM Confidence</span>
        <span className="font-display text-lg font-bold text-lichen-400">92%</span>
      </div>
    </WetSurface>
  )
}

/**
 * Hero — orchestrated page-load sequence, compressed to ~900ms total:
 * navbar (handled by Nav itself) → eyebrow → headline lines → subhead →
 * CTAs → telemetry card assembles. Runs once on mount; respects
 * prefers-reduced-motion by skipping straight to the end state.
 *
 * Layout is a true two-column grid (image | text), both columns sharing
 * one reference frame — that's deliberate: absolute-positioning the image
 * against the viewport while the text sat inside the centred, max-width
 * container-page is what caused the drift/misalignment on wide screens.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (prefersReducedMotion) {
        gsap.set(['.hero-eyebrow', '.hero-line', '.hero-subhead', '.hero-ctas', '.hero-dashboard'], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
        })
        return
      }

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.35 })
        .from('.hero-line', { opacity: 0, y: 28, duration: 0.45, stagger: 0.08 }, '-=0.15')
        .from('.hero-subhead', { opacity: 0, y: 16, duration: 0.4 }, '-=0.2')
        .from('.hero-ctas', { opacity: 0, y: 12, duration: 0.35 }, '-=0.22')
        .from('.hero-dashboard', { opacity: 0, y: 16, scale: 0.97, duration: 0.5 }, '-=0.35')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden bg-ice-50">
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[45fr_55fr]">
        {/* Left 45% — the image column, edge-to-edge, full height */}
        <div className="relative h-[52vh] lg:h-auto">
          <div className="absolute inset-0">
            <SiteImage
              filename="hero-rig.png"
              alt="Amcule-monitored drilling rig"
              label="Hero — rig / facility"
              className="h-full w-full rounded-none border-0"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-ice-50 lg:block"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent" />

          <LiveDashboardCard className="absolute bottom-5 right-5 z-10 hidden sm:right-8 sm:bottom-8 lg:block" />
        </div>

        {/* Right 55% — warm stone, headline + subtext + CTAs */}
        <div className="bg-dotgrid relative flex items-center bg-ice-50 px-6 py-16 sm:px-10 lg:px-16">
          <VerticalMarker className="inset-y-16 right-4" />

          <div className="max-w-xl">
            <div className="mb-4 h-1 w-[60px] bg-lichen-500" aria-hidden="true" />
            <p className="hero-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-slag-900/10 bg-stone-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slag-900 shadow-card">
              Custom Language Models as a Service
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              <StatBadge>Real-world data</StatBadge>
              <StatBadge>On-premise</StatBadge>
            </div>

            <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-slag-900 sm:text-5xl xl:text-[3.75rem]">
              <span className="hero-line block">Intelligence built</span>
              <span className="hero-line block">for heavy <span className="text-lichen-600">industry.</span></span>
            </h1>

            <p className="hero-subhead mt-8 max-w-xl text-lg leading-relaxed text-slag-700 sm:text-xl">
              Small Language Models + Agents, trained exclusively on your organisation&rsquo;s
              own data. Deployed on-premise, air-gapped where required &mdash; with{' '}
              <span className="font-semibold text-slag-900">zero data egress.</span>
            </p>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton variant="primary">Request Demo</MagneticButton>
              <MagneticButton variant="ghost">See the Architecture</MagneticButton>
            </div>

            {/* Mobile/tablet telemetry card — normal flow, image is stacked above */}
            <div className="mt-12 flex justify-center lg:hidden">
              <LiveDashboardCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
