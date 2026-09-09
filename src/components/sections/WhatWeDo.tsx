import { WetSurface } from '../ui/WetSurface'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const pillars = [
  {
    title: 'Custom',
    body: 'Every model is trained exclusively on one organisation’s operational data. Not fine-tuned on top of a generic base — built for you, from your data.',
  },
  {
    title: 'Small',
    body: 'Small Language Models sized for the task, not the internet. Fast, cheap to run, and deployable on modest on-premise hardware.',
  },
  {
    title: 'Agentic',
    body: 'A supervisor coordinates specialist agents — data prep, drilling, anomaly detection — each grounded in your model, your truth.',
  },
]

/**
 * What We Do — explains CLMaaS in plain terms. "One operator, one model,
 * one truth" is the section's thesis statement.
 */
export function WhatWeDo() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="what-we-do" className="relative overflow-hidden bg-lichen-500 py-28 sm:py-36">
      <div aria-hidden="true" className="texture-topo pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="container-page relative" ref={ref}>
        <div className="reveal max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slag-900/70">What We Do</p>
          <h2 className="text-4xl sm:text-5xl">
            Custom Language Models <span className="text-slag-900/50">as a Service.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slag-700">
            One operator, one model, one truth. Amcule builds a private intelligence layer
            trained exclusively on your organisation&rsquo;s own data &mdash; never pooled,
            never shared across customers, never sent to a shared cloud.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <WetSurface key={pillar.title} className="reveal p-8">
              <h3 className="font-display text-2xl font-bold text-lichen-600">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{pillar.body}</p>
            </WetSurface>
          ))}
        </div>
      </div>
    </section>
  )
}
