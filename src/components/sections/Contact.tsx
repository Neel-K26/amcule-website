import { useState, type FormEvent } from 'react'
import { WetSurface } from '../ui/WetSurface'
import { MagneticButton } from '../ui/MagneticButton'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { site } from '../../config/site'
import { TopoLines } from '../ui/TopoLines'
import { StatBadge } from '../ui/StatBadge'

const interests = [
  'TENETDrill',
  'TENETFlow',
  'TENETEdge',
  'Full ILM',
  'Research partnership',
  'Investment',
]

const inputClass =
  'w-full rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-lichen-400 focus:outline-none'

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire to real submission endpoint (email service / form backend).
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.06]" />

      <div className="container-page relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]" ref={ref}>
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">Contact</p>
          <h2 className="text-4xl sm:text-5xl">
            Let&rsquo;s talk <span className="text-stone-500">deployment.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slag-700">
            Tell us about your operation and where you&rsquo;d like an on-premise
            intelligence layer. We&rsquo;ll respond within one business day.
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-slag-900">Email</dt>
              <dd>
                <a href={`mailto:${site.contactEmail}`} className="text-stone-500 hover:text-lichen-600">
                  {site.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slag-900">Headquarters</dt>
              <dd className="text-stone-500">{site.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slag-900">Regional presence</dt>
              <dd className="text-stone-500">{site.gccPresence}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            <StatBadge>On-premise</StatBadge>
          </div>
        </div>

        {/* The form panel is the section's lichen-green element — dark
            charcoal fields and dark text on top of it, not stone on stone. */}
        <WetSurface className="reveal bg-lichen-500 p-8 sm:p-10">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <p className="font-display text-2xl font-bold text-charcoal-900">Message received.</p>
              <p className="mt-3 max-w-sm text-sm text-slag-900/70">
                Thank you for reaching out &mdash; a member of the Amcule team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slag-900/70">
                  First name
                </label>
                <input id="firstName" name="firstName" type="text" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slag-900/70">
                  Last name
                </label>
                <input id="lastName" name="lastName" type="text" required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="organisation" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slag-900/70">
                  Organisation
                </label>
                <input id="organisation" name="organisation" type="text" required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="interest" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slag-900/70">
                  Area of interest
                </label>
                <select id="interest" name="interest" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select an area
                  </option>
                  {interests.map((i) => (
                    <option key={i} value={i} className="bg-charcoal-900 text-white">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slag-900/70">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} required className={`${inputClass} resize-none`} />
              </div>
              <div className="sm:col-span-2">
                <MagneticButton type="submit" variant="dark" className="w-full sm:w-auto">
                  Send message
                </MagneticButton>
              </div>
            </form>
          )}
        </WetSurface>
      </div>
    </section>
  )
}
