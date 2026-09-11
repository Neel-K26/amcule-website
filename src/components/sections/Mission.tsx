import { TopoLines } from '../ui/TopoLines'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const operatorIlm = ['Well Data', 'Equipment Logs', 'Sensor Streams', 'Documents & SOPs', 'Historical Operations']
const domainIntelligence = ['Understand', 'Reason', 'Predict', 'Recommend', 'Act']
const bottomTrack = ['Data', 'Context', 'Intelligence', 'Decisions', 'Impact']

/**
 * A small glassmorphism info card, floating over the Mission photo.
 */
function GlassCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="w-full max-w-[220px] rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-white">{title}</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-white/75">
            <span className="h-1 w-1 rounded-full bg-lichen-400" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Mission / Vision — a two-column, no-gap layout: Mission sits on the
 * operator-with-laptop photo (charcoal container, background-image
 * cover); Vision sits on the clean warm-stone side.
 */
export function Mission() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="mission" className="relative">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[65fr_35fr]">
        {/* Mission — charcoal container (no raw mockup image as background —
            that file is a full design reference with its own baked-in text,
            not a plain photo, and using it as a background bled ghost copy
            through behind the coded overlay). */}
        <div className="reveal relative isolate flex min-h-[640px] flex-col justify-between overflow-hidden bg-charcoal-900 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-20">
          <div className="relative flex flex-1 flex-col justify-between gap-10 lg:flex-row lg:items-start">
            <div className="max-w-lg">
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-lichen-400">Mission</p>
              <p className="font-display text-3xl font-bold leading-snug text-ice-50 sm:text-4xl">
                Give every industrial operator a private intelligence trained on their data, on their
                infrastructure &mdash;{' '}
                <span className="italic text-lichen-400">answerable to no one else.</span>
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-4 lg:mt-2">
              <GlassCard title="Operator's ILM" items={operatorIlm} />
              <GlassCard title="Domain Intelligence" items={domainIntelligence} />
            </div>
          </div>

          <div className="relative mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <ul className="flex flex-col gap-1 border-l border-lichen-400/40 pl-3">
              {bottomTrack.map((word) => (
                <li key={word} className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-white/70">
                  {word}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1 text-left sm:text-right">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-white/70">
                Built for Real Operators.
              </p>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-white/70">
                Same Data. Deeper Answers.
              </p>
            </div>
          </div>
        </div>

        {/* Vision — clean warm stone */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-dotgrid bg-ice-50 px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-20">
          <TopoLines corner="top-right" className="opacity-[0.09]" />

          <div className="relative max-w-sm">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-lichen-dark">Vision</p>
            <p className="font-display text-2xl font-bold leading-snug text-slag-900 sm:text-3xl">
              A future where every critical operation&rsquo;s intelligence layer is{' '}
              <span className="font-bold text-lichen-dark">sovereign</span> &mdash; not rented, not
              shared, not controlled by a contractor.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="mb-3 h-px w-10 bg-slag-900/20" aria-hidden="true" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-stone-500">
              Same Principles. A Stronger Tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
