import { useState } from 'react'
import { WetSurface } from '../ui/WetSurface'
import { TopoLines } from '../ui/TopoLines'
import { getImage } from '../../lib/images'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const team = [
  {
    name: 'Neel Khairnar',
    role: 'Founder & CEO',
    body: 'Architected Amcule&rsquo;s Independent Language Model from first principles, and built TENETDrill&rsquo;s physics-informed prediction core end-to-end. Led the Volve field calibration work that grounds the platform&rsquo;s drilling intelligence in real, publicly verifiable data &mdash; not synthetic benchmarks.',
    photo: 'team-nk.jpg',
  },
  {
    name: 'Dr. Bharat Kale',
    role: 'Director & Domain Validator',
    body: 'Former Director General of C-MET, with more than three decades leading applied research in materials science and electronics. Brings institutional rigor to Amcule&rsquo;s domain validation process, holding every model decision to the standard of real industrial deployment.',
    photo: 'team-bk.jpg',
  },
  {
    name: 'Raj Kapoor',
    role: 'Strategic Advisor',
    body: 'Founder of IBA and a Dubai Golden Visa holder with deep relationships across ADNOC and QatarEnergy. Advises on go-to-market strategy and partnership structuring across the GCC&rsquo;s national oil companies.',
    photo: 'team-rk.jpg',
  },
]

/**
 * A member's headshot — fills the top of the card as a proper photo, not
 * a small avatar. Falls back to an initials circle if the photo isn't
 * present yet or fails to load, rather than SiteImage's generic
 * "image slot" placeholder, which would look out of place here.
 */
function TeamPhoto({ photo, name }: { photo: string; name: string }) {
  const src = getImage(photo)
  const [errored, setErrored] = useState(false)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  if (!src || errored) {
    return (
      <div className="flex h-60 w-full items-center justify-center bg-charcoal-900">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-lichen-500/30 bg-lichen-500/10 font-display text-xl font-bold text-lichen-400">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setErrored(true)}
      className="h-60 w-full object-cover"
    />
  )
}

export function Team() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="team" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-lichen-dark" aria-hidden="true" />
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-lichen-dark">Team</p>
          </div>
          <h2 className="text-4xl sm:text-5xl">
            Built by people <span className="text-stone-500">who know the field.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <WetSurface
              key={member.name}
              className="reveal flex min-h-[400px] flex-col overflow-hidden border-t-[3px] border-t-lichen-500"
            >
              <TeamPhoto photo={member.photo} name={member.name} />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-bold text-slag-900">{member.name}</h3>
                <p className="mt-1 font-mono text-[13px] font-medium text-lichen-dark">{member.role}</p>
                <p className="mt-4 text-base leading-relaxed text-stone-500" dangerouslySetInnerHTML={{ __html: member.body }} />
              </div>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
