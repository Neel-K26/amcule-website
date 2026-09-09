import { WetSurface } from '../ui/WetSurface'
import { RockBleed } from '../ui/RockBleed'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Mission() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="mission" className="relative overflow-hidden bg-lichen-500 py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.06]" />
      <RockBleed corner="right" />

      <div className="container-page relative" ref={ref}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WetSurface className="reveal p-10 sm:p-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Mission</p>
            <p className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
              Give every industrial operator a private intelligence trained on their data,
              on their infrastructure &mdash; answerable to no one else.
            </p>
          </WetSurface>

          <WetSurface className="reveal p-10 sm:p-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Vision</p>
            <p className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
              A future where every critical operation&rsquo;s intelligence layer is{' '}
              <span className="text-lichen-600">sovereign</span> &mdash; not rented,
              not shared, not controlled by a contractor.
            </p>
          </WetSurface>
        </div>
      </div>
    </section>
  )
}
