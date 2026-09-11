import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { TechMark } from '../ui/TechMark'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Architecture — the visual centrepiece of the site. The photo already
 * shows the Domain SLM, its internal layers, every specialist agent, the
 * connection lines, and the operational inputs/outputs — so it IS the
 * diagram. No coded SVG re-creation on top of it.
 */
export function Architecture() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="architecture" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-dark">Architecture</p>
          <h2 className="text-4xl sm:text-5xl">
            One domain SLM. <span className="text-stone-500">A team of agents.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            Operational data feeds a single domain-specific model &mdash; adapted, reasoning-tuned,
            knowledge-augmented, and safety-validated. Specialist agents sit around it, each
            grounded in the same private model, converging on one traceable decision.
          </p>
        </div>

        {/* The section flips from warm stone to charcoal here — the
            diagram photo sits inside a dark container, not on the light
            canvas directly. */}
        <div className="reveal relative mt-16 rounded-2xl bg-charcoal-900 p-4 shadow-[var(--shadow-block)] sm:p-6">
          <TechMark variant="crosshair" dark className="absolute -right-3 -top-3 z-10 hidden h-10 w-10 sm:block" />
          <SiteImage
            filename="architecture-agents.png"
            alt="Amcule's Domain SLM architecture: a central model with layered internals — Domain Adaptation, Engineering Reasoning, Knowledge Augmentation, Safety/Validation — surrounded by specialist agents, wired to operational data and an operational decision."
            label="Architecture — Domain SLM + agents"
            className="aspect-[16/10] w-full rounded-xl sm:aspect-[16/9]"
          />
        </div>

        <div className="reveal mt-10 flex justify-center">
          <div className="inline-flex flex-col items-center gap-2 rounded-2xl bg-charcoal-900 px-8 py-5 text-center shadow-[var(--shadow-block)]">
            <span className="rounded-full bg-lichen-500 px-4 py-1.5 text-xs font-bold tracking-wide text-slag-900">
              Operational Decision
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/45">
              Recommended action, traceable to source
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
