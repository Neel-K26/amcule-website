import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { VerticalMarker } from '../ui/VerticalMarker'
import { StatBadge } from '../ui/StatBadge'
import { TechMark } from '../ui/TechMark'
import { RockBleed } from '../ui/RockBleed'

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
 * Floats over the top-right of the hero image on desktop. Values drift
 * by a fraction of a percent every few seconds — live instrumentation,
 * not a dramatic fluctuation.
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
    <div className={`relative ${className}`}>
      <TechMark variant="pointer" dark className="absolute -left-14 top-10 hidden h-6 w-16 -scale-x-100 opacity-70 xl:block" />
      <WetSurface dark className="hero-dashboard w-full max-w-md p-6 sm:p-7">
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
      <StatBadge dark className="absolute -bottom-4 left-6 bg-charcoal-900">
        Volve F-15 &middot; Calibrated
      </StatBadge>
    </div>
  )
}

/**
 * Hero — orchestrated page-load sequence, compressed to ~900ms total:
 * navbar (handled by Nav itself) → eyebrow → headline lines → subhead →
 * CTAs → telemetry card assembles. Runs once on mount; respects
 * prefers-reduced-motion by skipping straight to the end state.
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
        .from('.hero-dashboard', { opacity: 0, x: 24, scale: 0.97, duration: 0.5 }, '-=0.35')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="bg-dotgrid relative flex min-h-[100svh] items-center overflow-hidden bg-ice-50 pt-32 pb-20"
    >
      {/* The image IS the hero — full height, the right 58%, feathered
          into the stone on its left edge rather than sitting in a box. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[72%] sm:w-[62%] lg:w-[58%] [mask-image:linear-gradient(to_right,transparent,black_26%)]"
      >
        <SiteImage filename="hero-rig.png" alt="" label="Hero — rig / facility" className="h-full w-full rounded-none border-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/35 via-transparent to-transparent" />
      </div>

      {/* Rock texture bleeding out of Hero's bottom-left, signalling the
          transition down into What We Do below. */}
      <RockBleed corner="bottom-left" filename="oilgas-rig-detail.png" />

      <VerticalMarker className="inset-y-24 right-6" dark />

      {/* Desktop telemetry card — floats over the top-right of the image */}
      <LiveDashboardCard className="hero-dashboard absolute right-6 top-28 z-10 hidden w-full max-w-md lg:block xl:right-14 xl:top-32" />

      <div className="container-page relative z-10">
        <div className="max-w-xl">
          <p className="hero-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-slag-900/10 bg-stone-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slag-900 shadow-card">
            Custom Language Models as a Service
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            <StatBadge>Real-world data</StatBadge>
            <StatBadge>On-premise</StatBadge>
          </div>

          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-slag-900 sm:text-5xl md:text-6xl xl:text-[4rem]">
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
        </div>

        {/* Mobile/tablet telemetry card — normal document flow, no image straddling */}
        <div className="mt-12 flex justify-center lg:hidden">
          <LiveDashboardCard />
        </div>
      </div>
    </section>
  )
}
