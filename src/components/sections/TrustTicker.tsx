const metrics = [
  '85 mD permeability',
  '0 bytes leaving premise',
  '<50 MB TENETEdge RAM',
  '1.383× BHA torque factor',
  '0.154 bar/m fracture gradient',
  '3 agents',
  '100% on-premise',
]

/**
 * Auto-scrolling marquee of real, specific metrics — no vague claims.
 * Duplicated once so the CSS marquee keyframe (-50%) loops seamlessly.
 * Pauses via prefers-reduced-motion through the shared global rule.
 */
export function TrustTicker() {
  const track = [...metrics, ...metrics]

  return (
    <div className="relative border-y border-ice-100 bg-ice-50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ice-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ice-50 to-transparent" />

      <div className="flex w-max animate-marquee items-center">
        {track.map((metric, i) => (
          <span
            key={`${metric}-${i}`}
            className="mx-6 flex items-center gap-2 whitespace-nowrap font-body text-sm font-semibold uppercase tracking-wider text-slag-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lichen-500" aria-hidden="true" />
            {metric}
          </span>
        ))}
      </div>
    </div>
  )
}
