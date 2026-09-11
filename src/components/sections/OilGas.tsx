import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { StrataBands } from '../ui/StrataBands'
import { TechMark } from '../ui/TechMark'
import { VerticalMarker } from '../ui/VerticalMarker'

gsap.registerPlugin(ScrollTrigger)

export interface FormationLayer {
  id: string
  name: string
  depthLabel: string
  /** Real depth range in metres TVD — drives the depth counter interpolation. */
  startDepth: number
  endDepth: number
  /**
   * Share of the pinned descent's scroll room this layer gets — the pacing
   * weighting for the three-act structure. Layers 1–3 are the fast descent
   * (15% each, 45% total). Heimdal is the whole climax: deceleration into
   * the target, then the payoff (40%). Basement is the quick exit (15%).
   */
  weight: number
  isTarget?: boolean
  params: { label: string; value: string }[]
}

/** Real Volve F-15 parameters, one set per formation layer, top to bottom. */
export const formationLayers: FormationLayer[] = [
  {
    id: 'overburden',
    name: 'Overburden',
    depthLabel: '0 – 1,850 m',
    startDepth: 0,
    endDepth: 1850,
    weight: 0.15,
    params: [
      { label: 'Overburden gradient', value: '0.218 bar/m' },
      { label: 'Pore pressure', value: '0.0965 bar/m' },
    ],
  },
  {
    id: 'shale',
    name: 'Shale',
    depthLabel: '1,850 – 2,180 m',
    startDepth: 1850,
    endDepth: 2180,
    weight: 0.15,
    params: [
      { label: 'Fracture gradient', value: '0.154 bar/m' },
      { label: 'Mud viscosity', value: '1.85 cp' },
    ],
  },
  {
    id: 'rogaland',
    name: 'Rogaland Sandstone',
    depthLabel: '2,180 – 2,390 m',
    startDepth: 2180,
    endDepth: 2390,
    weight: 0.15,
    params: [
      { label: 'Permeability', value: '85 mD' },
      { label: 'Pore pressure', value: '0.0965 bar/m' },
    ],
  },
  {
    id: 'heimdal',
    name: 'Heimdal',
    depthLabel: '2,390 – 2,470 m',
    startDepth: 2390,
    endDepth: 2470,
    weight: 0.4,
    isTarget: true,
    params: [
      { label: 'Target TVD', value: '2,470 m' },
      { label: 'Permeability', value: '85 mD' },
      { label: 'Fracture gradient', value: '0.154 bar/m' },
    ],
  },
  {
    id: 'basement',
    name: 'Basement',
    depthLabel: '2,470 m +',
    startDepth: 2470,
    endDepth: 2470,
    weight: 0.15,
    params: [{ label: 'Status', value: 'Below target — TD reached' }],
  },
]

const HEIMDAL_INDEX = formationLayers.findIndex((l) => l.isTarget)

