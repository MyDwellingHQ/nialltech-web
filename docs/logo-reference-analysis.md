# Niall Tech Logo — Reference Analysis

_Working document for the `/brand/logo-lab` exploration. These are non-production notes used to guide five candidate directions. Nothing here changes the approved production logo._

## Source of the reference

The intended identity is captured by the supplied **brand board** (primary logo, logo variations,
color palette, typography, applications, icon/app variants, gap & angle explorations, patterns, and
photography) together with the current production mark
(`src/components/brand/BrandLogo.tsx` → `BrandMark`, plus the master SVGs in `public/brand/svg/`).

The mark is a **forward-leaning (italic) geometric "N"** built from parallelogram strokes: a navy left
stem, a navy diagonal running top-left to bottom-right, and an **electric-blue right stem / pillar**
(shown as a blue cap on the right stem in the primary logo and as the full blue pillar in the
horizontal / vehicle treatments). It is paired with an upright `NIALL` (navy, bold) + `TECH` (electric
blue, medium) wordmark and the tagline `MODERN IT. LOCAL EXPERTISE.`

### Confirmed from the board

- **Palette (exact):** `#0B1320` navy, `#146BFF` electric blue, `#22C1FF` cyan, `#475569` slate,
  `#E5E7EB` light grey, `#FFFFFF` white.
- **Typography:** Inter, weights Regular / Medium / Semi Bold / Bold / Extra Bold.
- **Variations:** Primary, Stacked, Horizontal, Icon Only.
- **Gap & angle explorations:** Option A hairline gap, Option B medium gap, Option C chamfered gap —
  reflected here (Candidate A ≈ refined gap, Candidate B ≈ chamfered/integrated).
- **Applications:** building signage, vehicle graphics, business cards, branded merch, stickers — all
  reproduced as CSS/vector mockups in the lab.

> Note on the uploaded artwork: where the reference image contains small, blurry, or AI-generated
> text and micro-detail, that text is intentionally **not** traced or reproduced. Only the geometric
> intent — proportions, color roles, and construction — is carried forward. All master artwork below
> is rebuilt from scratch as clean vector geometry.

## Established brand values (must be preserved)

| Token | Value | Role |
| --- | --- | --- |
| Deep Navy | `#0B1320` | Primary body of the mark and the `NIALL` wordmark |
| Electric Blue | `#146BFF` | The accent pillar and the `TECH` wordmark |
| Cyan Accent | `#22C1FF` | Secondary highlights only — never in the core lockup |
| White | `#FFFFFF` | Reverse / dark-background applications |

## What makes the reference effective

- **Two-color discipline.** Navy + a single electric-blue accent reads as premium enterprise
  technology without novelty gimmicks. It survives one-color reduction cleanly.
- **A recognizable letterform.** The mark is unmistakably an "N", so it works as both a monogram and a
  standalone app/favicon icon.
- **Structural, architectural geometry.** Straight stems and a strong diagonal feel engineered and
  infrastructure-oriented, which matches an IT/cloud/identity consultancy.
- **A clear accent role.** The blue pillar gives the mark a memorable, ownable detail rather than being
  a generic geometric "N".

## What should be preserved

1. Deep Navy + Electric Blue as the only two lockup colors.
2. The "N" letterform and its forward-leaning (italic), architectural posture.
3. The blue accent as a distinct structural element (a pillar, beam, or terminal).
4. Strong, unambiguous silhouette at 16px.
5. `NIALL` (heavier) + `TECH` (lighter, blue) wordmark relationship, based on Inter, with restrained
   tracking — the company name is prioritized over decoration.

## What appears inconsistent or AI-generated in the reference

- Micro-typography and any tagline lettering inside the raster reference is soft/illegible and is not
  reliable as vector source — it is rebuilt, not traced.
- Corner radii, stroke ratios, and the diagonal's optical alignment are inconsistent at different
  sizes in raster form, so proportions are re-derived on a clean grid.
- Any implied gradients, glows, or soft shadows in the raster are dropped; masters use flat fills only.

## Why the master artwork must be rebuilt as clean SVG

- **Fidelity at every size.** Vector geometry stays crisp from a 16px favicon to a vehicle wrap.
- **True one-color / reverse / embroidery output.** Flat, path-based shapes convert to single-ink,
  reversed, and stitch-ready files without artifacts.
- **Editable proportions.** Stroke widths, gaps, and corner treatment can be tuned optically instead of
  being locked into pixels.
- **No embedded raster or base64.** Signage, print, and apparel vendors require real vector paths.

## How each candidate improves on the reference

- **A — Reference refined.** The closest faithful rebuild: re-derived stroke ratio, a cleaner blue cap
  on the right stem, tuned corner radii, and corrected optical balance of the diagonal.
- **B — Integrated blue pillar.** Makes the electric-blue element the full right stem so it reads as a
  structural part of the "N" instead of a separate rectangle stuck on top.
- **C — Negative-space construction.** Encloses the "N" in a navy tile and carves the letterform from
  negative space, with the right stroke in blue — a strong, containerized app-icon silhouette.
- **D — Architectural monogram.** Grid-based, chamfered, sharp-cornered construction with the blue as a
  diagonal beam — the most infrastructure/engineering-forward direction.
- **E — Minimal enterprise mark.** A single monoline "N" with one blue terminal — the fewest possible
  elements while staying legible as both an "N" and a proprietary tech mark.

## Constraints applied to all candidates

- Real SVG vector artwork (paths/shapes only). No raster, base64, canvas masters, complex filters, or
  gradients.
- Two-color core (navy + electric blue) with mono, reversed, light, and dark outputs.
- Legible at 16px; safe clear space; upright orientation.
- Wordmark based on Inter with restrained tracking; no decorative lines around `TECH` unless they
  clearly help (they were not judged to help, so they are omitted).
