interface LogoProps {
  className?: string
  withWordmark?: boolean
  /** White wordmark, for use on the dark charcoal footer. */
  light?: boolean
}

/**
 * Amcule mark: a central node with three connected satellite nodes —
 * SLM at the core, agents orbiting it. Lichen-green on a rounded square.
 */
export function Logo({ className = '', withWordmark = true, light = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#111111" />
        <rect width="36" height="36" rx="10" stroke="#C4E326" strokeOpacity="0.35" />
        <line x1="18" y1="18" x2="9" y2="10" stroke="#C4E326" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="18" y1="18" x2="27" y2="10" stroke="#C4E326" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="18" y1="18" x2="18" y2="28" stroke="#C4E326" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="18" cy="18" r="5" fill="#C4E326" />
        <circle cx="9" cy="10" r="2.5" fill="#C4E326" fillOpacity="0.85" />
        <circle cx="27" cy="10" r="2.5" fill="#C4E326" fillOpacity="0.85" />
        <circle cx="18" cy="28" r="2.5" fill="#C4E326" fillOpacity="0.85" />
      </svg>
      {withWordmark && (
        <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-slag-900'}`}>
          Amcule
        </span>
      )}
    </span>
  )
}
