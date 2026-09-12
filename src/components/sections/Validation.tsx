import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
import { TopoLines } from '../ui/TopoLines'
import { StatBadge } from '../ui/StatBadge'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCountUp } from '../../hooks/useCountUp'
import validationBg from '../../assets/images/validation-bg.png'

/**
 * Validation & Pilots — deliberately NOT "case studies": no fake client
 * logos. Honest substance: Volve dataset calibration, the live TENETDrill
 * demo, and ongoing research/whitepaper work.
 */
function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useCountUp<HTMLSpanElement>(value, (n) => `${Math.round(n)}${suffix}`)
  return (
    <div>
      <span ref={ref} className="font-display text-4xl font-bold text-lichen-500 tabular-nums">
        0{suffix}
      </span>
      <p className="mt-2 text-sm text-stone-500">{label}</p>
    </div>
  )
}

export function Validation() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="validation"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundImage: `url(${validationBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(243,241,232,0.62) 0%, rgba(243,241,232,0.3) 35%, rgba(243,241,232,0.68) 100%)',
        }}
      />

      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-dark">Validation &amp; Pilots</p>
            <h2 className="text-4xl sm:text-5xl">
              Calibrated on <span className="text-stone-500">real field data.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slag-700">
              No fake logos, no borrowed case studies. Amcule&rsquo;s models are calibrated
              against the public Volve dataset (Equinor) and validated through an active
              TENETDrill demonstration &mdash; with research and whitepaper work ongoing.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatBadge>Volve F-15 &middot; Calibrated</StatBadge>
              <StatBadge>Real-world data</StatBadge>
            </div>
          </div>
          <SiteImage
            filename="validation-field.png"
            alt="Field site where TENETDrill telemetry is validated"
            label="Validation — field / equipment shot"
            className="aspect-[16/10] rounded-2xl lg:aspect-[4/3]"
          />
        </div>

        <div className="reveal mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WetSurface className="border-t-[3px] border-t-lichen-500 border-x-white/50 border-b-white/50 bg-white/80 p-8 shadow-card-lg backdrop-blur-md">
            <h3 className="font-display text-xl font-bold text-slag-900">Volve Dataset Calibration</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Formation and drilling parameters calibrated end-to-end against Equinor&rsquo;s
              publicly released Volve field dataset &mdash; the same data underlying the
              Oil &amp; Gas section above.
            </p>
          </WetSurface>

          <WetSurface className="border-t-[3px] border-t-lichen-500 border-x-white/50 border-b-white/50 bg-white/80 p-8 shadow-card-lg backdrop-blur-md">
            <h3 className="font-display text-xl font-bold text-slag-900">TENETDrill Demo</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              A live, working demonstration of stuck-pipe prediction and BHA optimisation
              &mdash; not a mockup. Available for technical evaluation on request.
            </p>
          </WetSurface>

          <WetSurface className="border-t-[3px] border-t-lichen-500 border-x-white/50 border-b-white/50 bg-white/80 p-8 shadow-card-lg backdrop-blur-md">
            <h3 className="font-display text-xl font-bold text-slag-900">Research &amp; Whitepapers</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Ongoing methodology write-ups on physics-informed ML for drilling and the
              ILM (Independent Language Model) architecture, published as they mature.
            </p>
          </WetSurface>
        </div>

        <WetSurface className="reveal mt-16 grid grid-cols-2 gap-8 border-white/50 bg-white/80 p-10 shadow-card-lg backdrop-blur-md sm:grid-cols-4">
          <StatCounter value={85} suffix=" mD" label="Calibrated permeability" />
          <StatCounter value={92} suffix="%" label="ILM confidence, F-15" />
          <StatCounter value={50} suffix=" MB" label="TENETEdge RAM ceiling" />
          <StatCounter value={0} suffix="" label="Bytes leaving premise" />
        </WetSurface>
      </div>
    </section>
  )
}
