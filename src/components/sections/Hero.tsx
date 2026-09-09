import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { VerticalMarker } from '../ui/VerticalMarker'

interface WellReading {
  label: string
  value: number
  unit: string
  decimals: number
  drift: number
}

const initialReadings: WellReading[] = [
  { label: 'Pressure', value: 4820, unit: 'psi', decimals: 0, drift: 12 },
  { label: 'ROP', value: 38.4, unit: 'm/hr', decimals: 1, drift: 1.2 },
  { label: 'Torque', value: 14.6, unit: 'kNm', decimals: 1, drift: 0.6 },
  { label: 'Temp', value: 92.1, unit: '°C', decimals: 1, drift: 0.4 },
]

/**
 * Charcoal live-dashboard block: TENETDrill telemetry for Well F-15. This
 * is the hero's deliberate dark "object" against the green field. Values
 * tick every 3s with a small bounded random drift to feel live.
 */
function LiveDashboardCard() {
  const [readings, setReadings] = useState(initialReadings)

  useEffect(() => {
    const id = setInterval(() => {
      setReadings((prev) =>
        prev.map((r) => {
          const next = r.value + (Math.random() - 0.5) * r.drift
          return { ...r, value: Math.max(0, next) }
        }),
      )
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
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
  )
}

/**
 * Hero — orchestrated page-load sequence: headline lines rise in, subhead
 * and CTAs fade up, dashboard card scales in from the right. Runs once on
 * mount; respects prefers-reduced-motion by skipping straight to end state.
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

      tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.6 })
        .from('.hero-line', { opacity: 0, y: 48, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .from('.hero-subhead', { opacity: 0, y: 24, duration: 0.7 }, '-=0.4')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-dashboard', { opacity: 0, x: 40, scale: 0.96, duration: 0.9 }, '-=0.6')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-lichen-500 pt-32 pb-20"
    >
      {/* Topographic contour texture — subtle, top-left corner */}
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 -z-10 rotate-180 opacity-[0.07]" />

      {/* Rig photo bleeding in from the right edge, green-tinted — not a
          full-bleed background, an edge device behind the dashboard card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[46%] opacity-70 [mask-image:linear-gradient(to_left,black_30%,transparent_92%)]"
      >
        <SiteImage
          filename="hero-rig.jpg"
          alt=""
          label="Hero — rig / facility, bleeds in from the right"
          className="h-full w-full rounded-none border-0"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[46%] bg-lichen-500/55" />

      <VerticalMarker className="inset-y-24 right-6" />

      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slag-900 shadow-card">
            Custom Language Models as a Service
          </p>

          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-slag-900 sm:text-5xl md:text-6xl xl:text-[4rem]">
            <span className="hero-line block">Intelligence built</span>
            <span className="hero-line block">for heavy <span className="text-charcoal-900">industry.</span></span>
          </h1>

          <p className="hero-subhead mt-8 max-w-xl text-lg leading-relaxed text-slag-700 sm:text-xl">
            Small Language Models + Agents, trained exclusively on your organisation&rsquo;s
            own data. Deployed on-premise, air-gapped where required &mdash; with{' '}
            <span className="font-semibold text-slag-900">zero data egress.</span>
          </p>

          <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton variant="dark">Request Demo</MagneticButton>
            <MagneticButton variant="white">See the Architecture</MagneticButton>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LiveDashboardCard />
        </div>
      </div>
    </section>
  )
}
