# Niall Tech Design System

Companion to the brand kit in `public/brand/`. This document governs **website UI** — marketing pages, app chrome, and reusable sections.

**References:** Cloudflare, Vercel, Stripe, Linear, Ramp — clarity, restraint, strong type, purposeful motion.  
**Avoid:** MSP template card grids, purple glow SaaS clichés, “computer repair” aesthetics.

---

## 1. Brand colors (source of truth)

| Name | HEX | RGB | Role |
|------|-----|-----|------|
| Deep Navy | `#0B1320` | 11, 19, 32 | Primary brand dark, hero fields, reverse surfaces |
| Electric Blue | `#146BFF` | 20, 107, 255 | Primary interactive / accent / TECH wordmark |
| Cyan Accent | `#22C1FF` | 34, 193, 255 | Secondary highlight, sparse motion accents |
| Slate | `#475569` | 71, 85, 105 | Secondary text on light |
| Light Gray | `#E5E7EB` | 229, 231, 235 | Borders, subtle structure |
| White | `#FFFFFF` | 255, 255, 255 | Light surfaces, reverse logos |

### Semantic CSS tokens (target)

```css
:root {
  --background: #f7f9fc;
  --foreground: #0b1320;
  --muted: #475569;
  --primary: #146bff;
  --primary-foreground: #ffffff;
  --primary-soft: color-mix(in srgb, #146bff 14%, white);
  --accent: #22c1ff;
  --border: #e5e7eb;
  --surface: #ffffff;
  --hero-from: #0b1320;
  --hero-via: #0e1a2e;
  --hero-to: #102a56;
  --ring: #146bff;
}
```

Do **not** use Tailwind default blue (`#1d4ed8` / `#3b82f6`) as primary.

---

## 2. Dark mode rules

| Surface | Light | Dark |
|---------|-------|------|
| Background | `#F7F9FC` | `#070B14` |
| Surface / card | `#FFFFFF` | `#0B1220` |
| Foreground | `#0B1320` | `#E8EEF9` |
| Muted | `#475569` | `#94A3B8` |
| Primary | `#146BFF` | `#4B8BFF` (slightly lifted for contrast) |
| Border | `#E5E7EB` | `#1E293B` |

**Rules**

1. Logos: use dark lockups on light; light/reverse lockups on dark. Theme-aware `BrandMark`.
2. Never place navy logo on charcoal or white logo on pale gray.
3. Prefer navy hero fields over pure black.
4. Cyan is accent only — never primary CTAs in dark mode.
5. Maintain WCAG AA for text (≥ 4.5:1 body, ≥ 3:1 large).

---

## 3. Typography

### Families

| Role | Family | Where |
|------|--------|-------|
| Brand / lockups | **Inter** | Logos, brand page, formal collateral |
| UI sans | **Plus Jakarta Sans** | Body, UI, forms |
| Display | **Manrope** | Section titles, marketing headlines |

### Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display-xl` | clamp(2.75rem, 5vw, 4.5rem) | 600 | Home brand / hero brand |
| `display-lg` | clamp(2.25rem, 4vw, 3.5rem) | 600 | Page H1 |
| `display-md` | 1.875–2.25rem | 600 | Section H2 |
| `title` | 1.25–1.5rem | 600 | Card / subsection H3 |
| `body-lg` | 1.125rem | 400–500 | Supporting hero / intros |
| `body` | 1rem | 400 | Default |
| `body-sm` | 0.875rem | 400 | Meta, captions |
| `label` | 0.75–0.875rem | 600 | Eyebrows, uppercase tracking |

### Rules

- One H1 per page.
- Eyebrows: uppercase, tracking `0.16–0.18em`, primary or muted — never compete with brand.
- Wordmark tracking: NIALL generous; TECH wider (see brand README).
- Prefer sentence case for UI; title case sparingly.
- Line length: ~45–75ch for reading blocks.

---

## 4. Spacing scale

Base unit: **4px**.

| Token | Value | Use |
|-------|------:|-----|
| `space-1` | 4px | Icon gaps |
| `space-2` | 8px | Compact stacks |
| `space-3` | 12px | Inline clusters |
| `space-4` | 16px | Default component padding |
| `space-5` | 20px | Card padding (compact) |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Group gaps |
| `space-10` | 40px | Block gaps |
| `space-12` | 48px | Section internal |
| `space-16` | 64px | Section padding (mobile) |
| `space-20` | 80px | Section padding (desktop) |
| `space-24` | 96px | Large section / hero breathing |

**Section spacing:** `py-16` mobile → `py-20`/`py-24` desktop. Prefer one consistent section component.

---

## 5. Grid system

| Breakpoint | Width | Columns | Gutter | Margin |
|------------|------:|--------:|-------:|-------:|
| default | <640 | 4 | 16 | 20 |
| `sm` | ≥640 | 6 | 16 | 24 |
| `md` | ≥768 | 8 | 24 | 24 |
| `lg` | ≥1024 | 12 | 24 | 32 |
| `xl` | ≥1280 | 12 | 24 | 32 |

**Container:** `max-w-6xl` (≈72rem) for content; optional `max-w-7xl` for full-bleed marketing bands.  
**Alignment:** 12-col mental model; prefer `grid` with `gap-5`/`gap-8` over nested cards.

---

## 6. Buttons

