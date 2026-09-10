import { Logo } from '../ui/Logo'
import { site } from '../../config/site'

const columns: { title: string; links: string[] }[] = [
  { title: 'Platform', links: ['TENETDrill', 'TENETFlow', 'TENETEdge', 'Full ILM'] },
  { title: 'Company', links: ['Mission & Vision', 'Team', 'Contact'] },
  { title: 'Research', links: ['Validation & Pilots', 'Volve Calibration', 'Whitepapers'] },
]

/** Footer — the page's closing lichen-green band. Strong, branded close. */
export function Footer() {
  return (
    <footer className="relative bg-lichen-500 pt-16 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slag-900/70">
              {site.tagline} Custom Language Models as a Service for heavy industry &mdash;
              on-premise, zero data egress.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-900">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slag-900/70 transition-colors hover:text-slag-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-slag-900/15 pt-8 text-xs text-slag-900/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.year} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.location} &middot; {site.gccPresence} &middot;{' '}
            <a href={`mailto:${site.contactEmail}`} className="hover:text-slag-900">
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
