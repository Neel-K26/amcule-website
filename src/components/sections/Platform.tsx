import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { RockBleed } from '../ui/RockBleed'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const products = [
  {
    index: '01',
    name: 'TENETDrill',
    tag: 'Drilling intelligence',
    body: 'Stuck-pipe prediction, NPT reduction, and BHA optimisation from a physics-informed XGBoost core, with PDF decision logs for every call.',
    features: ['Stuck pipe prediction', 'NPT reduction', 'BHA optimisation', 'Physics-informed XGBoost', 'PDF decision logs'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v6" stroke="#C9E620" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 8h8l-1.5 4h-5L8 8Z" stroke="#C9E620" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 12l-2 10M13 12l2 10M12 12v10" stroke="#C9E620" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: '02',
    name: 'TENETFlow',
    tag: 'Formation intelligence',
    body: 'Geosteering support with real-time formation pressure and pore gradient estimation, grounded in the operator’s own historical wells.',
    features: ['Geosteering', 'Formation pressure', 'Pore gradient'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 8c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3" stroke="#C9E620" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 16c2 0 2 3 4 3s2-3 4-3 2 3 4 3 2-3 4-3 2 3 4 3" stroke="#C9E620" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: '03',
    name: 'TENETEdge',
    tag: 'On-premise runtime',
    body: 'The air-gapped edge deployment: under 50 MB RAM, an EWMA watchdog for drift, running on Jetson-class hardware at the wellsite.',
    features: ['Air-gap deployment', '<50 MB RAM', 'EWMA watchdog', 'Jetson-class hardware'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="#C9E620" strokeWidth="1.4" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="#C9E620" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

/**
 * Platform — the enterprise product suite. The three products render as
 * dark charcoal feature blocks — the deliberate anchor objects for this
 * cream-dominant section — each numbered, iconed, and named in lichen.
 */
export function Platform() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="platform" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.05]" />
      <RockBleed corner="bottom-left" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Platform</p>
            <h2 className="text-4xl sm:text-5xl">
              The enterprise <span className="text-stone-500">intelligence suite.</span>
            </h2>
          </div>
          <SiteImage
            filename="platform-ops-floor.jpg"
            alt="Operations floor monitoring TENETDrill output"
            label="Platform — control room / ops floor"
            className="aspect-[16/10] rounded-2xl lg:aspect-[4/3]"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <WetSurface dark key={p.name} className="reveal flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lichen-400/25 bg-lichen-400/10">
                  {p.icon}
                </span>
                <span className="font-display text-xs font-semibold tabular-nums text-white/30">{p.index}</span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/45">{p.tag}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-lichen-400">{p.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{p.body}</p>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="h-1 w-1 rounded-full bg-lichen-400" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
