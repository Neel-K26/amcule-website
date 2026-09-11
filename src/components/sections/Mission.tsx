import { RockBleed } from '../ui/RockBleed'
import { TopoLines } from '../ui/TopoLines'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Mission / Vision — one coherent architectural section split roughly
 * 65/35: Mission sits on the lichen-green, grounded, physical side;
 * Vision sits on the clean stone side. A single lichen rule marks the
 * transition between them rather than two separate cards.
 */
export function Mission() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="mission" className="relative">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[65fr_35fr]">
        {/* Mission — grounded, physical, lichen-green */}
        <div className="reveal relative overflow-hidden bg-lichen-500 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <RockBleed corner="bottom-left" filename="oilgas-formation.png" opacity={55} />
          <TopoLines corner="top-right" className="opacity-[0.09]" />

          <div className="relative max-w-xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-slag-900/70">Mission</p>
            <p className="font-display text-3xl font-bold leading-snug text-slag-900 sm:text-4xl">
              Give every industrial operator a private intelligence trained on their data,
              on their infrastructure &mdash; answerable to no one else.
            </p>
          </div>
        </div>

        {/* The transition — a single lichen rule, not two cards */}
        <div className="relative overflow-hidden bg-dotgrid bg-ice-50 px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
          <div className="absolute inset-y-0 left-0 hidden w-px bg-lichen-500 lg:block" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-px w-full bg-lichen-500 lg:hidden" aria-hidden="true" />

          <div className="relative max-w-sm">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-lichen-dark">Vision</p>
            <p className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
              A future where every critical operation&rsquo;s intelligence layer is{' '}
              <span className="text-lichen-dark">sovereign</span> &mdash; not rented,
              not shared, not controlled by a contractor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
