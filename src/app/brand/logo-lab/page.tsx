import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CandidateSection } from "@/components/brand/logo-lab/candidate-section";
import { LogoLabExplorer } from "@/components/brand/logo-lab/logo-lab-explorer";
import { candidates } from "@/lib/logo-lab";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-lab",
});

export const metadata: Metadata = {
  title: "Logo Lab (Non-production concepts)",
  description:
    "Non-production Niall Tech logo exploration. Five distinct geometric N candidates with lockups, applications, and comparison tools for internal review.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/brand/logo-lab" },
};

export default function LogoLabPage() {
  return (
    <div
      className={inter.variable}
      style={{ fontFamily: "var(--font-inter-lab), Inter, system-ui, sans-serif" }}
    >
      {/* Ensures the literal "Inter" family resolves for SVG wordmark previews */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />

      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-hero-glow opacity-95" />
        <div className="noise absolute inset-0" aria-hidden />
        <Container className="relative py-14 sm:py-20">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
              Non-production concepts
            </span>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Niall Tech Logo Lab
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">
              Five genuinely distinct interpretations of the geometric{" "}
              <span className="font-semibold text-white">&ldquo;N&rdquo;</span>, each rebuilt as
              clean SVG vector artwork in Deep Navy and Electric Blue. These candidates are for
              internal review only &mdash; the approved production logo is unchanged and still live
              across the site.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {candidates.map((c) => (
                <Link
                  key={c.id}
                  href={`#candidate-${c.id}`}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <span className="font-display font-semibold">{c.code}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </AnimateIn>
        </Container>
      </header>

      <Section
        eyebrow="How to use this page"
        title="Compare before you commit"
        description="Nothing here is final and no winner is declared. Scores are design-system estimates to support discussion, not objective facts. Use the tools below to switch candidates, flip backgrounds, zoom into geometry, and download SVG masters."
      >
        <div className="rounded-2xl border border-border bg-surface/40 p-5 text-sm leading-relaxed text-muted sm:p-6">
          <p>
            Each candidate keeps the core enterprise direction &mdash; a minimal, architectural
            &ldquo;N&rdquo; with an electric-blue accent &mdash; while exploring a different
            construction system. Review the interactive comparison first, then scroll for the full
            breakdown, application mockups, scorecards, and downloads per candidate.
          </p>
          <p className="mt-3 text-foreground">
            The full reference analysis lives in{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">docs/logo-reference-analysis.md</code>.
          </p>
        </div>
      </Section>

      <Section
        id="compare"
        eyebrow="Comparison tools"
        title="Interactive comparison"
        description="Switch candidates, change lockups, toggle light and dark backgrounds, zoom, and inspect favicon and monochrome rendering side by side."
        className="border-t border-border bg-surface/40"
      >
        <LogoLabExplorer />
      </Section>

      <Section
        eyebrow="Candidates"
        title="Full candidate breakdown"
        description="Large previews, real application mockups, design-system scorecards, and downloadable SVG masters for each direction."
      >
        <div className="grid gap-8">
          {candidates.map((candidate) => (
            <CandidateSection key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm leading-relaxed text-muted sm:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Next step
          </h2>
          <p className="mt-2 max-w-2xl">
            These concepts are intentionally left open. When you select a direction, it can be
            promoted into the production <code className="rounded bg-card px-1.5 py-0.5 text-xs">BrandLogo</code>{" "}
            system and master asset pipeline. Until then, the current production logo remains the
            single source of truth.
          </p>
        </div>
      </Section>
    </div>
  );
}
