import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable "fade + rise, staggered" scroll reveal for a section's direct
 * children matching `selector`. Respects prefers-reduced-motion by leaving
 * content visible and skipping the animation entirely.
 */
export function useScrollReveal<T extends HTMLElement>(selector = '.reveal') {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = ref.current.querySelectorAll(selector)
    if (targets.length === 0) return

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [selector])

  return ref
}
