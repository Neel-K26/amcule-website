import { WetSurface } from '../ui/WetSurface'
import { TopoLines } from '../ui/TopoLines'
import { ModelIcon, ChipIcon, NetworkIcon } from '../ui/ProductIcons'
import { useScrollReveal } from '../../hooks/useScrollReveal'

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
 * one truth" is the section's thesis statement. Warm Stone base, green
 * used only as accent (kicker, icons, card headings).
 */
export function WhatWeDo() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="what-we-do" className="bg-dotgrid relative overflow-hidden bg-ice-50 py-28 sm:py-36">
      <TopoLines corner="top-right" className="opacity-[0.07]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-600">What We Do</p>
          <h2 className="text-4xl sm:text-5xl">
            Custom Language Models <span className="text-stone-500">as a Service.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            One operator, one model, one truth. Amcule builds a private intelligence layer
            trained exclusively on your organisation&rsquo;s own data &mdash; never pooled,
            never shared across customers, never sent to a shared cloud.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <WetSurface key={pillar.title} className="reveal border-t-[3px] border-t-charcoal-900 p-8">
              <pillar.icon className="h-7 w-7 text-lichen-600" />
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{pillar.body}</p>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
