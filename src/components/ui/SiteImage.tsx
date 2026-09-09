import { useState } from 'react'
import { getImage } from '../../lib/images'
import clsx from '../../lib/clsx'

interface SiteImageProps {
  /** Filename expected in src/assets/images/ — see the README there. */
  filename: string
  alt: string
  /** Shown on the placeholder box while the real file isn't present yet. */
  label?: string
  className?: string
}

/**
 * Drop-in photo slot. Resolves `filename` from src/assets/images/ at build
 * time; if it isn't there (or fails to load), renders a labelled
 * placeholder instead of a broken image, so the layout ships correctly
 * before real photography arrives.
 */
export function SiteImage({ filename, alt, label, className = 'aspect-[4/3] rounded-2xl' }: SiteImageProps) {
  const src = getImage(filename)
  const [errored, setErrored] = useState(false)
  const showPlaceholder = !src || errored

  return (
    <div className={clsx('relative overflow-hidden bg-ice-50', className)}>
      {!showPlaceholder && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
      {showPlaceholder && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-slag-900/15 p-6 text-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#8A8C8F" strokeWidth="1.5" />
            <circle cx="8.5" cy="10" r="1.5" fill="#8A8C8F" />
            <path d="M21 15l-5.5-5-9.5 9" stroke="#8A8C8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Image slot</p>
          <p className="text-xs font-medium text-slag-700">{label ?? alt}</p>
          <p className="text-[10px] text-stone-500">src/assets/images/{filename}</p>
        </div>
      )}
    </div>
  )
}