/** Cumulative progress boundaries [0, w0, w0+w1, ...1] from each layer's weight. */
function useBoundaries() {
  return useMemo(() => {
    const bounds = [0]
    for (const layer of formationLayers) bounds.push(bounds[bounds.length - 1] + layer.weight)
    return bounds
  }, [])
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

/** Heavy deceleration — used so Heimdal's approach visibly slows rather than arriving at a constant rate. */
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Perturbs the leading number in a formatted value string by ±1%,
 * preserving its unit suffix and original decimal precision — used to
 * make the live parameter readout jitter like real telemetry.
 */
function jitterValueText(base: string): string {
  const match = base.match(/-?\d+(\.\d+)?/)
  if (!match) return base
  const num = parseFloat(match[0])
  const decimals = match[1] ? match[1].length - 1 : 0
  const jittered = num * (1 + (Math.random() - 0.5) * 0.02)
  const formatted = decimals > 0 ? jittered.toFixed(decimals) : Math.round(jittered).toString()
  return base.slice(0, match.index) + formatted + base.slice((match.index ?? 0) + match[0].length)
}

/**
 * Detects whether the pinned/scrubbed descent should run: desktop-width +
 * motion allowed. Breakpoint is intentionally well below 1024 — a laptop
 * with devtools open or a non-maximized window easily drops under 1024,
 * which was previously enough to silently swap to the static fallback.
 */
const PINNABLE_MIN_WIDTH = '(min-width: 880px)'

function usePinnable() {
  const [pinnable, setPinnable] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(PINNABLE_MIN_WIDTH).matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mqWidth = window.matchMedia(PINNABLE_MIN_WIDTH)
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      const next = mqWidth.matches && !mqMotion.matches
      setPinnable(next)
      if (import.meta.env.DEV && !next) {
        console.debug(
          '[OilGas] Pinned drill sequence disabled —',
          !mqWidth.matches ? `viewport narrower than 880px (currently ${window.innerWidth}px)` : 'prefers-reduced-motion is active',
        )
      }
    }
    update()
    mqWidth.addEventListener('change', update)
    mqMotion.addEventListener('change', update)
    return () => {
      mqWidth.removeEventListener('change', update)
      mqMotion.removeEventListener('change', update)
    }
  }, [])

  return pinnable
}

/**
 * The pinned, scroll-scrubbed wellbore descent — a three-act structure:
 * Act 1 (layers 1–3, 45% of scroll) is a fast, steady-rate descent.
 * Act 2+3 (Heimdal, 40%) decelerates into the target, then pays off —
 * the bit visually stops at 2,470m, the band blooms, and the readout
 * snaps in. Act 4 (basement, 15%) is a quick exit.
 *
 * Everything scroll-driven is still one progress-driven onUpdate, written
 * straight to the DOM via refs/quickSetters — no competing scroll-bound
 * timelines. The idle bit vibration, telemetry jitter, and glow breathing
 * are deliberately separate, non-scroll-bound loops that run underneath it
 * so the sequence stays alive even when the user stops scrolling; the
 * Heimdal payoff's stagger-in is the one intentional one-shot trigger,
 * fired once when arrival crosses its threshold.
 */
