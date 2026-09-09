import clsx from '../../lib/clsx'

const steps = ['OBSERVE', 'UNDERSTAND', 'REASON', 'ACT', 'DELIVER']

interface VerticalMarkerProps {
  className?: string
  /** Use lighter text for placement on a dark/charcoal surface. */
  dark?: boolean
}

/**
 * The vertical brand spine: the agent pipeline steps plus the "BY AMCULE"
 * mark, run bottom-to-top along a section edge. Decorative — hidden from
 * assistive tech, hidden below lg where there's no room for it.
 */
export function VerticalMarker({ className = '', dark = false }: VerticalMarkerProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute z-10 hidden flex-col items-center justify-between py-2 lg:flex', className)}
    >
      <span
        className={clsx(
          'text-[10px] font-semibold tracking-[0.4em]',
          dark ? 'text-white/45' : 'text-slag-900/40',
        )}
        style={{ writingMode: 'vertical-rl' }}
      >
        {steps.join(' · ')}
      </span>
      <span
        className={clsx(
          'mt-8 text-[10px] font-bold tracking-[0.25em]',
          dark ? 'text-white/70' : 'text-slag-900/60',
        )}
        style={{ writingMode: 'vertical-rl' }}
      >
        BY AMCULE
      </span>
    </div>
  )
}
