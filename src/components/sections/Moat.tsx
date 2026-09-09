import { WetSurface } from '../ui/WetSurface'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const cards = [
  {
    name: 'Corva AI',
    kind: 'Cloud SaaS',
    body: 'Generic ML models served from the cloud. Your operational data leaves your premise to train and run them.',
    negative: true,
  },
  {
    name: 'SLB Lumi',
    kind: 'Cross-operator foundation model',
    body: 'A single foundation model trained across many operators. Your competitors&rsquo; patterns sit in the same weights you query — and the vendor is also your service contractor.',
    negative: true,
  },
  {
    name: 'Amcule ILM',
    kind: 'Independent Language Model',
    body: 'Operator-exclusive weights. Zero egress. Air-gap capable. Independent of any service contract — built for one operator, and answerable to no one else.',
    negative: false,
  },
]

/**
 * Moat / Why Amcule — three-card comparison plus the pull-quote. Amcule's
 * own card renders as the charcoal feature block — the visual "winner"
 * against the two muted white competitor cards.
 */
export function Moat() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="moat" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Why Amcule</p>
          <h2 className="text-4xl sm:text-5xl">
            Independence <span className="text-stone-500">is the moat.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((c) =>
            c.negative ? (
              <WetSurface key={c.name} className="reveal p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">{c.kind}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-slag-700">{c.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-500" dangerouslySetInnerHTML={{ __html: c.body }} />
              </WetSurface>
            ) : (
              <WetSurface key={c.name} dark className="reveal p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-lichen-400">{c.kind}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-lichen-400">{c.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70" dangerouslySetInnerHTML={{ __html: c.body }} />
              </WetSurface>
            ),
          )}
        </div>

        <WetSurface className="reveal mt-16 p-10 sm:p-14">
          <blockquote className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
            &ldquo;QatarEnergy&rsquo;s ILM knows only QatarEnergy &mdash;{' '}
            <span className="text-lichen-600">by architecture, not contract.</span>&rdquo;
          </blockquote>
        </WetSurface>
      </div>
    </section>
  )
}
