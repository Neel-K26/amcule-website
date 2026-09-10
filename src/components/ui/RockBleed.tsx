import { SiteImage } from './SiteImage'
import clsx from '../../lib/clsx'

interface RockBleedProps {
  corner: 'bottom-left' | 'top-right' | 'top-left' | 'right'
  /** Which uploaded photo to bleed — defaults to the dedicated rock texture slot. */
  filename?: string
  /** 0–100, applied via inline style so it never fights the base Tailwind opacity class. */
  opacity?: number
  className?: string
}

const cornerStyles: Record<RockBleedProps['corner'], string> = {
  'bottom-left': 'bottom-0 left-0 h-[46%] w-[34%] [mask-image:radial-gradient(ellipse_at_bottom_left,black_35%,transparent_75%)]',
  'top-right': 'top-0 right-0 h-[46%] w-[34%] [mask-image:radial-gradient(ellipse_at_top_right,black_35%,transparent_75%)]',
  'top-left': 'top-0 left-0 h-[42%] w-[30%] [mask-image:radial-gradient(ellipse_at_top_left,black_35%,transparent_75%)]',
  right: 'inset-y-0 right-0 h-full w-[28%] [mask-image:linear-gradient(to_left,black_25%,transparent_85%)]',
}

/**
 * The mossy-volcanic-rock corner bleed — a signature, low-key device at
 * section edges/transitions, never a full background. Pass `corner` to
 * pick the edge, and optionally `filename` to reuse one of the uploaded
 * photos (rig detail, ops floor, etc.) as the bleed texture.
 */
export function RockBleed({ corner, filename = 'texture-rock.jpg', opacity = 90, className = '' }: RockBleedProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute z-0', cornerStyles[corner], className)}
      style={{ opacity: opacity / 100 }}
    >
      <SiteImage
        filename={filename}
        alt=""
        label="Rock/moss corner texture"
        className="h-full w-full rounded-none border-0 bg-transparent p-0"
      />
    </div>
  )
}
