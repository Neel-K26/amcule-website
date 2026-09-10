import clsx from '../../lib/clsx'

interface TechMarkProps {
  /** 'crosshair' = full cross; 'plus' = small tick-mark plus; 'pointer' = circle with a leader line. */
  variant?: 'crosshair' | 'plus' | 'pointer'
  dark?: boolean
  className?: string
}

/**
 * Small engineering-drawing style annotation marks — placed near key cards
 * and figures to read as a technical instrument, not decoration.
 */
export function TechMark({ variant = 'crosshair', dark = false, className = '' }: TechMarkProps) {
  const stroke = dark ? '#C4E326' : '#8FA900'

  if (variant === 'plus') {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className={clsx('pointer-events-none', className)}>
        <path d="M8 2v12M2 8h12" stroke={stroke} strokeWidth="1.2" />
      </svg>
    )
  }

  if (variant === 'pointer') {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 24" className={clsx('pointer-events-none', className)}>
        <circle cx="8" cy="12" r="4.5" stroke={stroke} strokeWidth="1.2" fill="none" />
        <path d="M12.5 12H56M56 12l-6-4M56 12l-6 4" stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={clsx('pointer-events-none', className)}>
      <circle cx="20" cy="20" r="13" stroke={stroke} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M20 2v10M20 28v10M2 20h10M28 20h10" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}
