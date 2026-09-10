interface IconProps {
  className?: string
}

/**
 * Line-only, 2px-stroke isometric-flavoured micro-icons — hand-drawn feel,
 * not a stock icon set. All use currentColor so callers set colour via
 * className (text-lichen-400, text-charcoal-900, etc).
 */

export function DrillRigIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 3 8 26h16L16 3Z M16 3v23 M11 13h10 M9.5 19h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 28h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function FormationColumnIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="4" width="18" height="24" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11h18M7 16.5h18M7 22h18" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 11v5.5M14 16.5V22M20 4v7M24 22v6" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 2" />
    </svg>
  )
}

export function JetsonBoxIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M6 11 16 5l10 6v10L16 27 6 21V11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11l10 6 10-6M16 17v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 13.2v4.2M20 13.2v4.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function ShieldIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 4 7 8v8c0 6.5 4 10.5 9 12 5-1.5 9-5.5 9-12V8l-9-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11.5 16.2 14.5 19l6-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="14" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 14v-3a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="20" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 21.8V24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function GearIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 4v3.4M16 24.6V28M28 16h-3.4M7.4 16H4M24.2 7.8l-2.4 2.4M10.2 21.8l-2.4 2.4M24.2 24.2l-2.4-2.4M10.2 10.2 7.8 7.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Custom — a trained model, not a generic one. */
export function ModelIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 4c-4.5 0-7 3-7 6.5 0 2 1 3 1 4.5S9 17 9 19.5C9 24 12 28 16 28s7-4 7-8.5c0-2.5-1-3.5-1-5.5s1-2.5 1-4.5c0-3.5-2.5-6.5-7-6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 4v24M11 11.5c1.5 1 3 1 5 1s3.5 0 5-1M10 19c2 1 4 1 6 1s4 0 6-1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Small — a compact processor, sized for the task. */
export function ChipIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="9" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M13 4v4M19 4v4M13 24v4M19 24v4M4 13h4M4 19h4M24 13h4M24 19h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Agentic — coordinated nodes, not a single black box. */
export function NetworkIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 16 8 9M16 16l8-7M16 16v11M16 16 7 22M16 16l9 6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
      <circle cx="8" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="27" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="22" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="25" cy="22" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
