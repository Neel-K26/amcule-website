import { WetSurface } from '../ui/WetSurface'
import { TopoLines } from '../ui/TopoLines'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const team = [
  {
    name: 'Neel Khairnar',
    role: 'Founder & CEO',
    body: 'ILM architecture, TENETDrill and the Volve calibration work.',
  },
  {
    name: 'Dr. Bharat Kale',
    role: 'Director & Domain Validator',
    body: 'Ex-Director General, C-MET. 30+ years in applied research and materials/electronics R&D leadership.',
  },
  {
    name: 'Raj Kapoor',
    role: 'Strategic Advisor',
    body: 'Founder, IBA. Dubai Golden Visa holder with an ADNOC / QatarEnergy network across the GCC.',
  },
]

export function Team() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="team" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Team</p>
          <h2 className="text-4xl sm:text-5xl">
            Built by people <span className="text-stone-500">who know the field.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <WetSurface key={member.name} className="reveal p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-lichen-500/30 bg-lichen-500/10 font-display text-lg font-bold text-lichen-600">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <h3 className="font-display text-lg font-bold text-slag-900">{member.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-lichen-600">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{member.body}</p>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
