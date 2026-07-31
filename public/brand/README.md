# Niall Tech Brand Assets

Official logo files, raster exports, favicons, social covers, and print masters for Niall Tech.

## Master logo

- **Production master icon:** `svg/niall-tech-icon.svg`
- **Geometry:** the approved folded-beam **N**, defined once in `src/brand/niall-mark-geometry.mjs` and mapped into every asset

The mark is a bold folded-beam capital **N**:
- Deep Navy main beam (upper-left → lower-right)
- Deep Navy lower-left pillar
- Electric Blue tall right pillar
- Flat color only — no gradients, shadows, or filters

## Color values

| Name | HEX | RGB |
|------|-----|-----|
| Deep Navy | `#0B1320` | 11, 19, 32 |
| Electric Blue | `#146BFF` | 20, 107, 255 |
| Cyan Accent | `#22C1FF` | 34, 193, 255 |
| Slate | `#475569` | 71, 85, 105 |
| Light Gray | `#E5E7EB` | 229, 231, 235 |
| White | `#FFFFFF` | 255, 255, 255 |

See also `brand-colors.txt`.

## Typography

- **Typeface:** Inter
- **NIALL:** Bold / Semibold, uppercase, generous tracking, Deep Navy or White
- **TECH:** Medium / Semibold, uppercase, wider tracking, Electric Blue (or White/Black in mono)
- **Tagline:** MODERN IT. LOCAL EXPERTISE.

Site UI may continue to use Plus Jakarta Sans / Manrope; Inter is required for brand lockups.

## File locations

```
public/brand/
  svg/           Vector logo masters
  png/           Transparent PNG exports
  favicon/       Favicon + PWA icons + site.webmanifest
  social/        Avatars, cover images, and profile banners
  collateral/    Business cards, letterhead, invoice, proposal/SOW covers
  email/         HTML email signatures (responsive + Outlook-safe)
  office/        PowerPoint + Word templates
  print/         PDF + SVG print masters
  README.md
  brand-colors.txt
  asset-index.json
  niall-tech-brand-assets.zip
```

## Intended usage

| Asset | Use |
|-------|-----|
| Horizontal | Primary digital lockup (headers, docs) |
| Stacked | Square / centered placements |
| Icon | Favicon, app icon, avatar, sparse UI |
| Wordmark | Text-only contexts when icon is already present |
| One-color | Fax, engraving, single-ink print |
| Vehicle decal | High-contrast vehicle / signage wrap |
| Embroidery | Simplified stitch-friendly mark |

### Minimum sizes

- Icon digital: **16px** (recognizable), preferred **24px+**
- Icon print: **8mm**
- Horizontal digital: **120px** wide
- Clear space: ≥ **0.5× icon width** on all sides

### Backgrounds

- **Dark logo** (`*-dark` / default color): light backgrounds
- **Light / reverse** (`*-light` / `*-white`): dark backgrounds
- Maintain contrast — do not place navy on dark charcoal or white on pale gray

## Regenerating assets

From the repo root:

```bash
npm run brand:build
```

This runs `scripts/build-brand-assets.mjs`, which:

1. Regenerates SVG masters from `scripts/logo-geometry.mjs`
2. Rasterizes PNGs via `@resvg/resvg-js` (Inter fonts in `scripts/fonts/`)
3. Builds favicons (including `.ico`)
4. Builds RGB + one-color PDFs via `pdf-lib`
5. Writes `asset-index.json`, `brand-colors.txt`, and the ZIP package

Required Inter TTF files are downloaded automatically into `scripts/fonts/` if missing.

## ZIP package

`niall-tech-brand-assets.zip` includes SVG, PNG, favicon, social, print assets, this README, `brand-colors.txt`, and `asset-index.json`.

## AI / EPS limitations

This toolchain does **not** produce native Adobe Illustrator (`.ai`) or Encapsulated PostScript (`.eps`) files.

Use the SVG masters and PDF print files as the source of truth for design tools. Open the SVG in Illustrator/Affinity/Figma and save AI/EPS from there if a vendor requires those formats. Do not rename SVG/PDF to `.ai` or `.eps`.

## License

© Niall Tech. Brand assets may be used by authorized partners for approved communications. Do not modify the mark, proportions, or colors outside this guide.
