import { SiteImage } from './SiteImage'
import clsx from '../../lib/clsx'

interface RockBleedProps {
  corner: 'bottom-left' | 'top-right' | 'right'
  className?: string
}

const cornerStyles: Record<RockBleedProps['corner'], string> = {
  'bottom-left': 'bottom-0 left-0 h-[46%] w-[34%] [mask-image:radial-gradient(ellipse_at_bottom_left,black_35%,transparent_75%)]',
  'top-right': 'top-0 right-0 h-[46%] w-[34%] [mask-image:radial-gradient(ellipse_at_top_right,black_35%,transparent_75%)]',
  right: 'inset-y-0 right-0 h-full w-[28%] [mask-image:linear-gradient(to_left,black_25%,transparent_85%)]',
}

/**
 * The mossy-volcanic-rock corner bleed — a signature, low-key device at
 * section edges, never a full background. Pass `corner` to pick the edge;
 * the mask fades the photo to nothing well before it reaches the centre.
 */
export function RockBleed({ corner, className = '' }: RockBleedProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute z-0 opacity-90', cornerStyles[corner], className)}
    >
      <SiteImage
        filename="texture-rock.jpg"
        alt=""
        label="Rock/moss corner texture"
        className="h-full w-full rounded-none border-0 bg-transparent p-0"
      />
    </div>
  )
}
