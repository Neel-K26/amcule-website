import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WetSurface } from '../ui/WetSurface'
import { TopoLines } from '../ui/TopoLines'
import { TechMark } from '../ui/TechMark'
import { useScrollReveal } from '../../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  {
    name: 'Generic Cloud AI',
    points: ['General-purpose models', 'External infrastructure', 'Limited domain context'],
    dark: false,
  },
  {
    name: 'Cross-Operator Models',
    points: ['Broader operator data', 'Shared foundation model', 'Vendor-controlled roadmap'],
    dark: false,
  },
  {
    name: 'Amcule Independent Intelligence Layer',
    points: ['Operator-specific weights', 'Deployable on-premise / air-gapped', 'Domain-specialised, operator-controlled'],
    dark: true,
  },
]

/** The destination glow — an exact, deliberate lichen ambient shadow, not the shared card shadow. */
const DESTINATION_SHADOW_CLASS =
  'shadow-[0_8px_40px_rgba(184,217,0,0.15),0_2px_4px_0_rgba(17,17,17,0.04),0_16px_40px_-16px_rgba(17,17,17,0.14)]'

/**
 * Why Amcule — the architectural distinction, not a competitor attack
 * page. Three tiers in a single downward progression, narrowing toward
 * the Amcule layer, which is the deliberate charcoal anchor: a lichen
 * ambient glow marks it as the destination, and the connecting arrows
 * draw themselves in once the progression scrolls into view.
 */
export function Moat() {
  const ref = useScrollReveal<HTMLDivElement>()
  const tiersRef = useRef<HTMLDivElement | null>(null)
  const arrowRefs = useRef<Array<SVGPathElement | null>>([])

  useEffect(() => {
    const container = tiersRef.current
    const paths = arrowRefs.current.filter((el): el is SVGPathElement => el !== null)
    if (!container || paths.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = prefersReducedMotion ? '0' : `${length}`
    })

    if (prefersReducedMotion) return

    const tween = gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 0.5,
      stagger: 0.25,
      ease: 'power2.out',
      scrollTrigger: { trigger: container, start: 'top 75%', once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="moat" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-dark">Why Amcule</p>
          <h2 className="text-4xl sm:text-5xl">
            Independence <span className="text-stone-500">is the architecture.</span>
          </h2>
        </div>

        <div ref={tiersRef} className="mx-auto mt-16 flex max-w-3xl flex-col items-stretch">
          {tiers.map((tier, i) => (
            <div key={tier.name} className="reveal" style={{ width: `${100 - i * 8}%`, marginLeft: `${i * 4}%` }}>
              <WetSurface
                dark={tier.dark}
                className={`relative flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between ${tier.dark ? DESTINATION_SHADOW_CLASS : ''}`}
              >
                {tier.dark && <TechMark variant="plus" dark className="absolute right-5 top-5 h-3.5 w-3.5" />}
                <h3 className={`font-display text-xl font-bold sm:text-2xl ${tier.dark ? 'text-lichen-400' : 'text-slag-700'}`}>
                  {tier.name}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {tier.points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-center gap-1.5 text-sm ${tier.dark ? 'text-white/80' : 'text-stone-500'}`}
                    >
                      <span className={`h-1 w-1 rounded-full ${tier.dark ? 'bg-lichen-400' : 'bg-stone-500'}`} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </WetSurface>

              {i < tiers.length - 1 && (
                <div className="flex justify-center py-3" aria-hidden="true">
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path
                      ref={(el) => {
                        arrowRefs.current[i] = el
                      }}
                      d="M7 0v14M1 10l6 6 6-6"
                      stroke="#8FA900"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <WetSurface className="reveal mt-16 p-10 sm:p-14">
          <blockquote className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
            An operator&rsquo;s ILM knows only that operator &mdash;{' '}
            <span className="text-lichen-dark">by architecture, not contract.</span>
          </blockquote>
        </WetSurface>
      </div>
    </section>
  )
}
