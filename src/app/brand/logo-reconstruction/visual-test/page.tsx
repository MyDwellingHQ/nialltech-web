import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BackgroundTests, SizeTests } from "@/components/brand/logo-reconstruction/RenderTests";
import { ThemeRenderings } from "@/components/brand/logo-reconstruction/GeometrySpec";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-recon",
});

export const metadata: Metadata = {
  title: "Logo Reconstruction — Visual Test",
  description: "Non-production background and size test matrix for the reconstructed Niall Tech mark.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ReconstructionVisualTestPage() {
  return (
    <div
      className={inter.variable}
      style={{ fontFamily: "var(--font-inter-recon), Inter, system-ui, sans-serif" }}
    >
      <header className="border-b border-border bg-[#0B1320]">
        <Container className="py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
            Visual test · not production
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Reconstruction Visual Test
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200">
            The reconstructed mark placed on white, deep navy, mid-gray, electric blue, and a
            transparent checkerboard, plus a full pixel-size sweep.
          </p>
          <Link
            href="/brand/logo-reconstruction"
            className="mt-5 inline-flex min-h-9 items-center rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            Back to full review
          </Link>
        </Container>
      </header>

      <Section eyebrow="Backgrounds" title="Background matrix">
        <BackgroundTests gap="medium" />
      </Section>

      <Section
        eyebrow="Themes"
        title="Light / dark / monochrome"
        className="border-t border-border bg-surface/40"
      >
        <ThemeRenderings gap="medium" />
      </Section>

      <Section eyebrow="Sizes" title="16 → 128px">
        <SizeTests gap="medium" />
      </Section>
    </div>
  );
}
