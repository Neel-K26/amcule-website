import clsx from '../../lib/clsx'

interface StatBadgeProps {
  children: string
  dark?: boolean
  className?: string
}

/**
 * Tiny technical-dashboard badge — thin border, small caps type, lichen
 * dot. Reads as instrumentation, not a marketing pill.
 */
export function StatBadge({ children, dark = false, className = '' }: StatBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
        dark ? 'border-white/15 text-white/60' : 'border-slag-900/15 text-stone-500',
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-lichen-500" aria-hidden="true" />
      {children}
    </span>
  )
}
