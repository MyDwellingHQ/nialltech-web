# Niall Tech Business Card (VistaPrint)

Production business-card artwork for standard US cards via VistaPrint.

## Source of truth

Editable SVG sources (do not hand-edit binary PDFs):

| File | Role |
|------|------|
| `source/front.svg` | Card front |
| `source/back-final.svg` | Approved/recommended back (Variant A) |
| `source/back-variant-a.svg` | Concept A — centered logo + QR + CTA |
| `source/back-variant-b.svg` | Concept B — corner mark + QR primary |
| `source/back-variant-c.svg` | Concept C — split logo / QR |

Logo geometry is embedded from `public/brand/svg/` masters. Do **not** recreate or alter the N mark (including the intentional gap in the left side of the N).

Contact data comes from `src/data/brand-contact.mjs` — never duplicate phone/email elsewhere.

## Recommended back

**Variant A** — centered stacked wordmark, large scannable QR, and a quiet “Scan to connect” label. It balances brand recognition with whitespace and scan reliability without repeating contact details.

Variants A–C remain under `concepts/` until final approval.

## Print specifications

| Spec | Value |
|------|-------|
| Finished / trim | 3.5" × 2" |
| Bleed | 0.125" each side |
| Full artwork (upload size) | 3.75" × 2.25" |
| Safe zone | ≥ 0.125" inside trim |
| Design DPI | 300 |
| PDF page size | 270 × 162 pt |
| QR printed size | ~0.85" square (min 0.75") |
| QR destination | `https://nialltech.com/connect` |
| QR quiet zone | 4 modules (included in QR asset) |
| Error correction | M |

Guide colors on the preview sheet: amber = bleed, red = trim, green = safe.

## VistaPrint upload files

Upload these print-ready PDFs (full bleed included):

1. **Front:** `exports/niall-tech-business-card-front.pdf`
2. **Back:** `exports/niall-tech-business-card-back.pdf`

Identical copies are synced to `public/brand/collateral/business-card-front.pdf` and `business-card-back.pdf` for the brand hub.

## QR code

- Standalone vector: `qr/niall-tech-connect-qr.svg`
- PNG fallback (1024px): `qr/niall-tech-connect-qr.png`
- Encoded value (exact): `https://nialltech.com/connect`
- Dark navy modules on white; no logo inside the code; no distortion

Validate:

```bash
npm run branding:validate
```

## Digital card + vCard

- Page: `https://nialltech.com/connect` (`src/app/connect/page.tsx`)
- vCard: `public/contact/paul-dent.vcf`

## Regenerate exports

```bash
npm run branding:build      # cards + QR + vCard + preview
npm run branding:validate   # dimensions, QR decode, vCard, files
```

`npm run brand:collateral` also regenerates these cards (via the shared builder) along with other stationery.

PDFs are produced from SVG → high-DPI PNG (fonts via Inter TTFs in `scripts/fonts/`) → `pdf-lib` page sized to 3.75" × 2.25". Do not rename `.svg` to `.pdf`.

## Actual-size print test

1. Open `preview/business-card-preview.pdf`
2. Print at **100% / actual size** (disable “fit to page”)
3. Confirm trim measures 3.5" × 2" after accounting for bleed marks
4. Scan the QR from the printed sheet with a phone camera
5. Confirm Save Contact on `/connect` installs the vCard on iPhone and Android

A physical 100%-scale print test is still required before placing a VistaPrint order.

## Do not manually edit

- `exports/*.pdf` / `exports/*.png`
- `public/brand/collateral/business-card-*.pdf` (generated)
- `qr/*.png` (generated)
- Binary previews

Edit via `scripts/build-business-card.mjs` + `src/data/brand-contact.mjs`, then regenerate.
