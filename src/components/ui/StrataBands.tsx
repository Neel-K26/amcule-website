interface StrataBandsProps {
  className?: string
}

const BAND_HEIGHTS = [6, 3, 8, 2, 5, 4, 2]
const BAND_FILLS = ['#8FA900', '#111111', '#6F716A', '#111111', '#B8D900', '#6F716A', '#111111']
const BAND_OPACITY = [0.5, 0.15, 0.3, 0.2, 0.45, 0.25, 0.15]

let y = 0
const bands = BAND_HEIGHTS.map((h, i) => {
  const band = { y, h, fill: BAND_FILLS[i], opacity: BAND_OPACITY[i] }
  y += h
  return band
})

/**
 * Formation-strata accent: thin horizontal bands with subtle colour and
 * height variance, reading as subsurface geology. A bottom-edge device —
 * never a full background.
 */
export function StrataBands({ className = '' }: StrataBandsProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 30" preserveAspectRatio="none" className={className}>
      {bands.map((band) => (
        <rect key={band.y} x="0" y={band.y} width="1000" height={band.h} fill={band.fill} opacity={band.opacity} />
      ))}
    </svg>
  )
}
