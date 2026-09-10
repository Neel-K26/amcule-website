import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { RockBleed } from '../ui/RockBleed'
import { StrataBands } from '../ui/StrataBands'
import { DrillRigIcon, FormationColumnIcon, JetsonBoxIcon } from '../ui/ProductIcons'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/** TENETDrill — a live telemetry trace, not a stock chart. */
function DrillTelemetryViz() {
  return (
    <svg viewBox="0 0 240 48" className="h-12 w-full" aria-hidden="true">
      <line x1="0" y1="40" x2="240" y2="40" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
      {[40, 90, 140, 190, 240].map((x) => (
        <line key={x} x1={x} y1="36" x2={x} y2="40" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
      ))}
      <polyline
        points="0,26 20,24 40,28 60,18 80,22 100,12 120,20 140,10 160,16 180,8 200,14 220,6 240,10"
        fill="none"
        stroke="#C4E326"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** TENETFlow — a miniature formation column: stacked, unevenly-weighted layers. */
function FormationLayersViz() {
  const bands = [
    { h: 9, o: 0.5 },
    { h: 5, o: 0.2 },
    { h: 12, o: 0.35 },
    { h: 4, o: 0.18 },
    { h: 10, o: 0.6 },
    { h: 8, o: 0.28 },
  ]
  let y = 0
  return (
    <svg viewBox="0 0 240 48" className="h-12 w-full" aria-hidden="true">
      {bands.map((b, i) => {
        const rect = (
          <rect key={i} x="0" y={y} width="240" height={b.h} fill={i % 2 === 0 ? '#C4E326' : '#FFFFFF'} opacity={b.o} />
        )
        y += b.h
        return rect
      })}
      <line x1="0" y1="0" x2="0" y2="48" stroke="#C4E326" strokeWidth="1.2" />
    </svg>
  )
}

/** TENETEdge — a runtime status strip: signal bars + an online indicator. */
function EdgeRuntimeViz() {
  return (
    <svg viewBox="0 0 240 48" className="h-12 w-full" aria-hidden="true">
      <rect x="0" y="8" width="46" height="32" rx="2" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.2" />
      <rect x="9" y="17" width="28" height="14" rx="1" fill="#C4E326" fillOpacity="0.18" stroke="#C4E326" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={68 + i * 12} y={40 - (i % 3 === 0 ? 26 : i % 2 === 0 ? 18 : 12)} width="6" height={i % 3 === 0 ? 26 : i % 2 === 0 ? 18 : 12} fill="#C4E326" opacity={0.35 + i * 0.08} />
      ))}
      <circle cx="222" cy="14" r="3" fill="#C4E326" className="animate-pulse-glow" />
      <text x="182" y="17" fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="#FFFFFF" fillOpacity="0.5">
        ONLINE
      </text>
    </svg>
  )
}

const products = [
  {
    index: '01',
    name: 'TENETDrill',
    tag: 'Drilling intelligence',
    body: 'Stuck-pipe prediction, NPT reduction, and BHA optimisation from a physics-informed XGBoost core, with PDF decision logs for every call.',
    features: ['Stuck pipe prediction', 'NPT reduction', 'BHA optimisation', 'Physics-informed XGBoost', 'PDF decision logs'],
    Icon: DrillRigIcon,
    Viz: DrillTelemetryViz,
  },
  {
    index: '02',
    name: 'TENETFlow',
    tag: 'Formation intelligence',
    body: 'Geosteering support with real-time formation pressure and pore gradient estimation, grounded in the operator’s own historical wells.',
    features: ['Geosteering', 'Formation pressure', 'Pore gradient'],
    Icon: FormationColumnIcon,
    Viz: FormationLayersViz,
  },
  {
    index: '03',
    name: 'TENETEdge',
    tag: 'On-premise runtime',
    body: 'The air-gapped edge deployment: under 50 MB RAM, an EWMA watchdog for drift, running on Jetson-class hardware at the wellsite.',
    features: ['Air-gap deployment', '<50 MB RAM', 'EWMA watchdog', 'Jetson-class hardware'],
    Icon: JetsonBoxIcon,
    Viz: EdgeRuntimeViz,
  },
]

/**
 * Platform — the enterprise product suite. Three engineered instruments,
 * not pricing cards: each carries its own small technical visualization —
 * a telemetry trace, a formation column, a runtime status strip — so the
 * difference between the three products reads at a glance.
 */
export function Platform() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="platform" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      {/* Ops-floor photo bleeding into the section's bottom edge — cropped,
          fading up into the Warm Stone background rather than sitting in a
          rectangular box. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-72 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_55%)] sm:h-96"
      >
        <SiteImage filename="platform-ops-floor.png" alt="" className="h-full w-full rounded-none border-0 grayscale" />
      </div>

      {/* Section-transition bleed toward Validation below — the same
          "volcanic rock" corner device used elsewhere, here using the rig
          detail shot, fading up from the bottom edge. */}
      <RockBleed corner="bottom-left" filename="oilgas-rig-detail.png" opacity={70} />

      <div className="container-page relative" ref={ref}>
        <div className="reveal grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Platform</p>
            <h2 className="text-4xl sm:text-5xl">
              The enterprise <span className="text-stone-500">intelligence suite.</span>
            </h2>
          </div>
          <SiteImage
            filename="platform-ops-floor.png"
            alt="Operations floor monitoring TENETDrill output"
            label="Platform — control room / ops floor"
            className="aspect-[16/10] rounded-2xl lg:aspect-[4/3]"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <WetSurface
              dark
              key={p.name}
              className="reveal group flex flex-col p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lichen-400/25 bg-lichen-400/10">
                  <p.Icon className="h-5 w-5 text-lichen-400" />
                </span>
                <span className="font-display text-xs font-semibold tabular-nums text-white/30">{p.index}</span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/45">{p.tag}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-lichen-400">{p.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{p.body}</p>

              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p.Viz />
              </div>

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

        <StrataBands className="mt-16 h-5 w-full rounded-full opacity-80" />
      </div>
    </section>
  )
}
