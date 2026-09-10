import clsx from '../../lib/clsx'

interface TopoLinesProps {
  /** 'rings' = concentric contour rings; 'contour' = organic wavy horizontal lines. */
  variant?: 'rings' | 'contour'
  corner?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** White strokes, for placement on a charcoal/dark surface. */
  dark?: boolean
  className?: string
}

const cornerClass: Record<NonNullable<TopoLinesProps['corner']>, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0 -scale-x-100',
  'bottom-right': 'bottom-0 right-0 -scale-y-100',
  'bottom-left': 'bottom-0 left-0 -scale-x-100 -scale-y-100',
}

const RING_RADII = [40, 80, 120, 160, 200, 240, 280, 320]
const CONTOUR_ROWS = [10, 55, 100, 145, 190, 235, 280, 325, 370]

/**
 * The topographic contour-line brand motif. A corner-anchored SVG texture —
 * always low-opacity via the caller's className, never a visual competitor.
 */
export function TopoLines({ variant = 'rings', corner = 'top-right', dark = false, className = '' }: TopoLinesProps) {
  const stroke = dark ? '#FFFFFF' : '#111111'

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 420"
      className={clsx('pointer-events-none absolute h-[280px] w-[280px] sm:h-[420px] sm:w-[420px]', cornerClass[corner], className)}
    >
      {variant === 'rings' ? (
        <g fill="none" stroke={stroke} strokeWidth="1.1">
          {RING_RADII.map((r) => (
            <circle key={r} cx="420" cy="0" r={r} />
          ))}
        </g>
      ) : (
        <g fill="none" stroke={stroke} strokeWidth="1">
          {CONTOUR_ROWS.map((y, i) => (
            <path
              key={y}
              d={`M-20 ${y} Q 90 ${y - 22 + (i % 2) * 14} 210 ${y} T 440 ${y}`}
            />
          ))}
        </g>
      )}
    </svg>
  )
}