| Variant | Use |
|---------|-----|
| `primary` | Main conversion (Electric Blue fill, white text) |
| `secondary` | On dark heroes only (glass / white ring) |
| `outline` | Secondary on light surfaces |
| `ghost` | Tertiary / toolbar |

**Sizes:** `sm` h-9 · `md` h-11 · `lg` h-12  
**Radius:** `rounded-xl` (12px)  
**Focus:** 2px ring in `--ring`, offset 2px against background  
**Never** use `secondary` on light backgrounds (white text fails).

---

## 7. Cards

**Default: no cards** for marketing storytelling. Cards are allowed when they:

1. Contain a user interaction (download, form field group), or  
2. Group dense comparable items (service outcomes) where removing the container hurts scanability.

**If used**

- Border `1px` `--border`, radius `1rem–1.25rem`
- Soft shadow optional; never multi-layer glow stacks
- Prefer border-only on dark mode
- Hover: subtle border/background shift — not lift theater

---

## 8. Section anatomy

Every marketing section should have **one job**:

1. Optional eyebrow  
2. One headline  
3. One short supporting sentence  
4. One primary content block  
5. Optional single CTA  

Reuse `Section` + specialized blocks (`Hero`, `TrustBar`, `ServiceGrid`, `FAQ`, `CTA`, etc.). Avoid one-off page layouts that re-implement the same header stack.

---

## 9. Icon usage

- Library: **lucide-react** (current) — 1.5–2px stroke feel.
- Color: Electric Blue or muted; never rainbow icon rows.
- Size: 20–24px inline; 28–32px in feature spots.
- Always `aria-hidden` when decorative; provide text label nearby.
- Do **not** invent custom “tech” clipart (clouds, shields as logo substitutes). Brand mark is the N only.

---

## 10. Illustration guidance

- Prefer **geometric, flat** compositions aligned to the N mark.
- Diagonal light-streak / navy grid from brand board for digital textures.
- No 3D isometric MSP clipart.
- SVG over raster for UI chrome.

---

## 11. Photography direction

When photography is introduced:

- Real workplaces, real people, calm confidence — not stock “headset smile.”
- Cool-neutral grading; Deep Navy overlays OK for heroes.
- Full-bleed heroes preferred on promotional surfaces; avoid inset rounded media cards in the first viewport.
- Alt text describes content, not “image of…”.

Until real photography exists, use brand atmosphere (navy field + geometry) rather than fake stock.

---

## 12. Motion guidelines

| Motion | Duration | Easing | Use |
|--------|----------|--------|-----|
| Fade / fade-up | 400–700ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Section entrance (sparingly) |
| Hover | 150–200ms | ease | Buttons, links |
| Float | Optional, slow | ease-in-out | One hero accent max |

**Rules**

1. Ship 2–3 intentional motions per visually led page — not every card.
2. Respect `prefers-reduced-motion: reduce` (no opacity-0 traps).
3. Prefer CSS animations over client IntersectionObserver when possible.
4. Motion creates hierarchy, not decoration noise.

---

## 13. Color usage (UI)

- **Primary CTAs:** Electric Blue only.  
- **Hero fields:** Deep Navy gradients (brand stops).  
- **Text:** Navy/near-navy on light; off-white on dark.  
- **Cyan:** sparse highlights, never body text.  
- **Success:** keep green for form success only.  
- Avoid purple, terracotta/cream newspaper looks, glow stacks.

---

## 14. Responsive breakpoints

Align with Tailwind defaults:

| Name | Min width |
|------|----------:|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Mobile rules**

- Sticky header ≤ 64–68px.  
- Primary CTA reachable without horizontal scroll.  
- Hero must work as a single composition without the desktop decorative panel.  
- Collapse nav to accessible disclosure (focus trap + Escape).

---

## 15. Component inventory (target)

### Primitives (`components/ui`)

`Container`, `Section`, `Button`, `Card` (interaction-only)

### Sections (`components/sections`)

`Hero`, `TrustBar`, `LogoCloud`, `ServiceGrid`, `Benefits`, `Process`, `FAQ`, `CTABand`, `Testimonials`, `Stats`, `ContactBlock`, `PageIntro`

### Brand (`components/brand`)

`BrandLogo`, `BrandMark`, asset cards / swatches (existing)

### Shared

`JsonLd`, theme, header/footer

---

## 16. Content tone (UI microcopy)

- Write for **business owners**.  
- Outcomes: uptime, risk, productivity, cost clarity.  
- Plain English; Microsoft product names only when they help the buyer.  
- No “tech support,” “we fix computers,” or filler (“synergy,” “best-in-class”).

---

## 17. Brand collateral (portal)

`/brand` should organize downloads into:

| Category | Deliverables |
|----------|--------------|
| Brand Assets | Logos, colors, ZIP |
| Business Cards | Print-ready SVG/PDF templates |
| Email Signatures | HTML + PNG guidance |
| Letterhead | Print SVG/PDF |
| Vehicle Graphics | Decal masters |
| Apparel | Embroidery / print marks |
| Proposal Templates | Cover + doc patterns |
| PowerPoint | Title slide guidance / SVG masters |
| Word | Letter / proposal header patterns |
| Downloads | Complete package ZIP |

Visual language for collateral matches logo geometry, Inter type, and the palette above.
