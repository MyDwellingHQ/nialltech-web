# Niall Tech brand assets

Vector logo system for **Niall Tech** (legal name: Niall Technologies LLC).

SVG is the source of truth. Do not treat raster exports as master files.

**Final logo approval is still required** before embroidery, vehicle graphics, or paid print runs.

## File guide

| File | Use when |
| --- | --- |
| `niall-tech-logo-horizontal.svg` | Primary lockup: website header/footer exports, proposals, letterhead, email signatures |
| `niall-tech-logo-stacked.svg` | Square or near-square placements: social profile banners, presentation covers |
| `niall-tech-mark.svg` | Symbol only (`currentColor`): favicons, app icons, compact UI, adjacent text already says “Niall Tech” |
| `niall-tech-mark-one-color.svg` | Embroidery, stamps, vinyl cutting, laser engraving |
| `niall-tech-logo-one-color.svg` | Full one-color lockup for print vendors that need a single flat color |
| `niall-tech-mark-reversed.svg` | Light mark on dark photography, navy panels, vehicle graphics on dark paint |

Website UI should prefer the `SiteLogo` component (`src/components/brand/site-logo.tsx`) rather than inlining every SVG variant.

## Clear space

Keep empty space around the logo at least equal to the width of the mark’s left stem (about 1/6 of the mark width) on all sides.

Do not crowd the logo with other marks, certification badges, or dense copy.

## Minimum sizes

| Asset | Minimum size |
| --- | --- |
| Symbol-only mark | 16 × 16 px digital; 8 mm embroidered height |
| Horizontal logo | 120 px wide digital; 25 mm wide print |
| Stacked logo | 64 px wide digital; 18 mm wide print |

If the horizontal wordmark becomes hard to read, switch to mark + accessible text, or stacked.

## Approved colors

Centralized in `src/app/globals.css`:

| Token | Hex | Role |
| --- | --- | --- |
| `--brand-navy` | `#0B1F3A` | Primary dark / default mark |
| `--brand-blue` | `#1D4ED8` | Primary accent (UI, links, CTAs) |
| `--brand-teal` | `#0F766E` | Secondary accent (sparingly) |
| `--brand-reversed` | `#F8FAFC` | Mark on dark backgrounds |
| Neutrals | white / off-white / light gray / charcoal | Backgrounds and type |

The logo must remain legible in pure black or pure white.

## One-color usage

Use `niall-tech-mark-one-color.svg` or `niall-tech-logo-one-color.svg`.

Allowed flat colors:

- Brand navy `#0B1F3A`
- Black `#000000`
- White `#FFFFFF` on dark backgrounds

Do not add gradients, shadows, outlines, or multi-color fills to the primary logo.

## Dark-background usage

Use `niall-tech-mark-reversed.svg`, or render `niall-tech-mark.svg` with a light `currentColor`.

Maintain contrast: light mark on navy/charcoal/dark photography.

## Embroidery and vehicle graphics

- Prefer the one-color mark or one-color horizontal lockup
- Keep shapes solid; do not thin the diagonal or stems
- Avoid placing the mark smaller than the minimum sizes above
- On vehicles, use reversed artwork on dark paint and navy/black on light paint
- Leave clear space from body lines, handles, and other graphics

## Prohibitions

Do not:

- Stretch, squash, or otherwise distort the logo
- Rotate the logo except for specialized vehicle wraps approved case-by-case
- Recolor outside the approved palette
- Add glows, drop shadows, bevels, or gradients to the primary mark
- Place the Niall Tech logo where it could be mistaken for a certification badge
- Combine the logo with unapproved taglines inside the lockup
- Hotlink or scrape brand artwork from third-party sites

## Website preview

Internal comparison page (noindex): `/brand`
