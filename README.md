# Niall Tech Website

Marketing website for **Niall Tech** (legal name: **Niall Technologies LLC**)—founder-led IT consulting in Bremerton and Kitsap County covering Microsoft cloud, cybersecurity, infrastructure, project services, and practical managed IT support.

## Stack

- [Next.js](https://nextjs.org/) App Router
- TypeScript
- Tailwind CSS v4
- `next-themes` (dark / light mode)
- `lucide-react` icons

## Features

- Responsive pages: Home, Services, About, Contact, Privacy, Terms
- Vector logo system and reusable `SiteLogo` component
- Internal brand review route at `/brand` (noindex)
- Founder photo presentation (Paul Dent) with graceful placeholder
- Sticky navigation + mobile menu
- Dark / light theme toggle
- SEO metadata, Open Graph image, JSON-LD, sitemap, robots.txt
- Future-ready routes for Blog, Knowledge Base, Status, Portal, and Login

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript (`tsc --noEmit`) |

## Environment

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://nialltech.com
```

Defaults to `https://nialltech.com` for metadata, sitemap, and robots.

## Brand assets

### Logo file locations

```text
public/brand/
  niall-tech-mark.svg              # Symbol only (currentColor)
  niall-tech-logo-horizontal.svg   # Primary lockup
  niall-tech-logo-stacked.svg      # Square / social layouts
  niall-tech-mark-one-color.svg    # Embroidery / vinyl
  niall-tech-logo-one-color.svg    # Full one-color lockup
  niall-tech-mark-reversed.svg     # Light mark for dark backgrounds
  README.md                        # Usage rules and clear-space guidance
public/icon.svg                    # Favicon / app icon foundation
src/app/icon.svg                   # Next.js metadata icon
```

SVG remains the source of truth. Do not commit generated high-resolution PNGs unless a specific runtime page requires them.

**Final logo approval is still required** before embroidery, vehicle graphics, or paid print production.

### Logo component usage

```tsx
import { SiteLogo } from "@/components/brand/site-logo";

<SiteLogo variant="horizontal" size={36} />
<SiteLogo variant="mark" size={32} decorative />
<SiteLogo variant="stacked" theme="reversed" size={48} />
```

Props:

- `variant`: `horizontal` | `stacked` | `mark`
- `theme`: `default` | `reversed` | `monochrome`
- `size`, `className`, `priority`, `decorative`, `showWordmark`

The mark is inline SVG (`currentColor`). The wordmark uses the site display font (Manrope) for licensing-safe rendering. Standalone SVG lockups in `public/brand/` use system sans text for portable exports.

### How to replace or refine the mark

1. Edit geometry in `public/brand/niall-tech-mark.svg`
2. Mirror the same paths in:
   - other files under `public/brand/`
   - `public/icon.svg` and `src/app/icon.svg`
   - `src/components/brand/niall-tech-mark-icon.tsx`
   - `src/app/opengraph-image.tsx`
3. Review `/brand` at multiple sizes before approving

### How to update brand colors

Edit the CSS variables in `src/app/globals.css`:

- `--brand-navy`
- `--brand-blue`
- `--brand-teal`
- `--brand-reversed`

Also update matching hex values in one-color / reversed SVG files and `src/lib/brand.ts` when exporting static artwork.

### Exporting SVG for printing

Open the appropriate file from `public/brand/` in a vector editor (Inkscape, Illustrator, Figma) and export PDF/EPS/SVG as required by the vendor. Keep shapes as vectors—do not rasterize the master.

### Creating transparent PNG exports (when a vendor requires raster)

Example with Inkscape or resvg:

```bash
# Example: 2048px-wide transparent PNG from the horizontal lockup
inkscape public/brand/niall-tech-logo-horizontal.svg \
  --export-type=png \
  --export-filename=niall-tech-logo-horizontal.png \
  --export-width=2048
```

Do not commit those PNGs unless the website itself needs them.

### Brand-review route

- URL: `/brand`
- Not in primary navigation
- Metadata: `noindex, nofollow`
- Also disallowed in `robots.txt`

## Founder photo

Approved LinkedIn headshot location:

```text
public/images/paul-dent.jpg
```

Alt text:

`Paul Dent, founder of Niall Tech`

Displayed on About (primary), Home (founder section), and Contact (compact).

If the file is missing, the UI shows a polished placeholder and the site still builds.

### Important

- Do **not** hotlink LinkedIn
- Do **not** scrape a compressed LinkedIn thumbnail
- Do **not** use a stock photograph as a substitute
- Save the approved full-resolution headshot locally as `public/images/paul-dent.jpg`

## Certification badges

Preserve accurate certification presentation. Do not place the Niall Tech logo where it could be mistaken for a certification badge.

Do not invent badge images, verification links, credential IDs, issue dates, expiration dates, or active-status claims. Add official badge artwork only when authorized files are available.

## Deploy on Vercel

1. Import this repository in Vercel
2. Framework preset: **Next.js** (auto-detected)
3. Build command: `next build`
4. Output: Next.js defaults

## Project structure

```text
src/
  app/                 # Routes, metadata, sitemap, robots, /brand
  components/
    brand/             # SiteLogo, mark icon, founder photo
    contact/           # Contact form
    home/              # Homepage sections
    layout/            # Header, footer, theme
    shared/            # Cross-page components
    ui/                # Reusable primitives
  content/             # Services and company copy
  lib/                 # Site config, brand helpers, utilities
public/
  brand/               # Vector logo system
  images/              # Founder photo and other raster assets
  icon.svg             # App / favicon mark
```

## Placeholder content

Business phone and similar contact details may still be placeholders until production values are confirmed. Do not publish personal résumé contact information.
