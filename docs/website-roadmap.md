# Niall Tech Website Roadmap

**Based on:** `docs/site-audit.md`, `docs/design-system.md`  
**Goal:** Premium Microsoft-focused IT consulting site for business owners  
**Comparables:** Microsoft, Cloudflare, Vercel, Stripe, Linear, Ramp

---

## Implementation principles

1. Plan first (this doc + audit + design system) — then ship page by page.  
2. Reusable sections over one-off layouts.  
3. Align UI to brand tokens before visual flourishes.  
4. Logical git commits; do not sacrifice code quality.  
5. Effort is described by **scope & risk**, not calendar estimates.

---

## Quick wins

*Low scope · High leverage · Ship first*

| Item | Impact | Scope |
|------|--------|-------|
| Align CSS primary to `#146BFF` / navy `#0B1320` | Instant brand cohesion | Tokens in `globals.css` |
| Theme-aware `BrandMark` | Dark-mode contrast fix | Header/footer logo |
| Rewrite home + services + about + contact copy for business owners | Clearer positioning | Content modules |
| Remove contact-form “demo” disclaimer; prepare real submit path | Trust | `ContactForm` + API stub or Formspree/Resend pattern |
| Hide stub footer items (Blog/KB/Status/Portal/Login) until live | Honest IA | `Footer` / `site.ts` |
| Link LinkedIn (and GitHub if public) in footer | Trust | Footer |
| Fix `AnimateIn` for `prefers-reduced-motion` + no opacity-0 without JS | A11y | One component |
| Deduplicate brand page primary-logo section | Clarity | `/brand` |
| Add Services grouping + dropdown / panel in header | 2-click service access | Nav + content |

---

## Medium improvements

*Moderate scope · Structural quality*

| Item | Impact | Scope |
|------|--------|-------|
| Extract reusable sections (`Hero`, `TrustBar`, `ServiceGrid`, `Benefits`, `Process`, `FAQ`, `CTABand`, `Stats`, `ContactBlock`) | Consistency, less duplication | New `components/sections` |
| Refactor home/services/about/contact onto sections | Maintainability | Page rewrites |
| Service categories (Cloud & Productivity, Identity & Security, Infrastructure & Resilience, Strategy) | Scanability | Content + UI |
| Trust bar + stats (honest, or remove unsourced numbers) | Credibility | Home |
| FAQ section with FAQ schema | SEO + conversion | Home/contact |
| Expand `/brand` collateral: Business Cards, Email Signatures, Letterhead, Vehicle, Apparel, Proposal, PowerPoint, Word, Downloads | Partner enablement | Brand page + assets |
| Unique Twitter/OG per key page; Service JSON-LD | SEO | Metadata + JsonLd |
| Mobile menu focus trap + Escape | A11y | Header |
| Legal prose styles; interim counsel-ready language (non-placeholder tone) | Trust | Privacy/terms |

---

## Future enhancements

*Larger scope · After foundation*

| Item | Impact | Scope |
|------|--------|-------|
| `/services/[slug]` detail pages | SEO depth + conversion | New routes + templates |
| Real photography / case studies | Premium feel | Content production |
| Testimonials with attribution | Trust | Content + section |
| Working backend for contact (Resend/SES) + spam protection | Conversion | API route |
| Blog / KB when editorial capacity exists | Demand gen | CMS or MDX |
| Client portal (real auth) | Retention | Product work |
| Proposal / PPTX / DOCX generated masters | Sales enablement | Automation |
| Native AI/EPS via design handoff | Print vendors | Out of web toolchain |

---

## Performance improvements

| Action | Why |
|--------|-----|
| Reduce `AnimateIn` usage; prefer CSS | Less client JS |
| Keep brand SVGs for logos/icons | Crisp, tiny |
| Lazy-load raster previews on `/brand` | Already partially done |
| Avoid new heavy client libraries | Bundle discipline |
| Dynamic OG already server-generated — keep | No client cost |
| Audit lucide imports (tree-shake per-icon) | Bundle |

