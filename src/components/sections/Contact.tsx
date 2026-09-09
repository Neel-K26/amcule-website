import { useState, type FormEvent } from 'react'
import { WetSurface } from '../ui/WetSurface'
import { MagneticButton } from '../ui/MagneticButton'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { site } from '../../config/site'

const interests = [
  'TENETDrill',
  'TENETFlow',
  'TENETEdge',
  'Full ILM',
  'Research partnership',
  'Investment',
]

const inputClass =
  'w-full rounded-xl border border-ice-100 bg-ice-50 px-4 py-3 text-sm text-slag-900 placeholder:text-stone-500 transition-colors focus:border-lichen-600 focus:outline-none'

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire to real submission endpoint (email service / form backend).
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-lichen-500 py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="container-page relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]" ref={ref}>
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slag-900/70">Contact</p>
          <h2 className="text-4xl sm:text-5xl">
            Let&rsquo;s talk <span className="text-slag-900/50">deployment.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slag-700">
            Tell us about your operation and where you&rsquo;d like an on-premise
            intelligence layer. We&rsquo;ll respond within one business day.
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-slag-900">Email</dt>
              <dd>
                <a href={`mailto:${site.contactEmail}`} className="text-slag-700 hover:text-slag-900">
                  {site.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slag-900">Headquarters</dt>
              <dd className="text-slag-700">{site.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slag-900">Regional presence</dt>
              <dd className="text-slag-700">{site.gccPresence}</dd>
            </div>
          </dl>
        </div>

        <WetSurface className="reveal p-8 sm:p-10">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <p className="font-display text-2xl font-bold text-lichen-600">Message received.</p>
              <p className="mt-3 max-w-sm text-sm text-stone-500">
                Thank you for reaching out &mdash; a member of the Amcule team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  First name
                </label>
                <input id="firstName" name="firstName" type="text" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Last name
                </label>
                <input id="lastName" name="lastName" type="text" required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="organisation" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Organisation
                </label>
                <input id="organisation" name="organisation" type="text" required className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="interest" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Area of interest
                </label>
                <select id="interest" name="interest" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select an area
                  </option>
                  {interests.map((i) => (
                    <option key={i} value={i} className="bg-white text-slag-900">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} required className={`${inputClass} resize-none`} />
              </div>
              <div className="sm:col-span-2">
                <MagneticButton type="submit" className="w-full sm:w-auto">
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
