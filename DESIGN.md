# Amcule — Design System
> volcanic rock meets operational intelligence

**Theme:** mixed (dark industrial + warm mineral)

Amcule operates in a volcanic-industrial visual language: a warm stone canvas with deep charcoal anchors, bold Inter typography, and a single lichen-green accent that activates on CTAs, status indicators, and key data highlights. The type system uses Inter at two weights — 400 for body, 700 for display — hierarchy is carved through size and tight negative letter-spacing. JetBrains Mono is reserved for technical labels, nav items, section counters, parameter readouts, and metadata. Surfaces use thin 1px hairline borders, no box-shadows. Dark sections flip to charcoal (#20231D) with warm stone text. Oil & gas photography bleeds into sections as the dominant visual layer — the site should feel 40% image, 30% warm stone, 20% lichen green accents, 10% charcoal blocks.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Lichen Green | `#B8D900` | `--color-lichen` | Primary accent: CTAs, active nav, status dots, key stat numbers, ticker background, section highlights. Never as body text, never as large background fills |
| Lichen Dark | `#4A5A10` | `--color-lichen-dark` | Text accent on warm stone — section labels, highlighted words in headlines. Readable on light backgrounds |
| Warm Stone | `#F3F1E8` | `--color-warm-stone` | Primary page canvas. Warm off-white with mineral character — NOT pure white |
| Card Surface | `#E9E7DE` | `--color-card` | Card fills on warm stone canvas. Subtle separation without shadow |
| Card Border | `#D8D6CB` | `--color-card-border` | Hairline borders on cards and dividers on light surfaces |
| Charcoal | `#20231D` | `--color-charcoal` | Dark section backgrounds, dark cards (product cards, architecture diagram, O&G section), nav CTA fill, footer background. Near-black with a warm green undertone |
| Charcoal Light | `#30322C` | `--color-charcoal-light` | Secondary dark surface, dark card borders, muted text on dark sections |
| Ink | `#111111` | `--color-ink` | Primary text on all light surfaces. Headings, body on warm stone |
| Graphite | `#6F716A` | `--color-graphite` | Secondary text, muted metadata, captions, placeholder text |
| Paper | `#ffffff` | `--color-paper` | Text on dark surfaces, card surfaces when maximum contrast needed |

## Tokens — Typography

### Inter — Primary typeface for all display and body text. Two weights: 400 (body, secondary headings) and 700 (display headlines, product names, key stats). Hierarchy through size and tracking. · `--font-inter`
- **Weights:** 400, 700
- **Sizes:** 14px, 16px, 18px, 22px, 24px, 36px, 48px, 58px, 75px, 96px
- **Line height:** 1.0–1.4
- **Letter spacing:** -0.03em at 96px, -0.025em at 75px, -0.02em at 58px, -0.01em at 36–48px, -0.005em at 22–24px, normal at 14–18px

### JetBrains Mono — Technical labels, nav items, section counters (01/02), parameter readouts, ticker items, tags, button text. Monospaced precision for operational data. · `--font-mono`
- **Weights:** 400, 500
- **Sizes:** 11px, 13px, 14px
- **Line height:** 1.0–1.3
- **Letter spacing:** 0.04em (uppercase), -0.01em (lowercase)

### Type Scale

| Role | Font | Weight | Size | Line Height | Letter Spacing | Token |
|------|------|--------|------|-------------|----------------|-------|
| caption | JetBrains Mono | 400 | 11px | 1.2 | 0.04em | `--text-caption` |
| label | JetBrains Mono | 500 | 13px | 1.2 | 0.04em | `--text-label` |
| nav | JetBrains Mono | 400 | 14px | 1.0 | -0.01em | `--text-nav` |
| body | Inter | 400 | 18px | 1.5 | normal | `--text-body` |
| body-lg | Inter | 400 | 22px | 1.4 | -0.005em | `--text-body-lg` |
| subheading | Inter | 700 | 24px | 1.2 | -0.005em | `--text-subheading` |
| heading-sm | Inter | 700 | 36px | 1.15 | -0.01em | `--text-heading-sm` |
| heading-lg | Inter | 700 | 48px | 1.1 | -0.015em | `--text-heading-lg` |
| display | Inter | 700 | 58px | 1.05 | -0.02em | `--text-display` |
| display-lg | Inter | 700 | 75px | 1.0 | -0.025em | `--text-display-lg` |
| hero | Inter | 700 | 96px | 1.0 | -0.03em | `--text-hero` |

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 60 | 60px | `--spacing-60` |
| 80 | 80px | `--spacing-80` |
| 100 | 100px | `--spacing-100` |
| 120 | 120px | `--spacing-120` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---------|-------|
| nav | 12px |
| tags/pills | 9999px |
| cards | 16px |
| buttons | 8px |
| large cards/images | 24px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80–120px
- **Card padding:** 40px
- **Element gap:** 8–20px
- **Content max-width:** 720px (for body text blocks)

## Section Color Map

Each section is a full-width horizontal band. Never left/right color splits.

| Section | Background | Text | Cards | Accent |
|---------|-----------|------|-------|--------|
| Nav | warm-stone/blur | ink | — | lichen CTA |
| Hero | warm-stone | ink | charcoal (dashboard) | lichen (accent word) |
| Ticker | lichen (#B8D900) | charcoal | — | — |
| What We Do | warm-stone | ink | card-surface | lichen-dark labels |
| Architecture | warm-stone → charcoal (diagram) | ink → paper | charcoal diagram | lichen connections |
| Oil & Gas | charcoal with formation image bg | paper | charcoal panel | lichen (Heimdal) |
| Platform | warm-stone | ink | charcoal product cards | lichen product names |
| Validation | warm-stone | ink | card-surface | lichen stats |
| Why Amcule | warm-stone | ink | card-surface → charcoal (Amcule card) | lichen |
| Mission | lichen (left) + warm-stone (right) | ink | — | — |
| Team | warm-stone | ink | card-surface | lichen roles |
| Contact | charcoal | paper | warm-stone form | lichen submit |
| Footer | charcoal | graphite/paper | — | lichen |

## Image Usage

Images are the primary visual layer — not decoration. Target 40% of visual area as photographic content.

| Slot | File | Treatment |
|------|------|-----------|
| Hero | hero-rig.jpg | Left 45%, full-height, gradient fade right edge into warm stone |
| O&G background | oilgas-formation.jpg | Full-bleed behind pinned section, dark overlay rgba(20,23,18,0.65) |
| What We Do accent | oilgas-rig-detail.jpg | Right-side partial bleed, 40% width, gradient fade left |
| Architecture diagram | architecture-agents.jpg | Full content-width image inside charcoal container |
| Platform banner | platform-ops-floor.jpg | Full-width banner ~400px, above product cards |
| Validation | validation-field.jpg | Right-side image, rounded corners |
| Section transitions | Images bleed at section edges via gradient masks — bottom of Hero into ticker, bottom of Platform into Validation |

## Components

### Section Label
JetBrains Mono 13px, weight 500, uppercase, letter-spacing 0.04em, color lichen-dark (#4A5A10) on light, lichen (#B8D900) on dark. Preceded by a 40px horizontal hairline in same color.

### Section Counter
Small pill: border 1px card-border, radius 9999px, JetBrains Mono 11px. Content: "01", "02", etc. Positioned top-right of cards.

### Primary CTA Button
Fill charcoal (#20231D), text paper (#fff), radius 8px, JetBrains Mono 14px weight 500, padding 12px 24px. On dark surfaces: fill lichen (#B8D900), text charcoal.

### Ghost Button
Border 1px card-border, transparent fill, text ink, radius 8px, same type. On dark: border charcoal-light.

### Hairline Divider
1px solid card-border on light, charcoal-light on dark. Full content-width. The only structural separator — no decorative lines.

### Content Card
Fill card-surface (#E9E7DE), border 1px card-border (#D8D6CB), radius 16px, padding 40px. No shadow. On charcoal sections: fill charcoal-light (#30322C), border rgba(255,255,255,0.08).

### Product Card (TENETx)
Fill charcoal (#20231D), radius 16px, padding 40px. Product name in lichen (#B8D900), Inter 700 36px. Counter top-right. Body in graphite. Feature list with lichen dot prefixes.

### Team Card
Fill card-surface, radius 16px. Top 60% = photo (object-cover, radius 16px 16px 0 0). Bottom = padding 24px, name Inter 700 24px ink, role JetBrains Mono 13px lichen-dark, bio Inter 400 16px graphite. Lichen top-border accent 3px.

## Motion

All motion respects `prefers-reduced-motion`. GSAP + ScrollTrigger + Lenis.

- **Page load:** hero headline words stagger in (opacity 0→1, y 20→0, 0.1s stagger). Dashboard card fades up (0.6s delay).
- **Section reveals:** elements fade up (opacity 0→1, y 30→0, 0.5s) when scrolling into viewport. Stagger children by 0.08s. One reveal per section, not per element.
- **Counters:** animate from 0 to target value when in view. Duration 1.5s, ease power2.out.
- **Ticker:** continuous CSS translate loop, 30s duration.
- **O&G pinned descent:** ScrollTrigger pin, scrub 1, +=300%. Drill bit tracks down, layers activate, Heimdal glows on arrival. Three-act pacing.
- **Architecture:** SVG connection lines draw on (stroke-dashoffset) when section enters view.
- **No hover animations on cards.** No parallax outside O&G. No floating/bouncing elements.

## Do's and Don'ts

### Do
- Use images as the primary visual element — 40% of viewport area should be photographic
- Maintain 80–120px section gaps — the system breathes
- Use lichen green sparingly — CTAs, status dots, accent words, ticker. Never as large fills except Mission left panel and ticker band
- Keep hairline borders at 1px — never thicker
- Use charcoal cards as deliberate focal anchors against warm stone
- Period-terminate display headlines
- Left-align all content

### Don't
- Do not use pure white (#fff) as any section background — always warm stone (#F3F1E8)
- Do not use box-shadows — depth comes from color contrast and thin borders only
- Do not use gradients on surfaces — only on image masks for bleed effects
- Do not add more than one weight of Inter (400 and 700 are the system)
- Do not make sections that are 100% bare warm stone without either an image or a charcoal element
- Do not use lichen green as body text color
- Do not center-align headlines — always left
- Do not show blank/empty screens — every viewport-height must contain visible content
