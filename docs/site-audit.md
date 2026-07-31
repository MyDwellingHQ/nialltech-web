# Niall Tech Website Audit

**Date:** 2026-07-31  
**Scope:** Full UX, UI, content, SEO, accessibility, and performance review  
**Stack:** Next.js 16 (App Router), Tailwind CSS v4, next-themes  
**Brand foundation:** Merged (`public/brand/`, `/brand`)

---

## Executive summary

The site is a **polished consulting skeleton**: coherent layout primitives, solid SEO plumbing, and a mature brand kit. It does **not** yet feel like a premium Microsoft-focused firm comparable to Cloudflare / Vercel / Stripe / Linear.

**Overall marketing readiness: 5.5 / 10**

| Strength | Gap |
|----------|-----|
| Brand-forward home hero | Weak proof (no clients, testimonials, local story) |
| Complete service catalog | Flat IA — no service groups or detail pages |
| Strong `/brand` portal | Contact form is a demo; phone is a 555 placeholder |
| Metadata + JSON-LD + sitemap | UI colors diverge from brand Electric Blue |
| Clean server-first pages | Card-heavy layouts read like MSP templates |

**Target positioning:** Premium Microsoft-focused IT consulting for business owners — outcomes, risk reduction, productivity, security, reliability. Not “tech support” or local computer repair.

---

## Scoring rubric

| Score | Meaning |
|------:|---------|
| 9–10 | Production-ready, competitive with top SaaS/consulting sites |
| 7–8 | Strong structure; polish and proof needed |
| 5–6 | Usable but thin, generic, or conversion-weak |
| 3–4 | Placeholder / blocked conversion |
| 1–2 | Broken or harmful |

---

## Page scores

| Route | Page | Score | Verdict |
|-------|------|------:|---------|
| `/` | Home | **7** | Strong skeleton; proof and copy need lift |
| `/services` | Services | **6.5** | Complete catalog; flat and product-led |
| `/about` | About | **5.5** | Anonymous; misses “local expertise” |
| `/contact` | Contact | **4** | Layout OK; form is non-functional |
| `/brand` | Brand Assets | **8** | Mature; expand collateral + trim duplication |
| `/privacy` | Privacy | **4** | Explicitly placeholder |
| `/terms` | Terms | **4** | Explicitly placeholder |
| `/blog` | Blog | **3** | Stub (noindex) |
| `/knowledge-base` | Knowledge Base | **3** | Stub (noindex) |
| `/status` | Status | **3** | Stub (noindex) |
| `/portal` | Client Portal | **3** | Stub (disallowed) |
| `/login` | Client Login | **3** | Stub (disallowed) |
| `*` | 404 | **7** | Clear and usable |

---

## Page-by-page findings

### Home `/` — 7/10

**Purpose:** Acquisition landing.  
**Sections:** Hero → featured services → why us → certifications → tech pills → workflow → contact CTA.

| Area | Assessment |
|------|------------|
| Hierarchy | Brand-first hero works. Below-fold is repetitive card stacks. |
| Spacing | Consistent `py-20/24`; dense after fold. |
| Typography | Display + body hierarchy clear; three competing taglines across site. |
| Copy | Competent consultant-speak; light on business-owner outcomes. |
| Trust | Cert names without logos; no testimonials, logos, geography, or people. |
| Conversion | CTAs clear; phone in CTA is `+1 (555) 014-2200`. |
| Mobile | Hero loses decorative panel below `lg` — atmosphere flattens. |
| A11y | `AnimateIn` starts at opacity 0; ignores `prefers-reduced-motion`. |
| SEO | Strong root metadata + OG image + JSON-LD. |

### Services `/services` — 6.5/10

**Purpose:** Full catalog (13 services).  
**Issues:** No grouping (Cloud / Security / Infrastructure / Strategy). No `/services/[slug]` pages. Titles are product-led (M365, Entra) rather than business outcomes. Featured flag unused on page. Long vertical card fatigue on mobile.

### About `/about` — 5.5/10

**Issues:** No founder, team, location, or “local” story despite brand tagline. Stats (15+, 120+, 96%) unsourced. Social URLs in config unused in UI.

### Contact `/contact` — 4/10

**Critical:** Form uses fake `setTimeout` submit and advertises itself as a demonstration. Placeholder phone. No calendar booking. Interest select doesn’t cover all services.

### Brand `/brand` — 8/10

**Strengths:** Best content page; structured downloads; usage guidance.  
**Gaps:** Primary logos shown twice (showcase + grid). Missing collateral categories requested for partners:

- Business Cards  
- Email Signatures  
- Letterhead  
- Vehicle Graphics  
- Apparel  
- Proposal Templates  
- PowerPoint  
- Word  
- Downloads (package)

