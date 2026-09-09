import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SiteImage } from '../ui/SiteImage'

gsap.registerPlugin(ScrollTrigger)

export interface FormationLayer {
  id: string
  name: string
  depthLabel: string
  /** Real depth range in metres TVD — drives the depth counter interpolation. */
  startDepth: number
  endDepth: number
  /**
   * Share of the pinned descent's scroll/visual space this layer gets.
   * Deliberately NOT metre-proportional — Heimdal is a 80 m interval in
   * reality but gets generous scroll room here so the target payoff lands.
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
    weight: 0.3,
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
    weight: 0.2,
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
    weight: 0.2,
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
    weight: 0.2,
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
    weight: 0.1,
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
 * The pinned, scroll-scrubbed wellbore descent. Mounted only on desktop
 * with motion allowed — StaticWellbore covers mobile + reduced-motion.
 *
 * Everything the user sees each frame (bit position, trail length, band
 * dimming, depth readout, the Heimdal payoff reveal) is a pure function of
 * ScrollTrigger's `progress`, written straight to the DOM via refs/quickSetters.
 * No competing sub-timelines — the scrub is the only effect.
 */
function PinnedWellbore() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const columnRef = useRef<HTMLDivElement | null>(null)
  const bitRef = useRef<HTMLDivElement | null>(null)
  const trailRef = useRef<HTMLDivElement | null>(null)
  const depthRef = useRef<HTMLSpanElement | null>(null)
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const bandRefs = useRef<Array<HTMLDivElement | null>>([])
  const payoffRef = useRef<HTMLDivElement | null>(null)
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

    function depthAndIndexAt(progress: number) {
      for (let i = 0; i < formationLayers.length; i++) {
        const w0 = boundaries[i]
        const w1 = boundaries[i + 1]
        if (progress <= w1 || i === formationLayers.length - 1) {
          const local = w1 === w0 ? 1 : clamp01((progress - w0) / (w1 - w0))
          const layer = formationLayers[i]
          const depth = layer.startDepth + (layer.endDepth - layer.startDepth) * local
          return { index: i, local, depth }
        }
      }
      return { index: formationLayers.length - 1, local: 1, depth: formationLayers[formationLayers.length - 1].endDepth }
    }

    function onUpdate(self: ScrollTrigger) {
      const progress = self.progress
      const { index, local, depth } = depthAndIndexAt(progress)

      setBitY(progress * trackHeight)
      setTrailScale(progress)

      if (depthRef.current) depthRef.current.textContent = Math.round(depth).toLocaleString('en-IN')

      bandRefs.current.forEach((band, i) => {
        if (!band) return
        const state = i < index ? 0.18 : i === index ? 1 : 0.14
        band.style.opacity = String(state)
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
        const atHeimdal = index === HEIMDAL_INDEX
        heimdalBandRef.current.classList.toggle('wet-glow-lg', atHeimdal)
      }

      if (payoffRef.current) {
        const heimdalOpacity = index === HEIMDAL_INDEX ? clamp01(local * 1.6 - 0.2) : index > HEIMDAL_INDEX ? 1 : 0
        payoffRef.current.style.opacity = String(heimdalOpacity)
        payoffRef.current.style.transform = `translateY(${(1 - heimdalOpacity) * 10}px)`
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
    }
  }, [boundaries])

