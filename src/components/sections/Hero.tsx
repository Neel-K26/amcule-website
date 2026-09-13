import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '../ui/MagneticButton'
import { TopoLines } from '../ui/TopoLines'
import heroRigImage from '../../assets/images/hero-rig.png'

const mono11 = { fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.08em' } as const

/**
 * Hero — orchestrated page-load sequence, compressed to ~900ms total:
 * eyebrow → headline lines → subhead → CTAs. Runs once on mount;
 * respects prefers-reduced-motion by skipping straight to the end state.
 *
 * The rig photo is an absolutely-positioned layer (not a grid column)
 * with a left-to-right CSS mask, so it fades into the warm-stone canvas
 * rather than meeting it at a hard vertical edge.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (prefersReducedMotion) {
        gsap.set(['.hero-eyebrow', '.hero-line', '.hero-subhead', '.hero-ctas'], {
          opacity: 1,
          y: 0,
        })
        return
      }

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.35 })
        .from('.hero-line', { opacity: 0, y: 28, duration: 0.45, stagger: 0.08 }, '-=0.15')
        .from('.hero-subhead', { opacity: 0, y: 16, duration: 0.4 }, '-=0.2')
        .from('.hero-ctas', { opacity: 0, y: 12, duration: 0.35 }, '-=0.22')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={rootRef} className="relative min-h-[100svh] overflow-hidden bg-ice-50">
      {/* Left content — normal flow, above the image layer */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <div className="hero-eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-lichen-dark" aria-hidden="true" />
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-stone-500">
              Real Fields. Real Data. Real Impact.
            </p>
          </div>

          <p style={{ color: 'rgba(100,110,80,0.7)', fontFamily: 'JetBrains Mono', fontSize: '12px', letterSpacing: '0.06em', marginBottom: '12px' }}>
            DOMAIN AI FOR A MORE RESILIENT TOMORROW.
          </p>

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
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span className="h-px w-10 bg-slag-900/20" aria-hidden="true" />
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-stone-500">
            Engineering Intelligence for a More Resilient Tomorrow.
          </p>
        </div>
      </div>

      {/* The hero image — masked fade from transparent (left) to full
          visibility (right), so it bleeds into the warm stone instead of
          meeting it at a hard edge. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '62%',
          height: '100%',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 40%, black 70%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 40%, black 70%)',
        }}
      >
        <img
          src={heroRigImage}
          alt="Drilling rig at sunrise"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
        />
      </div>

      <TopoLines variant="contour" dark corner="top-right" className="z-[2] opacity-[0.12]" />

      {/* Top-right corner text block */}
      <div style={{ position: 'absolute', top: '120px', right: '40px', textAlign: 'right', zIndex: 2 }}>
        {['REAL DATA', 'REAL OPERATIONS', 'REAL IMPACT'].map((t) => (
          <p key={t} style={{ color: 'rgba(255,255,255,0.5)', ...mono11, marginBottom: '4px' }}>
            {t}
          </p>
        ))}
        <div style={{ width: '32px', height: '2px', background: '#B8D900', marginLeft: 'auto', marginTop: '8px' }} />
      </div>

      {/* Mid-image text overlay */}
      <div style={{ position: 'absolute', bottom: '180px', left: '52%', zIndex: 2 }}>
        {['FROM', 'SUBSURFACE', 'TO A SUSTAINABLE', 'TOMORROW'].map((t) => (
          <p key={t} style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'JetBrains Mono', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '2px' }}>
            {t}
          </p>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(184,217,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B8D900',
            fontSize: '16px',
          }}
        >
          &darr;
        </div>
        <div>
          <p style={{ color: 'rgba(100,110,90,0.7)', fontFamily: 'JetBrains Mono', fontSize: '10px', letterSpacing: '0.08em' }}>SCROLL &mdash;&mdash;&mdash;&mdash;</p>
          <p style={{ color: 'rgba(100,110,90,0.7)', fontFamily: 'JetBrains Mono', fontSize: '10px', letterSpacing: '0.08em' }}>TO EXPLORE</p>
        </div>
      </div>

      {/* Subtle lichen green circle arc overlaying the center split */}
      <svg
        style={{ position: 'absolute', top: '10%', left: '45%', width: '300px', height: '300px', zIndex: 2, opacity: 0.25, pointerEvents: 'none' }}
        viewBox="0 0 300 300"
      >
        <circle cx="150" cy="150" r="140" fill="none" stroke="#B8D900" strokeWidth="1" />
        <circle cx="150" cy="150" r="6" fill="#B8D900" />
      </svg>
    </section>
  )
}