function PinnedWellbore() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const columnRef = useRef<HTMLDivElement | null>(null)
  const bitRef = useRef<HTMLDivElement | null>(null)
  const bitCoreRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<HTMLDivElement | null>(null)
  const depthRef = useRef<HTMLSpanElement | null>(null)
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const bandRefs = useRef<Array<HTMLDivElement | null>>([])
  const haloRefs = useRef<Array<HTMLDivElement | null>>([])
  const payoffRef = useRef<HTMLDivElement | null>(null)
  const approachRef = useRef<HTMLDivElement | null>(null)
  const warmOverlayRef = useRef<HTMLDivElement | null>(null)
  const formationOverlayRef = useRef<HTMLDivElement | null>(null)
  const crosshairRef = useRef<HTMLDivElement | null>(null)
  const heimdalBandRef = useRef<HTMLDivElement | null>(null)
  const boundaries = useBoundaries()

  useEffect(() => {
    const section = sectionRef.current
    const column = columnRef.current
    const bit = bitRef.current
    const trail = trailRef.current
    if (!section || !column || !bit || !trail) return

    const setBitY = gsap.quickSetter(bit, 'y', 'px')
    const setTrailScale = gsap.quickSetter(trail, 'scaleY')

    let trackHeight = column.clientHeight
    const ro = new ResizeObserver((entries) => {
      trackHeight = entries[0].contentRect.height
    })
    ro.observe(column)

    const activeIndexRef = { current: -1 }
    const arrivedRef = { current: false }

    // Idle bit vibration — reads as an active drill even when scroll is idle.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let idleTween: gsap.core.Tween | null = null
    if (bitCoreRef.current && !prefersReducedMotion) {
      idleTween = gsap.to(bitCoreRef.current, {
        duration: 0.06,
        repeat: -1,
        x: () => gsap.utils.random(-2, 2),
        y: () => gsap.utils.random(-2, 2),
        ease: 'none',
      })
    }

    // Telemetry jitter — the active layer's parameter values drift ±1%
    // every 800ms, like real sensor noise rather than static copy.
    const jitterId = prefersReducedMotion
      ? null
      : window.setInterval(() => {
          const panel = panelRefs.current[activeIndexRef.current]
          if (!panel) return
          panel.querySelectorAll<HTMLElement>('[data-base]').forEach((el) => {
            const base = el.dataset.base
            if (base) el.textContent = jitterValueText(base)
          })
        }, 800)

    function depthAndBitAt(progress: number) {
      for (let i = 0; i < formationLayers.length; i++) {
        const w0 = boundaries[i]
        const w1 = boundaries[i + 1]
        if (progress <= w1 || i === formationLayers.length - 1) {
          const local = w1 === w0 ? 1 : clamp01((progress - w0) / (w1 - w0))
          const layer = formationLayers[i]

          if (i === HEIMDAL_INDEX) {
            // Act 2 (approach, local 0–0.6): heavy deceleration into the
            // target. Act 3 (payoff, local 0.6–1): bit holds at 2,470m.
            const approach = clamp01(local / 0.6)
            const depth = layer.startDepth + (layer.endDepth - layer.startDepth) * easeOutExpo(approach)
            const bitLocal = easeOutExpo(approach)
            const arrivalLocal = clamp01((local - 0.6) / 0.4)
            return { index: i, local, depth, bitLocal, arrivalLocal }
          }

          // Acts 1 and 4: steady, linear rate.
          const depth = layer.startDepth + (layer.endDepth - layer.startDepth) * local
          return { index: i, local, depth, bitLocal: local, arrivalLocal: i > HEIMDAL_INDEX ? 1 : 0 }
        }
      }
      const last = formationLayers[formationLayers.length - 1]
      return { index: formationLayers.length - 1, local: 1, depth: last.endDepth, bitLocal: 1, arrivalLocal: 1 }
    }

    function onUpdate(self: ScrollTrigger) {
      const progress = self.progress
      const { index, local, depth, bitLocal, arrivalLocal } = depthAndBitAt(progress)

      const bitFraction = boundaries[index] + formationLayers[index].weight * bitLocal
      setBitY(bitFraction * trackHeight)
      setTrailScale(bitFraction)

      if (depthRef.current) depthRef.current.textContent = Math.round(depth).toLocaleString('en-IN')

      bandRefs.current.forEach((band, i) => {
        if (!band) return
        const state = i < index ? 0.55 : i === index ? 0.96 : 0.4
        band.style.opacity = String(state)
      })

      // Heimdal band bloom — expands outward as arrival progresses.
      if (heimdalBandRef.current) {
        const bloom = 1 + arrivalLocal * 0.6
        heimdalBandRef.current.style.transform = `translateX(-50%) scaleX(${bloom})`
      }

      haloRefs.current.forEach((halo, i) => {
        if (!halo) return
        halo.classList.toggle('opacity-100', i === index)
        halo.classList.toggle('opacity-0', i !== index)
      })

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return
          panel.style.opacity = i === index ? '1' : '0'
          panel.style.pointerEvents = i === index ? 'auto' : 'none'
        })
      }

      if (heimdalBandRef.current) {
        heimdalBandRef.current.classList.toggle('wet-glow-lg', index === HEIMDAL_INDEX)
      }

      // "TARGET APPROACHING" — a brief indicator during the deceleration,
      // gone by the time the payoff badge takes over.
      if (approachRef.current) {
        let approachOpacity = 0
        if (index === HEIMDAL_INDEX) {
          approachOpacity = local < 0.55 ? clamp01((local - 0.05) / 0.2) : clamp01(1 - (local - 0.55) / 0.1)
        }
        approachRef.current.style.opacity = String(approachOpacity)
      }

      // Ambient lichen glow as the target nears, gone again by basement.
      if (warmOverlayRef.current) {
        const warm = index === HEIMDAL_INDEX ? clamp01(local * 2) : index > HEIMDAL_INDEX ? clamp01(1 - local * 3) : 0
        warmOverlayRef.current.style.opacity = String(warm * 0.16)
      }

      // Dark overlay over the formation photo, dipping briefly as the
      // payoff hits: the formation photo briefly brightens as the drill
      // reaches the reservoir.
      if (formationOverlayRef.current) {
        const dip = index === HEIMDAL_INDEX ? arrivalLocal * 0.2 : 0
        formationOverlayRef.current.style.background = `rgba(20,23,18,${clamp01(0.65 - dip).toFixed(2)})`
      }

      // Trail intensifies through the approach.
      if (trailRef.current) {
        const intensity = index === HEIMDAL_INDEX ? 0.4 + clamp01(local) * 0.6 : index > HEIMDAL_INDEX ? 1 : 0.4
        trailRef.current.style.filter = `drop-shadow(0 0 ${intensity * 6}px rgb(196 227 38 / ${intensity * 0.6}))`
      }

      // The crosshair only resolves once truly arrived.
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = String(arrivalLocal > 0.3 ? 1 : 0)
      }

      // The payoff readout is a one-shot stagger-in, not a scroll-bound
      // fade — it snaps when arrival crosses the threshold, and resets
      // instantly (no animation) if the user scrolls back above it.
      const arrived = arrivalLocal > 0.12
      if (arrived && !arrivedRef.current) {
        arrivedRef.current = true
        if (payoffRef.current) {
          gsap.set(payoffRef.current, { opacity: 1, pointerEvents: 'auto' })
          const stats = payoffRef.current.querySelectorAll('.payoff-stat')
          if (prefersReducedMotion) {
            gsap.set(stats, { opacity: 1, y: 0, scale: 1 })
          } else {
            gsap.fromTo(
              stats,
              { opacity: 0, y: 8, scale: 0.92 },
              { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'back.out(2.2)', stagger: 0.07, overwrite: true },
            )
          }
        }
      } else if (!arrived && arrivedRef.current) {
        arrivedRef.current = false
        if (payoffRef.current) gsap.set(payoffRef.current, { opacity: 0, pointerEvents: 'none' })
      }
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate,
    })

    // Prime initial (progress 0) state.
    onUpdate(st)

    // Pin geometry is measured at creation time. The images above this
    // section (SiteImage placeholders → real photos) and web fonts can
    // still be settling into their final layout after that, so refresh
    // once more on the next frame and once everything has fully loaded.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      st.kill()
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
      idleTween?.kill()
      if (jitterId) window.clearInterval(jitterId)
    }
  }, [boundaries])

  return (
    <div ref={sectionRef} className="oil-gas-pin relative min-h-screen bg-charcoal-900">
      {/* The formation photo lives INSIDE the pinned element, not on the
          outer section — GSAP fixes this element to the viewport for the
          whole pin, so a background scoped to the (unpinned) outer
          section would scroll away underneath it within a few pixels of
          scroll, leaving what looks like a blank screen. bg-charcoal-900
          on the root above is the hard fallback if the photo fails. */}
      <div aria-hidden="true" className="absolute inset-0">
        <SiteImage filename="oilgas-formation.png" alt="" className="h-full w-full rounded-none border-0" />
      </div>

      {/* Dark overlay over the formation photo — keeps the diagram legible,
          eases toward 0.4 at Heimdal so the reveal is the image itself
          brightening as the drill reaches the reservoir. */}
      <div ref={formationOverlayRef} aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'rgba(20,23,18,0.65)' }} />

      {/* Ambient warm shift as the target nears */}
      <div
        ref={warmOverlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#C4E326] opacity-0"
      />

      <div className="container-page grid h-screen grid-cols-[1fr_auto] items-center gap-10 py-24">
        {/* Left: depth readout + cross-fading layer panel, on its own
            semi-transparent charcoal backing so it reads against the green */}
        <div className="relative max-w-lg rounded-2xl border border-white/10 bg-charcoal-900/85 p-8 shadow-[var(--shadow-block)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-lichen-400">Live Descent &middot; Well F-15</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span ref={depthRef} className="font-display text-6xl font-bold tabular-nums text-white xl:text-7xl">
              0
            </span>
            <span className="text-xl font-medium text-white/60">m TVD</span>
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/50">Target 2,470 m TVD</p>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-4">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-white/45">WOB</dt>
              <dd className="font-display text-sm font-bold text-white tabular-nums">18.4 klbf</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-white/45">RPM</dt>
              <dd className="font-display text-sm font-bold text-white tabular-nums">118</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-white/45">ECD</dt>
              <dd className="font-display text-sm font-bold text-white tabular-nums">1.32 sg</dd>
            </div>
          </dl>

          <div
            ref={approachRef}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-lichen-400/30 bg-lichen-400/10 px-3 py-1 opacity-0"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-lichen-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-lichen-400">Target approaching</span>
          </div>

          <div className="relative mt-8 h-80">
            {formationLayers.map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => {
                  panelRefs.current[i] = el
                }}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? 'auto' : 'none' }}
              >
                <h3 className={`font-display text-3xl font-bold ${layer.isTarget ? 'text-lichen-400' : 'text-white'}`}>{layer.name}</h3>
                <p className="mt-1 text-sm font-medium text-white/55">{layer.depthLabel}</p>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                  {layer.params.map((p) => (
                    <div key={p.label}>
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-white/45">{p.label}</dt>
                      <dd className="font-display text-xl font-bold text-white tabular-nums" data-base={p.value}>
                        {p.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {layer.isTarget && (
                  <div
                    ref={payoffRef}
                    className="relative mt-8 inline-flex flex-col gap-4 rounded-2xl border border-lichen-400/25 bg-lichen-400/10 px-5 py-4"
                    style={{ opacity: 0, pointerEvents: 'none' }}
                  >
                    <TechMark variant="crosshair" dark className="absolute -right-4 -top-4 h-8 w-8" />

                    <ol className="flex flex-col gap-1.5">
                      {['Risk signal detected', 'Context evaluated', 'Recommended action'].map((step) => (
                        <li key={step} className="payoff-stat flex items-center gap-2 text-[11px] font-medium text-white/60">
                          <span className="h-1 w-1 rounded-full bg-lichen-400" aria-hidden="true" />
                          {step}
                        </li>
                      ))}
                    </ol>

                    <span className="payoff-stat inline-flex w-fit items-center gap-1.5 rounded-full bg-lichen-500 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slag-900">
                      TARGET RESERVOIR REACHED
                    </span>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="payoff-stat">
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-white/50">ILM Confidence</dt>
                        <dd className="font-display text-lg font-bold text-lichen-400">92%</dd>
                      </div>
                      <div className="payoff-stat">
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-white/50">Permeability</dt>
                        <dd className="font-display text-lg font-bold text-white">85 mD</dd>
                      </div>
                      <div className="payoff-stat">
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-white/50">Frac. Gradient</dt>
                        <dd className="font-display text-lg font-bold text-white">0.154</dd>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: the wellbore column — wide charcoal/lichen formation
            bands over a faint formation-photo backdrop, with a bit/trail
            rail running down the left gutter. */}
        <div className="relative h-[60vh] w-full max-w-sm shrink-0 lg:h-[68vh] lg:w-80">
          <div ref={columnRef} className="relative h-full w-full">
            {/* clipped visual layer: formation texture + the bands themselves */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-charcoal-900/40">
              <div className="absolute inset-0 opacity-30 grayscale">
                <SiteImage filename="oilgas-formation.png" alt="" className="h-full w-full rounded-none border-0" />
              </div>
              <div className="absolute inset-0 bg-charcoal-900/25" aria-hidden="true" />

              <div className="absolute inset-y-0 left-10 right-2">
                {formationLayers.map((layer, i) => (
                  <div
                    key={layer.id}
                    className="absolute left-0 right-0 overflow-hidden rounded-md"
                    style={{ top: `${boundaries[i] * 100}%`, height: `${layer.weight * 100}%`, padding: '2px 0' }}
                  >
                    <div
                      ref={(el) => {
                        haloRefs.current[i] = el
                      }}
                      aria-hidden="true"
                      className="animate-pulse-glow absolute inset-0 opacity-0 blur-md transition-opacity duration-500"
                      style={{ background: layer.isTarget ? '#C4E326' : '#B8D900' }}
                    />
                    <div
                      ref={(el) => {
                        bandRefs.current[i] = el
                        if (layer.isTarget) heimdalBandRef.current = el
                      }}
                      className="relative flex h-full items-center rounded-md px-4 transition-shadow duration-300"
                      style={{
                        background: layer.isTarget ? '#C4E326' : '#30322C',
                        opacity: 0.92,
                      }}
                    >
                      <span
                        className="truncate font-display text-sm font-bold tracking-wide sm:text-base"
                        style={{ color: layer.isTarget ? '#111111' : '#F3F1E8' }}
                      >
                        {layer.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* rail: central line, drilled trail, drill bit — left gutter */}
            <div className="absolute inset-y-0 left-0 w-10">
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/40" aria-hidden="true" />
              <div
                ref={trailRef}
                className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-charcoal-900/70 to-lichen-400 will-change-transform"
                style={{ height: '100%', transformOrigin: 'top', transform: 'scaleY(0)' }}
                aria-hidden="true"
              />
              <div ref={bitRef} className="absolute left-1/2 top-0 -translate-x-1/2 will-change-transform">
                <div ref={bitCoreRef} className="h-5 w-5 rounded-full border-2 border-white bg-charcoal-900 shadow-[var(--shadow-block)]" />
              </div>
            </div>

            {/* target crosshair, over the Heimdal band */}
            <div
              ref={crosshairRef}
              className="absolute right-4 w-10 opacity-0 transition-opacity duration-300"
              style={{ top: `${(boundaries[HEIMDAL_INDEX] + formationLayers[HEIMDAL_INDEX].weight * 0.8) * 100}%` }}
              aria-hidden="true"
            >
              <TechMark variant="crosshair" dark className="h-10 w-10" />
            </div>

            {/* depth scale ticks, outside the column to the left */}
            {boundaries.slice(0, -1).map((b, i) => (
              <span
                key={formationLayers[i].id}
                className="absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-white/60"
                style={{ top: `${b * 100}%` }}
              >
                {formationLayers[i].startDepth.toLocaleString('en-IN')} m
              </span>
            ))}
            <span
              className="absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold text-white"
              style={{ top: '100%' }}
            >
              2,470 m
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Static fallback for mobile and prefers-reduced-motion: every layer
 * stacked and fully visible. No motion is doing the work of marking
 * Heimdal here, so it gets extra visual weight — the lichen block shadow,
 * a crosshair, and both badges.
 */
function StaticWellbore() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="relative mt-16">
      <div aria-hidden="true" className="absolute left-6 top-0 bottom-0 w-px bg-white/20 sm:left-10" />

      <ol className="space-y-6">
        {formationLayers.map((layer) => (
          <li
            key={layer.id}
            className={`formation-layer layer-${layer.id} reveal relative flex flex-col gap-4 rounded-2xl border py-6 pl-16 pr-6 sm:pl-24 ${
              layer.isTarget ? 'wet-glow-lg border-transparent bg-charcoal-900 shadow-[var(--shadow-block)]' : 'border-ice-100 bg-stone-200'
            }`}
          >
            {layer.isTarget && <TechMark variant="crosshair" dark className="absolute right-5 top-5 h-8 w-8" />}
            <span
              aria-hidden="true"
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 sm:left-7 ${
                layer.isTarget ? 'border-lichen-400 bg-lichen-400' : 'border-stone-500 bg-stone-200'
              }`}
            />

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={`font-display text-2xl font-bold ${layer.isTarget ? 'text-white' : 'text-slag-900'}`}>
                {layer.name}
                {layer.isTarget && (
                  <span className="ml-3 rounded-full bg-lichen-500 px-2.5 py-0.5 align-middle text-xs font-bold text-slag-900">
                    TARGET ZONE
                  </span>
                )}
              </h3>
              <span className={`text-sm font-medium ${layer.isTarget ? 'text-white/50' : 'text-slag-700'}`}>{layer.depthLabel}</span>
            </div>

            <dl className="layer-params flex flex-wrap gap-x-8 gap-y-2">
              {layer.params.map((p) => (
                <div key={p.label}>
                  <dt className={`text-[11px] font-medium uppercase tracking-wider ${layer.isTarget ? 'text-white/50' : 'text-stone-500'}`}>{p.label}</dt>
                  <dd className={`font-display text-lg font-bold tabular-nums ${layer.isTarget ? 'text-white' : 'text-slag-900'}`}>{p.value}</dd>
                </div>
              ))}
            </dl>

            {layer.isTarget && (
              <div className="mt-2 inline-flex w-fit flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lichen-500 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slag-900">
                  TARGET RESERVOIR REACHED
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white/60">TENETDrill &middot; ILM Confidence</span>
                  <span className="font-display text-lg font-bold text-lichen-400">92%</span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Oil & Gas — SIGNATURE SECTION: the pinned, scroll-scrubbed wellbore descent. */
export function OilGas() {
  const introRef = useScrollReveal<HTMLDivElement>()
  const pinnable = usePinnable()

  return (
    <section id="oil-gas" className="relative overflow-hidden bg-charcoal-900">
      {/* Full-bleed formation photo for the static (unpinned) path only —
          PinnedWellbore carries its own copy scoped to the pinned element
          itself, since a background here would scroll away underneath it
          the moment the pin engages. */}
      {!pinnable && (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <SiteImage filename="oilgas-formation.png" alt="" className="h-full w-full rounded-none border-0" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: 'rgba(20,23,18,0.65)' }} />
        </>
      )}

      <TopoLines corner="top-right" dark className="z-0 opacity-[0.08]" />
      <VerticalMarker className="inset-y-24 right-6" dark />

      <div className="container-page relative py-28 sm:py-36">
        <div className="reveal max-w-3xl" ref={introRef}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-400">Our Objectives &amp; Platform Technology</p>
          <h2 className="text-4xl text-white sm:text-5xl">
            Discover Our Objectives.
          </h2>
        </div>

        <SiteImage
          filename="objectives.png"
          alt="Amcule's platform technology objectives across critical industrial domains"
          label="Objectives — platform technology overview"
          className="reveal mt-10 h-[45vh] w-full rounded-2xl border-0 sm:h-[60vh] lg:h-[80vh]"
        />

        <div className="reveal mt-10 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/70 sm:text-base">
          {[
            'Oil & Gas · Energy',
            'Finance & Banking',
            'Agriculture',
            'Industrial Processes',
            'Manufacturing',
            'Rare Earth & Mineral Extraction',
            'Semiconductor Industry',
            'Healthcare',
            'Defence & Research',
            'Quantum Computing',
          ].map((domain, i, arr) => (
            <span key={domain} className="flex items-center gap-3">
              {domain}
              {i < arr.length - 1 && <span className="text-lichen-500">|</span>}
            </span>
          ))}
        </div>

        {!pinnable && <StaticWellbore />}
      </div>

      {pinnable && <PinnedWellbore />}

      <StrataBands className="relative z-10 h-6 w-full" />
    </section>
  )
}
