import { WetSurface } from '../ui/WetSurface'
import { TopoLines } from '../ui/TopoLines'
import { ModelIcon, ChipIcon, NetworkIcon } from '../ui/ProductIcons'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import whatWeDoBg from '../../assets/images/whatwedo-bg.png'

const pillars = [
  {
    title: 'Custom',
    body: 'Every model is trained exclusively on one organisation’s operational data. Not fine-tuned on top of a generic base — built for you, from your data.',
    icon: ModelIcon,
  },
  {
    title: 'Small',
    body: 'Small Language Models sized for the task, not the internet. Fast, cheap to run, and deployable on modest on-premise hardware.',
    icon: ChipIcon,
  },
  {
    title: 'Agentic',
    body: 'A supervisor coordinates specialist agents — data prep, drilling, anomaly detection — each grounded in your model, your truth.',
    icon: NetworkIcon,
  },
]

/**
 * What We Do — explains CLMaaS in plain terms. "One operator, one model,
 * one truth" is the section's thesis statement. whatwedo-bg.png is the
 * full section background (misty left, BHA drill detail on the right);
 * a left-to-right gradient keeps the text column readable while the
 * drill bleeds through on the right.
 */
export function WhatWeDo() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="what-we-do"
      className="overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
      style={{
        position: 'relative',
        backgroundImage: `url(${whatWeDoBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(243,241,232,0.96) 0%, rgba(243,241,232,0.9) 45%, rgba(243,241,232,0.3) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <TopoLines corner="top-right" className="opacity-[0.07]" />

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: '580px' }}>
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-dark">What We Do</p>
          <h2 className="text-4xl sm:text-5xl">
            Custom Language Models <span className="text-stone-500">as a Service.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            One operator, one model, one truth. Amcule builds a private intelligence layer trained exclusively on
            your organisation&rsquo;s own data &mdash; never pooled, never shared across customers, never sent to a
            shared cloud.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {pillars.map((pillar) => (
            <WetSurface key={pillar.title} className="reveal border-t-[3px] border-t-charcoal-900 p-7">
              <pillar.icon className="h-7 w-7 text-lichen-dark" />
              <h3 className="mt-4 font-display text-xl font-bold text-charcoal-900">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{pillar.body}</p>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
