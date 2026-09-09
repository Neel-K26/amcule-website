import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animates a counter from 0 -> `value` when the element scrolls into view.
 * Renders through `format` on every tick so units/decimals stay attached.
 */
export function useCountUp<T extends HTMLElement>(
  value: number,
  format: (n: number) => string = (n) => Math.round(n).toString(),
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      el.textContent = format(value)
      return
    }

    const counter = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = format(counter.n)
        },
      })
    })

    return () => ctx.revert()
  }, [value, format])

  return ref
}
