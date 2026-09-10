import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Architecture — the visual centrepiece of the site: Operational Data →
 * Domain SLM (with its internal layers) → the agentic layer → Operational
 * Decision, rendered as real SVG in ArchitectureDiagram so it assembles
 * itself on scroll rather than shipping as a static image.
 */
export function Architecture() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="architecture" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Architecture</p>
          <h2 className="text-4xl sm:text-5xl">
            One domain SLM. <span className="text-stone-500">A team of agents.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            Operational data feeds a single domain-specific model &mdash; adapted, reasoning-tuned,
            knowledge-augmented, and safety-validated. Specialist agents sit around it, each
            grounded in the same private model, converging on one traceable decision.
          </p>
        </div>

        <WetSurface dark className="reveal mt-16 overflow-hidden p-6 sm:p-12">
          <ArchitectureDiagram />
        </WetSurface>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SiteImage
            filename="architecture-slm.png"
            alt="Visual representation of Amcule's core Small Language Model"
            label="The SLM core"
            className="aspect-[16/10] rounded-2xl"
          />
          <SiteImage
            filename="architecture-agents.png"
            alt="Visual representation of Amcule's coordinated agent layer"
            label="The agent layer"
            className="aspect-[16/10] rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
