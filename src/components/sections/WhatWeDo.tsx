import { WetSurface } from '../ui/WetSurface'
import { SiteImage } from '../ui/SiteImage'
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
 * one truth" is the section's thesis statement. The BHA close-up bleeds
 * in on the right 40% so the three cards aren't floating alone on bare
 * stone; a real two-column grid (not an absolutely-positioned overlay)
 * keeps the image and text sharing one reference frame.
 */
export function WhatWeDo() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="what-we-do" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Left 60% — warm stone, the three pillars */}
        <div className="bg-dotgrid relative bg-ice-50 px-6 py-28 sm:px-10 sm:py-36 lg:px-16" ref={ref}>
          <TopoLines corner="top-right" className="opacity-[0.07]" />

          <div className="reveal relative max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-dark">What We Do</p>
            <h2 className="text-4xl sm:text-5xl">
              Custom Language Models <span className="text-stone-500">as a Service.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slag-700">
              One operator, one model, one truth. Amcule builds a private intelligence layer
              trained exclusively on your organisation&rsquo;s own data &mdash; never pooled,
              never shared across customers, never sent to a shared cloud.
            </p>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {pillars.map((pillar) => (
              <WetSurface key={pillar.title} className="reveal border-t-[3px] border-t-charcoal-900 p-7">
                <pillar.icon className="h-7 w-7 text-lichen-dark" />
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">{pillar.body}</p>
              </WetSurface>
            ))}
          </div>
        </div>

        {/* Right 40% — the BHA close-up, fading left into the stone column */}
        <div className="relative hidden min-h-[320px] lg:block">
          <SiteImage
            filename="oilgas-rig-detail.png"
            alt="Close-up of Amcule-monitored drilling equipment"
            label="What We Do — BHA / rig detail"
            className="h-full w-full rounded-none border-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ice-50"
          />
        </div>
      </div>
    </section>
  )
}