**Success metrics:** Lighthouse Performance ≥ 90 mobile on home; JS payload does not grow with decorative motion.

---

## SEO improvements

| Action | Why |
|--------|-----|
| Outcome-led titles/descriptions per page | CTR + clarity |
| Service + FAQ + Breadcrumb JSON-LD | Rich results |
| Canonicals retained; sitemap includes `/brand` | Coverage |
| Remove placeholder phone from JSON-LD until real | Trust / accuracy |
| Service detail URLs (future) | Long-tail Microsoft queries |
| Internal links from home → service groups → contact | Crawl paths |

---

## Accessibility improvements

| Action | Why |
|--------|-----|
| Reduced-motion support in JS animations | Vestibular safety |
| Focus trap + Escape on mobile nav | Keyboard users |
| Theme-aware logo contrast | Dark mode AA |
| Semantic landmarks retained; one H1 | Structure |
| Visible focus on all interactive elements | Keyboard |
| Download buttons with accessible names | Brand page |
| Color copy buttons announce success | Live regions |

---

## Brand collateral rollout (from partner list)

| Section | Near-term deliverable | Later |
|---------|----------------------|-------|
| Brand Assets | Existing logos + ZIP | — |
| Business Cards | SVG/PDF templates (front/back) | Print vendor pack |
| Email Signatures | HTML snippet + PNG lockup guidance | Outlook add-in |
| Letterhead | SVG/PDF | Word header |
| Vehicle Graphics | Existing decal masters surfaced | Size variants |
| Apparel | Embroidery mark + placement guide | Mockups |
| Proposal Templates | Cover SVG + structure guide | DOCX |
| PowerPoint | Title slide SVG | PPTX master |
| Word | Header/footer SVG patterns | DOTX |
| Downloads | Complete ZIP + category zips | Automated `brand:build` |

---

## Suggested implementation order

### Phase A — Foundation (this PR)

1. Docs (`site-audit`, `design-system`, `website-roadmap`)  
2. Design tokens + theme-aware logo  
3. Content rewrite modules  
4. Reusable sections  
5. Nav improvement (services access)  
6. Home / Services / About / Contact refactor  
7. SEO + a11y + performance fixes  
8. Brand portal collateral sections + generated templates  

### Phase B — Depth (follow-up)

1. Service detail pages  
2. Real contact API  
3. Testimonials / cases  
4. Legal counsel pass  
5. Blog/KB when ready  

---

## Business impact

| Investment area | Business effect |
|-----------------|-----------------|
| Outcome-led copy + clear CTAs | Higher qualified consult requests |
| Working contact + honest contact data | Fewer abandoned leads |
| Service IA (2-click access) | Faster path from problem → service → conversation |
| Brand portal collateral | Sales/partner consistency; less ad-hoc logo misuse |
| Proof & local story | Higher trust vs generic MSPs |
| A11y + performance | Broader reach; professional credibility |

---

## Effort framing (technical)

| Band | Meaning |
|------|---------|
| **S** | Token/copy/component tweak; localized files |
| **M** | New section primitives + multi-page refactor |
| **L** | New routes, backend, CMS, or asset pipelines |

Phase A is primarily **S–M**. Phase B includes **L** items (detail pages, API, content production).

---

## Definition of done (Phase A)

- [x] Audit, design system, and roadmap published under `/docs`  
- [x] UI tokens match brand palette  
- [x] Copy rewritten for business owners on core pages  
- [x] Reusable sections used by home + core pages  
- [x] Major services reachable within two clicks  
- [x] SEO metadata + schema improved without breaking existing setup  
- [x] Reduced-motion and keyboard nav improved  
- [x] Brand page exposes collateral categories + downloads  
- [x] `npm run lint` and `npm run build` pass  
