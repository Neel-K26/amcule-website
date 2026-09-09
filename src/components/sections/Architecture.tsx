import { useRef } from 'react'
import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const agents = [
  { id: 'data-prep', label: 'Data Prep Agent', angle: -135 },
  { id: 'drilling', label: 'Drilling Agent', angle: -45 },
  { id: 'anomaly', label: 'Anomaly Agent', angle: 135 },
  { id: 'supervisor', label: 'Supervisor Agent', angle: 45 },
]

/**
 * Architecture — SLM + Agents diagram: a central SLM node with four
 * orbiting agent nodes connected by lines.
 *
 * STUB: connection-line draw-on-scroll (stroke-dashoffset animation) and
 * node pulse/orbit motion via GSAP ScrollTrigger to be built next. Static
 * layout below is the real, final DOM structure — animate in place.
 */
export function Architecture() {
  const ref = useScrollReveal<HTMLDivElement>()
  const diagramRef = useRef<SVGSVGElement | null>(null)

  return (
    <section id="architecture" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Architecture</p>
          <h2 className="text-4xl sm:text-5xl">
            One SLM. <span className="text-stone-500">A team of agents.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            A central Small Language Model holds the operator&rsquo;s knowledge. Specialist
            agents orbit it &mdash; each handling one job, all grounded in the same private model.
          </p>
        </div>

        <WetSurface dark className="reveal mt-16 flex items-center justify-center overflow-hidden p-8 sm:p-16">
          <div className="relative aspect-square w-full max-w-xl">
            {/* TODO(gsap): animate stroke-dashoffset on .agent-connection to
                draw lines in on scroll; pulse .agent-node on arrival. */}
            <svg
              ref={diagramRef}
              viewBox="0 0 400 400"
              className="h-full w-full"
              role="img"
              aria-label="Diagram: a central SLM node connected to four agent nodes — data prep, drilling, anomaly, and supervisor"
            >
              {agents.map((agent) => {
                const rad = (agent.angle * Math.PI) / 180
                const x = 200 + Math.cos(rad) * 150
                const y = 200 + Math.sin(rad) * 150
                return (
                  <line
                    key={agent.id}
                    className="agent-connection"
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="#C4E326"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                )
              })}

              <circle className="agent-node" cx="200" cy="200" r="46" fill="#C4E326" fillOpacity="0.15" stroke="#C4E326" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="30" fill="#C4E326" />

              {agents.map((agent) => {
                const rad = (agent.angle * Math.PI) / 180
                const x = 200 + Math.cos(rad) * 150
                const y = 200 + Math.sin(rad) * 150
                return (
                  <circle
                    key={agent.id}
                    className="agent-node"
                    cx={x}
                    cy={y}
                    r="18"
                    fill="#30322C"
                    stroke="#C4E326"
                    strokeWidth="1.5"
                  />
                )
              })}
            </svg>

            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display text-xs font-bold text-charcoal-900">
              SLM
            </span>

            {agents.map((agent) => {
              const rad = (agent.angle * Math.PI) / 180
              const xPct = 50 + Math.cos(rad) * 37.5
              const yPct = 50 + Math.sin(rad) * 37.5
              return (
                <span
                  key={agent.id}
                  className="absolute -translate-x-1/2 translate-y-6 whitespace-nowrap text-xs font-medium text-white/60"
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                >
                  {agent.label}
                </span>
              )
            })}
          </div>
        </WetSurface>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SiteImage
            filename="architecture-slm.jpg"
            alt="Visual representation of Amcule's core Small Language Model"
            label="The SLM core"
            className="aspect-[16/10] rounded-2xl"
          />
          <SiteImage
            filename="architecture-agents.jpg"
            alt="Visual representation of Amcule's coordinated agent layer"
            label="The agent layer"
            className="aspect-[16/10] rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
