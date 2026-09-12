import { Logo } from '../ui/Logo'
import { site } from '../../config/site'
import contactBgImage from '../../assets/images/contact-bg.png'

const columns: { title: string; links: string[] }[] = [
  { title: 'Platform', links: ['TENETDrill', 'TENETFlow', 'TENETEdge', 'Full ILM'] },
  { title: 'Company', links: ['Mission & Vision', 'Team', 'Contact'] },
  { title: 'Research', links: ['Validation & Pilots', 'Volve Calibration', 'Whitepapers'] },
]

/**
 * Footer — the page's closing band. Continues contact-bg.png (same
 * image, same fixed attachment as Contact above) so the background
 * flows seamlessly across the seam; a top-to-bottom overlay eases from
 * Contact's dark wash into a solid charcoal close at the very bottom.
 */
export function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        backgroundImage: `url(${contactBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(8,12,8,0.72) 0%, rgba(20,23,18,0.92) 40%, #20231D 85%)' }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-base font-medium leading-relaxed text-white/80">
              {site.tagline} Custom Language Models as a Service for heavy industry &mdash;
              on-premise, zero data egress.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-lichen-400">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base font-medium text-white/75 transition-colors hover:text-lichen-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-8 text-sm font-medium text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.year} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.location} &middot; {site.gccPresence} &middot;{' '}
            <a href={`mailto:${site.contactEmail}`} className="font-semibold text-white/85 hover:text-lichen-400">
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
