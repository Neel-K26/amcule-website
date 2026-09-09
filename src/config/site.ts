/**
 * Single source of truth for site-wide identity/URL config.
 * Swap `siteUrl` here when re-pointing from amcule.vercel.app to amcule.in — nowhere else.
 */
export const site = {
  name: 'Amcule',
  legalName: 'Amcule Pvt Ltd',
  tagline: 'Intelligence built for heavy industry.',
  siteUrl: 'https://amcule.vercel.app',
  contactEmail: 'contact@amcule.com',
  location: 'Pune, India',
  gccPresence: 'GCC via Dubai',
  year: new Date().getFullYear(),
} as const

export type SiteConfig = typeof site
