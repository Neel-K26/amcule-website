import type { ElementType, ReactNode } from 'react'
import clsx from '../../lib/clsx'

interface WetSurfaceProps {
  as?: ElementType
  children: ReactNode
  className?: string
  glow?: boolean
  /** Renders as the dark charcoal "feature block" object instead of a white card. */
  dark?: boolean
}

/**
 * The reusable card primitive. Default: white fill, minimal border, soft
 * drop shadow — reads on both green fields and white panels. `dark` swaps
 * it for the charcoal feature-block treatment (white text, deeper shadow),
 * used sparingly as a deliberate visual anchor.
 */
export function WetSurface({ as: Tag = 'div', children, className = '', glow = false, dark = false }: WetSurfaceProps) {
  return (
    <Tag className={clsx('wet-surface', dark && 'is-dark', glow && 'wet-glow', className)}>
      {children}
    </Tag>
  )
}
