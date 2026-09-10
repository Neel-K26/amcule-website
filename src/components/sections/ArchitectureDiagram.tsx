import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getImage } from '../../lib/images'

gsap.registerPlugin(ScrollTrigger)

const DATA_NODES = [
  { label: 'Drilling logs', x: 130 },
  { label: 'Sensor telemetry', x: 310 },
  { label: 'Formation records', x: 490 },
  { label: 'Operator history', x: 670 },
]

const SLM_LAYERS = [
  { label: 'Domain Adaptation', y: 168 },
  { label: 'Engineering Reasoning', y: 244 },
  { label: 'Knowledge Augmentation', y: 320 },
  { label: 'Safety / Validation', y: 396 },
]

const SLM_BOX = { x: 250, y: 158, w: 300, h: 316 }

const AGENTS = [
  { id: 'drilling', label: 'Drilling Agent', x: 96, y: 212, to: { x: 250, y: 212 } },
  { id: 'risk', label: 'Risk Agent', x: 704, y: 212, to: { x: 550, y: 212 } },
  { id: 'geology', label: 'Geology Agent', x: 96, y: 402, to: { x: 250, y: 402 } },
  { id: 'knowledge', label: 'Knowledge Agent', x: 704, y: 402, to: { x: 550, y: 402 } },
  { id: 'operations', label: 'Operations Agent', x: 566, y: 588, to: { x: 528, y: 474 } },
]

/**
 * The architectural centrepiece: Operational Data → Domain SLM (with its
 * four internal layers) → the agentic layer → Operational Decision. Built
 * as real SVG so it can assemble itself on scroll — data nodes activate,
 * the SLM's layers stack in, agents appear and wire themselves in, then
 * the decision node lights up. Plays once, no pin, no scrub — a single
 * triggered sequence, not a continuous scroll-bound effect.
 */
const SLM_IMAGE = getImage('architecture-slm.png')
const AGENTS_IMAGE = getImage('architecture-agents.png')