### Privacy / Terms — 4/10

Self-labeled placeholders. `prose-niall` class referenced but undefined.

### Stubs (Blog, KB, Status, Portal, Login) — 3/10

Honest “coming soon,” correctly noindexed / disallowed. Footer shows them as “Soon” text that looks like nav — confusing. Prefer hiding until real.

### 404 — 7/10

Clear recovery paths to Home and Services.

---

## Cross-cutting evaluation

### Hierarchy & spacing

- Section rhythm is consistent but monotonous.
- Default visual unit is a bordered rounded card — reads template-like.
- Interior pages use identical `PageHeader` glow; little page-specific identity.

### Typography

- UI: Plus Jakarta Sans + Manrope (acceptable for product UI).
- Brand lockups: Inter (correct).
- Need clearer type scale documentation and restrained tracking on body copy.

### Navigation

| Destination | Within 2 clicks? |
|-------------|------------------|
| Services list | Yes (1) |
| Specific service | Partial (`/services#slug` only) |
| About / Contact | Yes |
| Brand kit | Footer only (2) |
| Social profiles | **No** (JSON-LD only) |
| Stub routes | Clutter IA |

**Gap:** Users cannot browse major service *categories* or detail pages efficiently. Need Services dropdown / grouped landing + optional slug pages.

### Color usage

| Token | Brand | Current UI |
|-------|-------|------------|
| Deep Navy | `#0B1320` | Hero approx. OK; surfaces diverge |
| Electric Blue | `#146BFF` | UI primary is `#1d4ed8` |
| Cyan | `#22C1FF` | Barely used |
| BrandMark | Hardcoded navy | Poor contrast in dark mode |

### Accessibility

- Skip link present ✓  
- Focus rings generally present ✓  
- Mobile menu: no focus trap / Escape  
- Dark-mode logo contrast  
- `AnimateIn` opacity-0 + no reduced-motion  
- Footer “Soon” items look interactive but aren’t  

### Responsiveness / mobile

- Breakpoints used thoughtfully.  
- Hero visual absent on mobile.  
- Tech stack pill cluster clutters small screens.  
- Services page is a long same-shaped scroll.

### Copy quality

- Tone: professional but generic SaaS-MSP hybrid.  
- Audience: skews IT practitioners over business owners.  
- Fluff risk: “modernize,” “clarity and craft,” unsourced stats.  
- Placeholder signals in contact + legal kill trust.

### Trust & professionalism

Missing for premium positioning:

1. Real contact path (working form, real phone or remove phone)  
2. Proof (logos, quotes, case snippets)  
3. People / local story  
4. Counsel-ready legal  
5. Visual polish aligned to brand (not default blue cards)

### Conversion opportunities

1. Wire contact form + remove demo copy  
2. Per-section CTAs on services  
3. Trust bar + testimonials on home  
4. Calendar / “Book a consultation” as primary conversion  
5. Service detail pages with outcome-led H1s  

### Performance

- Mostly Server Components ✓  
- Client: Header, Theme, ContactForm, BrandColorSwatch, many `AnimateIn` wrappers  
- Reduce `AnimateIn` surface area; prefer CSS motion  
- Brand SVGs already available — use them over decorative card chrome  
- No large photography yet (good for weight; bad for atmosphere)

### SEO

| Item | Status |
|------|--------|
| Unique titles / descriptions | Present on live pages |
| Canonicals | Present |
| OG / Twitter | Root + per-page; brand OG asset exists |
| robots.txt | Good disallow for portal/login |
| sitemap | Missing nothing critical; stubs correctly omitted |
| Schema | Org + WebSite only — add Service, FAQ, Breadcrumb |
| Gaps | Placeholder phone in JSON-LD; no service landing URLs |

---

## Design system drift

`globals.css` primary (`#1d4ed8`) ≠ brand Electric Blue (`#146BFF`). Manifest theme uses brand blue. Align tokens before visual redesigns.

---

## Priority themes (feeds roadmap)

1. Make contact real; remove placeholders  
2. Proof layer (trust, testimonials, local story)  
3. Service IA (groups + detail routes)  
4. Align UI to brand tokens; theme-aware logo  
5. Honest nav (hide stubs; surface services; link social)  
6. Legal + prose styles  
7. Motion / a11y / client JS cleanup  
8. Expand brand portal with collateral templates  
9. One tagline system for business owners  

---

## File index audited

- App: `src/app/**`  
- Content: `src/content/*`, `src/lib/site.ts`, `src/data/brand-assets.ts`  
- Components: `src/components/{layout,home,shared,ui,brand,contact}/**`  
- Brand: `public/brand/**`
