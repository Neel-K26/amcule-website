import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { gsap } from 'gsap'
import clsx from '../../lib/clsx'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /**
   * 'dark'  — charcoal fill, white text. Primary CTA on green fields.
   * 'white' — white fill, dark text. Secondary CTA on green fields.
   * 'primary' — deepened-green fill, dark text. Primary CTA on white panels.
   * 'ghost' — outline only, works on any surface.
   */
  variant?: 'primary' | 'dark' | 'white' | 'ghost'
}

/**
 * Primary CTA with a subtle magnetic-hover pull toward the cursor.
 * Respects prefers-reduced-motion by skipping the transform entirely.
 */
export function MagneticButton({ children, variant = 'primary', className = '', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.4, duration: 0.4, ease: 'power2.out' })
  }

  function handleLeave() {
    if (prefersReducedMotion || !ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-body font-semibold text-base transition-colors duration-200'
  const variants = {
    primary: 'bg-lichen-500 text-slag-900 hover:bg-lichen-400',
    dark: 'bg-charcoal-900 text-white hover:bg-charcoal-800',
    white: 'bg-stone-200 text-slag-900 shadow-card hover:bg-ice-50',
    ghost: 'border border-slag-900/25 text-slag-900 hover:border-charcoal-900 hover:bg-slag-900/5',
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
