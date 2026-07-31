import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ReconstructedBrandMark } from "@/components/brand/logo-reconstruction/ReconstructedBrandMark";
import {
  ReconstructedHorizontalLockup,
  ReconstructedStackedLockup,
} from "@/components/brand/logo-reconstruction/ReconstructedLockups";
import { ReconstructedWordmark } from "@/components/brand/logo-reconstruction/ReconstructedWordmark";
import { ConstructionViewer } from "@/components/brand/logo-reconstruction/ConstructionViewer";
import { ReferenceCompare } from "@/components/brand/logo-reconstruction/ReferenceCompare";
import {
  LayerOrder,
  NegativeSpaceSpec,
  PolygonCoordinates,
  ThemeRenderings,
} from "@/components/brand/logo-reconstruction/GeometrySpec";
import { BackgroundTests, SizeTests } from "@/components/brand/logo-reconstruction/RenderTests";
import { MockupGrid } from "@/components/brand/logo-reconstruction/Mockups";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-recon",
});

export const metadata: Metadata = {
  title: "Logo Reconstruction (Approval candidate)",
  description:
    "Non-production, mathematically controlled reconstruction of the approved Niall Tech mark for internal review and sign-off.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LogoReconstructionPage() {
  return (
    <div
      className={inter.variable}
      style={{ fontFamily: "var(--font-inter-recon), Inter, system-ui, sans-serif" }}
    >
      <header className="relative overflow-hidden border-b border-border bg-[#0B1320]">
        <Container className="relative py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
            Approval candidate · not production
          </span>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Niall Tech Mark — Geometric Reconstruction
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">
                A mathematically controlled, production-quality SVG rebuild of the approved
                bold, forward-leaning &ldquo;N&rdquo; — a folded navy beam, a navy lower-left
                pillar, and a tall electric-blue right pillar, all flat color from one shared
                geometry source of truth. Nothing here replaces production assets until explicitly
                approved.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/brand/logo-reconstruction/visual-test"
                  className="inline-flex min-h-9 items-center rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
                >
                  Open visual test page
                </Link>
                <a
                  href="/brand/logo-reconstruction/svg/niall-tech-mark-light.svg"
                  className="inline-flex min-h-9 items-center rounded-lg bg-[#146BFF] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#0f56cc]"
                >
                  Master SVG (light)
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-white/95 p-8">
              <ReconstructedBrandMark theme="light" size={160} title="Reconstructed Niall Tech mark" />
            </div>
          </div>
        </Container>
      </header>

      <Section
        eyebrow="1 · Reference target"
        title="Exact reference target"
        description="The approved bold, forward-leaning N built from three explicit shapes: a folded navy beam (upper-left down to lower-right, then up), a navy lower-left pillar, and a tall electric-blue right pillar. Flat color only — no gradients, shadows, outlines, or font glyphs."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SpecTile k="Canvas" v="0 0 120 120" />
          <SpecTile k="Occupies" v="x 12–102 · y 16–104" />
          <SpecTile k="Optical center" v="57, 60" />
          <SpecTile k="Colors" v="#0B1320 · #146BFF · #FFFFFF" />
        </div>
      </Section>

      <Section
        eyebrow="2 · Construction"
        title="Construction grid"
        description="Toggle the overlay to inspect the grid, shape vertices, point labels, bounding box, optical center, clear-space boundary, and the negative-space gaps between shapes."
        className="border-t border-border bg-surface/40"
      >
        <ConstructionViewer theme="light" />
      </Section>

      <Section
        eyebrow="3 · Coordinates"
        title="Shape path data"
        description="Each of the three shapes as explicit SVG path commands. All artwork — React and static SVG — derives from these exact values."
      >
        <PolygonCoordinates />
      </Section>

      <Section
        eyebrow="4 · Layers"
        title="Layer order"
        description="Render order from first (bottom) to last (top)."
        className="border-t border-border bg-surface/40"
      >
        <LayerOrder />
      </Section>

      <Section
        eyebrow="5–7 · Negative space"
        title="Intentional negative space"
        description="The gaps between the three shapes are structural negative space, not strokes or masks — they reveal whatever background sits behind the mark."
      >
        <NegativeSpaceSpec />
      </Section>

      <Section
        eyebrow="8–10 · Themes"
        title="Light, dark, and monochrome"
        description="Identical geometry across themes — only fill colors change. Monochrome uses currentColor."
        className="border-t border-border bg-surface/40"
      >
        <ThemeRenderings />
      </Section>

      <Section
        eyebrow="11–16 · Sizes"
        title="Pixel-size tests (16 → 256px)"
        description="Recognizability across sizes using the exact master geometry — the bold shapes hold up down to 16px."
      >
        <SizeTests />
      </Section>

      <Section
        eyebrow="Backgrounds"
        title="Background matrix"
        description="The mark on white, deep navy, mid-gray, electric blue, and a transparent checkerboard."
        className="border-t border-border bg-surface/40"
      >
        <BackgroundTests />
      </Section>

      <Section
        eyebrow="17–18 · Lockups"
        title="Horizontal and stacked lockups"
        description="Exact-math lockups: horizontal 520×140 and stacked 260×330, both derived from the shared geometry."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <LockupCard label="Horizontal · light">
            <ReconstructedHorizontalLockup theme="light" className="h-24 w-auto" />
          </LockupCard>
          <LockupCard label="Horizontal · dark" dark>
            <ReconstructedHorizontalLockup theme="dark" className="h-24 w-auto" />
          </LockupCard>
          <LockupCard label="Stacked · light">
            <ReconstructedStackedLockup theme="light" className="h-56 w-auto" />
          </LockupCard>
          <LockupCard label="Stacked · dark" dark>
            <ReconstructedStackedLockup theme="dark" className="h-56 w-auto" />
          </LockupCard>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <LockupCard label="Wordmark · clean (recommended)">
            <ReconstructedWordmark variant="clean" theme="light" />
          </LockupCard>
          <LockupCard label="Wordmark · reference-board rules">
            <ReconstructedWordmark variant="reference" theme="light" />
          </LockupCard>
        </div>
      </Section>

      <Section
        eyebrow="19–24 · Applications"
        title="Application simulations"
        description="Dimensionally controlled CSS mockups — no AI-generated photography."
        className="border-t border-border bg-surface/40"
      >
        <MockupGrid />
      </Section>

      <Section
        eyebrow="Reference check"
        title="Side-by-side & overlay"
        description="Compare the uploaded brand board against the reconstructed vector. Overlay controls are for visual evaluation only — no automatic tracing is performed."
      >
        <ReferenceCompare />
      </Section>

      <Section className="border-t border-border">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 text-sm leading-relaxed text-muted sm:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Status
          </h2>
          <p className="mt-2 max-w-2xl">
            This is an approval candidate only. The production{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">BrandLogo</code>,{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">BrandMark</code>, favicons, and
            metadata remain unchanged. Static SVG masters live under{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">
              public/brand/logo-reconstruction/svg/
            </code>{" "}
            and regenerate via{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">
              npm run brand:logo-reconstruction
            </code>
            .
          </p>
        </div>
      </Section>
    </div>
  );
}

function SpecTile({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{k}</p>
      <p className="mt-1 font-mono text-sm text-foreground">{v}</p>
    </div>
  );
}

function LockupCard({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className="flex min-h-40 items-center justify-center p-8"
        style={{ backgroundColor: dark ? "#0B1320" : "#ffffff" }}
      >
        {children}
      </div>
      <figcaption className="border-t border-border p-3 text-xs font-medium text-muted">
        {label}
      </figcaption>
    </figure>
  );
}
