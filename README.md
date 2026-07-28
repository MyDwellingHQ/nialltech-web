# Niall Tech Website

Production-ready marketing website for **Niall Tech**, a technology consulting company specializing in Microsoft 365, Azure, Entra ID, Intune, security, and IT infrastructure.

## Stack

- [Next.js](https://nextjs.org/) App Router
- TypeScript
- Tailwind CSS v4
- `next-themes` (dark / light mode)
- `lucide-react` icons

## Features

- Responsive pages: Home, Services, About, Contact, Privacy, Terms
- Sticky navigation + mobile menu
- Dark / light theme toggle
- Subtle scroll and entrance animations
- SEO metadata, Open Graph image, JSON-LD, sitemap, robots.txt
- Accessible landmarks, focus states, and skip link
- Future-ready routes for Blog, Knowledge Base, Status, Portal, Login, and booking expansion

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

## Environment

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://nialltech.com
```

Defaults to `https://nialltech.com` for metadata, sitemap, and robots.

## Deploy on Vercel

This repo includes a `vercel.json` that forces the **Next.js** framework preset. That matters because a project first connected with only a README can stay stuck on Framework Preset **Other**, which builds successfully but serves every route as a platform `NOT_FOUND` 404.

In the Vercel project settings, confirm:

1. **Root Directory**: leave empty (app lives at the repository root — `src/app`, not a subdirectory)
2. **Framework Preset**: Next.js (also set in `vercel.json`)
3. **Build Command**: `next build` (default / `vercel.json`)
4. **Output Directory**: leave empty — do not set `public`, `out`, or `.next`
5. **Install Command**: default (`npm install`)
6. **Production Branch**: `main`

After changing Build & Development Settings, redeploy Production.

## Project structure

```text
src/
  app/                 # Routes, metadata, sitemap, robots
  components/
    contact/           # Contact form
    home/              # Homepage sections
    layout/            # Header, footer, theme
    shared/            # Cross-page components
    ui/                # Reusable primitives
  content/             # Services and company copy
  lib/                 # Site config and utilities
public/                # Static assets
```

## Placeholder content

Contact details, certifications, and stats are placeholders for demonstration. Replace them with production-ready copy and connect the contact form to your preferred backend or booking provider when ready.
