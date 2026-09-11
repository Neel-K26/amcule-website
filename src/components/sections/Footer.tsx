import { Logo } from '../ui/Logo'
import { site } from '../../config/site'

const columns: { title: string; links: string[] }[] = [
  { title: 'Platform', links: ['TENETDrill', 'TENETFlow', 'TENETEdge', 'Full ILM'] },
  { title: 'Company', links: ['Mission & Vision', 'Team', 'Contact'] },
  { title: 'Research', links: ['Validation & Pilots', 'Volve Calibration', 'Whitepapers'] },
]

/** Footer — the page's closing charcoal band. Strong, branded close. */
export function Footer() {
  return (
    <footer className="relative bg-charcoal-900 pt-16 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500">
              {site.tagline} Custom Language Models as a Service for heavy industry &mdash;
              on-premise, zero data egress.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lichen-400">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-stone-500 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.year} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.location} &middot; {site.gccPresence} &middot;{' '}
            <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