  return (
    <div ref={sectionRef} className="oil-gas-pin relative min-h-screen">
      <div className="container-page grid h-screen grid-cols-[1fr_auto] items-center gap-16 py-24">
        {/* Left: depth readout + cross-fading layer panel */}
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-widest text-slag-900/70">Live Descent &middot; Well F-15</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span ref={depthRef} className="font-display text-6xl font-bold tabular-nums text-slag-900 xl:text-7xl">
              0
            </span>
            <span className="text-xl font-medium text-slag-700">m TVD</span>
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slag-700">
            Target 2,470 m TVD
          </p>

          <div className="relative mt-12 h-72">
            {formationLayers.map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => {
                  panelRefs.current[i] = el
                }}
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? 'auto' : 'none' }}
              >
                <h3 className="font-display text-3xl font-bold text-slag-900">
                  {layer.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-slag-700">{layer.depthLabel}</p>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                  {layer.params.map((p) => (
                    <div key={p.label}>
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-slag-700">{p.label}</dt>
                      <dd className="font-display text-xl font-bold text-slag-900 tabular-nums">{p.value}</dd>
                    </div>
                  ))}
                </dl>

                {layer.isTarget && (
                  <div
                    ref={payoffRef}
                    className="mt-8 inline-flex flex-col gap-3 rounded-2xl border border-white/10 bg-charcoal-900 px-5 py-4 shadow-[var(--shadow-block)]"
                    style={{ opacity: 0 }}
                  >
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lichen-500 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slag-900">
                      TARGET RESERVOIR
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white/60">TENETDrill &middot; ILM Confidence</span>
                      <span className="font-display text-lg font-bold text-lichen-400">92%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: the wellbore column itself */}
        <div className="relative h-[68vh] w-28 shrink-0 xl:w-32">
          <div ref={columnRef} className="relative h-full w-full">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/50" aria-hidden="true" />

            {/* drilled trail — scaleY only, transform-origin top */}
            <div
              ref={trailRef}
              className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-charcoal-900/70 to-lichen-400 will-change-transform"
              style={{ height: '100%', transformOrigin: 'top', transform: 'scaleY(0)' }}
              aria-hidden="true"
            />

            {/* formation bands */}
            {formationLayers.map((layer, i) => (
              <div
                key={layer.id}
                ref={(el) => {
                  bandRefs.current[i] = el
                  if (layer.isTarget) heimdalBandRef.current = el
                }}
                className="absolute left-1/2 w-3 -translate-x-1/2 rounded-full transition-shadow duration-300"
                style={{
                  top: `${boundaries[i] * 100}%`,
                  height: `${layer.weight * 100}%`,
                  background: layer.isTarget ? '#C9E620' : '#6F716A',
                  opacity: 0.14,
                }}
                aria-hidden="true"
              />
            ))}

            {/* depth scale ticks */}
            {boundaries.slice(0, -1).map((b, i) => (
              <span
                key={formationLayers[i].id}
                className="absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-slag-700"
                style={{ top: `${b * 100}%` }}
              >
                {formationLayers[i].startDepth.toLocaleString('en-IN')} m
              </span>
            ))}
            <span
              className="absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium text-slag-900"
              style={{ top: '100%' }}
            >
              2,470 m
            </span>

            {/* drill bit */}
            <div ref={bitRef} className="absolute left-1/2 top-0 -translate-x-1/2 will-change-transform">
              <div className="h-5 w-5 rounded-full border-2 border-white bg-charcoal-900 shadow-[var(--shadow-block)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Static fallback for mobile and prefers-reduced-motion: every layer
 * stacked and fully visible, Heimdal already highlighted, no pin/scrub.
 */
function StaticWellbore() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="relative mt-16">
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 bottom-0 w-px bg-slag-900/15 sm:left-10"
      />

      <ol className="space-y-6">
        {formationLayers.map((layer) => (
          <li
            key={layer.id}
            className={`formation-layer layer-${layer.id} reveal relative flex flex-col gap-4 rounded-2xl border py-6 pl-16 pr-6 sm:pl-24 ${
              layer.isTarget ? 'border-transparent bg-charcoal-900 shadow-[var(--shadow-block)]' : 'border-ice-100 bg-white'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 sm:left-7 ${
                layer.isTarget ? 'border-lichen-400 bg-lichen-400' : 'border-stone-500 bg-white'
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
                  TARGET RESERVOIR
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
    <section id="oil-gas" className="relative overflow-hidden bg-lichen-500">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 z-0 opacity-[0.06]" />

      <div className="container-page relative py-28 sm:py-36">
        <div className="reveal max-w-2xl" ref={introRef}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slag-900/70">Oil &amp; Gas</p>
          <h2 className="text-4xl sm:text-5xl">
            2,470 metres <span className="text-slag-900/50">to the truth.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            Descend the Volve F-15 wellbore, layer by layer, with live formation
            parameters at every depth &mdash; the same data TENETDrill reasons over.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SiteImage
            filename="oilgas-formation.jpg"
            alt="Subsurface formation / wellsite establishing shot"
            label="Oil &amp; Gas — formation / wellsite"
            className="aspect-[4/3] rounded-2xl"
          />
          <SiteImage
            filename="oilgas-rig-detail.jpg"
            alt="Close-up of drilling equipment"
            label="Oil &amp; Gas — rig / BHA detail"
            className="aspect-[4/3] rounded-2xl"
          />
        </div>

        {!pinnable && <StaticWellbore />}
      </div>

      {pinnable && <PinnedWellbore />}
    </section>
  )
}
