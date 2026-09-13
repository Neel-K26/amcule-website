import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { TechMark } from '../ui/TechMark'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import architectureBg from '../../assets/images/architecture-bg.png'

/**
 * Architecture — the visual centrepiece of the site. The photo already
 * shows the Domain SLM, its internal layers, every specialist agent, the
 * connection lines, and the operational inputs/outputs — so it IS the
 * diagram. No coded SVG re-creation on top of it.
 *
 * architecture-bg.png (the dusk ridgeline with flowing lichen data-lines)
 * sits full-bleed behind the whole section — it's dark enough on its own
 * that the section now reads on dark type throughout, rather than the
 * light-canvas treatment other sections use.
 */
export function Architecture() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="architecture"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundImage: `url(${architectureBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(8,12,8,0.5) 0%, rgba(8,12,8,0.22) 35%, rgba(8,12,8,0.62) 100%)' }}
      />

      <TopoLines corner="top-right" dark className="opacity-[0.1]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-400">Architecture</p>
          <h2 className="text-4xl text-white sm:text-5xl">
            One domain SLM. <span className="text-white/50">A team of agents.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Operational data feeds a single domain-specific model &mdash; adapted, reasoning-tuned,
            knowledge-augmented, and safety-validated. Specialist agents sit around it, each
            grounded in the same private model, converging on one traceable decision.
          </p>
        </div>

        {/* The diagram card stays a true opaque panel — it's a precise
            technical photo, not decorative — but a lichen-tinted border
            and glow tie it into the flowing data-lines in the backdrop. */}
        <div
          className="reveal relative mt-16 rounded-2xl border border-lichen-500/20 bg-charcoal-900 p-4 sm:p-6"
          style={{ boxShadow: '0 0 60px -8px rgba(184,217,0,0.15), var(--shadow-block)' }}
        >
          <TechMark variant="crosshair" dark className="absolute -right-3 -top-3 z-10 hidden h-10 w-10 sm:block" />
          <SiteImage
            filename="architecture-agents.png"
            alt="Amcule's Domain SLM architecture: a central model with layered internals — Domain Adaptation, Engineering Reasoning, Knowledge Augmentation, Safety/Validation — surrounded by specialist agents, wired to operational data and an operational decision."
            label="Architecture — Domain SLM + agents"
            className="aspect-[16/10] w-full rounded-xl sm:aspect-[16/9]"
          />
        </div>

        <div className="reveal mt-10 flex justify-center">
          <div
            className="inline-flex flex-col items-center gap-2 rounded-2xl border border-lichen-500/20 bg-charcoal-900/80 px-8 py-5 text-center backdrop-blur-md"
            style={{ boxShadow: '0 0 40px -10px rgba(184,217,0,0.2), var(--shadow-block)' }}
          >
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