export function ArchitectureDiagram() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const dataNodeRefs = useRef<Array<SVGGElement | null>>([])
  const dataLineRefs = useRef<Array<SVGLineElement | null>>([])
  const feedLineRef = useRef<SVGLineElement | null>(null)
  const slmBoxRef = useRef<SVGGElement | null>(null)
  const slmLabelRef = useRef<SVGTextElement | null>(null)
  const layerRefs = useRef<Array<SVGGElement | null>>([])
  const agentRefs = useRef<Array<SVGGElement | null>>([])
  const agentLineRefs = useRef<Array<SVGLineElement | null>>([])
  const outputLineRef = useRef<SVGLineElement | null>(null)
  const decisionRef = useRef<SVGGElement | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const allLines = [
      ...dataLineRefs.current,
      feedLineRef.current,
      ...agentLineRefs.current,
      outputLineRef.current,
    ].filter((el): el is SVGLineElement => el !== null)

    // Prep every connector line as a hidden stroke — the length is read
    // per-element so straight lines at any angle draw correctly.
    allLines.forEach((line) => {
      const length = line.getTotalLength()
      line.style.strokeDasharray = `${length}`
      line.style.strokeDashoffset = prefersReducedMotion ? '0' : `${length}`
    })

    if (prefersReducedMotion) {
      gsap.set(
        [...dataNodeRefs.current, slmBoxRef.current, slmLabelRef.current, ...layerRefs.current, ...agentRefs.current, decisionRef.current],
        { opacity: 1, scale: 1 },
      )
      return
    }

    gsap.set(dataNodeRefs.current, { opacity: 0, y: -8 })
    gsap.set([slmBoxRef.current, slmLabelRef.current], { opacity: 0 })
    gsap.set(layerRefs.current, { opacity: 0, scaleY: 0.6, transformOrigin: 'center' })
    gsap.set(agentRefs.current, { opacity: 0, scale: 0.85, transformOrigin: 'center' })
    gsap.set(decisionRef.current, { opacity: 0, scale: 0.9, transformOrigin: 'center' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: 'top 72%', once: true },
      defaults: { ease: 'power2.out' },
    })

    tl.to(dataNodeRefs.current, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 })
      .to(dataLineRefs.current, { strokeDashoffset: 0, duration: 0.35, stagger: 0.06 }, '-=0.1')
      .to(feedLineRef.current, { strokeDashoffset: 0, duration: 0.3 }, '-=0.05')
      .to(slmBoxRef.current, { opacity: 1, duration: 0.3 })
      .to(slmLabelRef.current, { opacity: 1, duration: 0.25 }, '<')
      .to(layerRefs.current, { opacity: 1, scaleY: 1, duration: 0.32, stagger: 0.1 }, '-=0.05')
      .to(agentRefs.current, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12 }, '-=0.1')
      .to(agentLineRefs.current, { strokeDashoffset: 0, duration: 0.3, stagger: 0.12 }, '-=0.9')
      .to(outputLineRef.current, { strokeDashoffset: 0, duration: 0.3 })
      .to(decisionRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.05')

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 700"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram: operational data feeds a Domain SLM with four internal layers — Domain Adaptation, Engineering Reasoning, Knowledge Augmentation, and Safety/Validation — surrounded by five specialised agents (Drilling, Risk, Geology, Knowledge, Operations), producing an operational decision."
    >
      {/* Agent-layer texture — a faint wash across the zone the agent
          nodes occupy, painted first so every node/line sits cleanly on top. */}
      {AGENTS_IMAGE && (
        <image href={AGENTS_IMAGE} x="20" y="150" width="760" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.13" />
      )}

      {/* Operational Data row */}
      {DATA_NODES.map((n, i) => (
        <g key={n.label}>
          <line
            ref={(el) => {
              dataLineRefs.current[i] = el
            }}
            x1={n.x}
            y1={62}
            x2={400}
            y2={112}
            stroke="#B8D900"
            strokeWidth="1.2"
            opacity="0.55"
          />
          <g
            ref={(el) => {
              dataNodeRefs.current[i] = el
            }}
          >
            <rect x={n.x - 58} y={34} width="116" height="30" rx="2" fill="none" stroke="#111111" strokeOpacity="0.25" strokeWidth="1" />
            <text x={n.x} y={53} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#444540" letterSpacing="0.02em">
              {n.label}
            </text>
          </g>
        </g>
      ))}
      <text x="400" y="20" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.18em" fill="#777872">
        OPERATIONAL DATA
      </text>

      <line ref={feedLineRef} x1="400" y1="112" x2="400" y2={SLM_BOX.y} stroke="#111111" strokeWidth="1.4" />

      {/* Domain SLM */}
      <text ref={slmLabelRef} x="400" y="142" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.12em" fill="#111111">
        DOMAIN SLM
      </text>
      <g ref={slmBoxRef}>
        <defs>
          <clipPath id="slm-clip">
            <rect x={SLM_BOX.x} y={SLM_BOX.y} width={SLM_BOX.w} height={SLM_BOX.h} rx="2" />
          </clipPath>
        </defs>
        <rect x={SLM_BOX.x} y={SLM_BOX.y} width={SLM_BOX.w} height={SLM_BOX.h} rx="2" fill="#1D201B" />
        {SLM_IMAGE && (
          <image
            href={SLM_IMAGE}
            x={SLM_BOX.x}
            y={SLM_BOX.y}
            width={SLM_BOX.w}
            height={SLM_BOX.h}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#slm-clip)"
            opacity="0.9"
          />
        )}
        {/* darken just enough so the layer labels stay legible over the photo */}
        <rect x={SLM_BOX.x} y={SLM_BOX.y} width={SLM_BOX.w} height={SLM_BOX.h} rx="2" fill="#1D201B" opacity="0.4" />
        <rect x={SLM_BOX.x} y={SLM_BOX.y} width={SLM_BOX.w} height={SLM_BOX.h} rx="2" fill="none" stroke="#B8D900" strokeOpacity="0.4" strokeWidth="1.2" />
      </g>
      {SLM_LAYERS.map((layer, i) => (
        <g
          key={layer.label}
          ref={(el) => {
            layerRefs.current[i] = el
          }}
        >
          <rect x={SLM_BOX.x + 16} y={layer.y} width={SLM_BOX.w - 32} height="60" rx="1" fill="none" stroke="#C4E326" strokeOpacity="0.3" strokeWidth="1" />
          <text x={SLM_BOX.x + SLM_BOX.w / 2} y={layer.y + 35} textAnchor="middle" fontSize="11" fontWeight="600" fill="#EAE8DE" letterSpacing="0.03em">
            {layer.label}
          </text>
        </g>
      ))}

      {/* Agentic layer */}
      {AGENTS.map((agent, i) => (
        <g key={agent.id}>
          <line
            ref={(el) => {
              agentLineRefs.current[i] = el
            }}
            x1={agent.x}
            y1={agent.y}
            x2={agent.to.x}
            y2={agent.to.y}
            stroke="#B8D900"
            strokeWidth="1.2"
          />
          <g
            ref={(el) => {
              agentRefs.current[i] = el
            }}
          >
            <circle cx={agent.x} cy={agent.y} r="34" fill="#F3F1E8" stroke="#1D201B" strokeWidth="1.3" />
            <circle cx={agent.x} cy={agent.y} r="4" fill="#B8D900" />
            <text x={agent.x} y={agent.y + 50} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#111111">
              {agent.label}
            </text>
          </g>
        </g>
      ))}

      <line
        ref={outputLineRef}
        x1="400"
        y1={SLM_BOX.y + SLM_BOX.h}
        x2="400"
        y2="600"
        stroke="#111111"
        strokeWidth="1.4"
      />

      {/* Operational Decision */}
      <g ref={decisionRef}>
        <rect x="280" y="600" width="240" height="52" rx="2" fill="#B8D900" />
        <text x="400" y="632" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.04em" fill="#111111">
          Operational Decision
        </text>
      </g>
      <text x="400" y="678" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.18em" fill="#777872">
        RECOMMENDED ACTION, TRACEABLE TO SOURCE
      </text>
    </svg>
  )
}
