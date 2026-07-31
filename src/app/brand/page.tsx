import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BrandAssetGrid } from "@/components/brand/BrandAssetGrid";
import { BrandColorSwatch } from "@/components/brand/BrandColorSwatch";
import { BrandLogo, BrandMark } from "@/components/brand/BrandLogo";
import { BrandUsageExample } from "@/components/brand/BrandUsageExample";
import { DownloadButton } from "@/components/brand/DownloadButton";
import { FaviconPreviewGrid } from "@/components/brand/FaviconPreviewGrid";
import { MerchandiseMockups } from "@/components/brand/MerchandiseMockups";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  brandAssetSections,
  brandAssets,
  brandColors,
  incorrectUsage,
  usageRules,
} from "@/data/brand-assets";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-brand",
});

export const metadata: Metadata = {
  title: "Brand Assets",
  description:
    "Download official Niall Tech logos, colors, favicons, and social assets. Approved usage guidance for partners and staff.",
  alternates: {
    canonical: "/brand",
  },
  openGraph: {
    title: "Brand Assets | Niall Tech",
    description:
      "Official Niall Tech logo files, color palette, and downloadable brand package.",
    url: "/brand",
    images: [
      {
        url: "/brand/social/open-graph-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Niall Tech brand",
      },
    ],
  },
};

export default function BrandAssetsPage() {
  const packageAsset = brandAssets.find((a) => a.id === "zip");

  return (
    <div className={inter.variable}>
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-hero-glow opacity-95" />
        <div className="noise absolute inset-0" aria-hidden />
        <Container className="relative py-16 sm:py-20">
          <AnimateIn>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <BrandMark theme="white" className="h-11 w-11" />
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200/90">
                    Niall Tech
                  </p>
                </div>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Brand Assets
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                  Official logos, colors, and files for approved Niall Tech
                  communications. Use these masters as provided—do not redraw,
                  recolor, or redistribute altered marks.
                </p>
              </div>
              {packageAsset ? (
                <DownloadButton
                  href={packageAsset.path}
                  label="Download Complete Brand Package"
                  filename="niall-tech-brand-assets.zip"
                  variant="primary"
                  size="md"
                  className="bg-white text-[#0B1320] hover:bg-slate-100 focus-visible:ring-white"
                />
              ) : null}
            </div>
          </AnimateIn>
        </Container>
      </header>

      <Section
        id="primary"
        eyebrow="Lockups"
        title="Primary logos"
        description="Horizontal, stacked, and icon-only marks in dark and light variants. SVG is preferred for digital use."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <LogoShowcase
            title="Horizontal"
            description="Primary lockup for headers and documents."
            light={<BrandLogo variant="horizontal" theme="dark" size="lg" />}
            dark={<BrandLogo variant="horizontal" theme="light" size="lg" />}
          />
          <LogoShowcase
            title="Stacked"
            description="Centered placements and square formats."
            light={<BrandLogo variant="stacked" theme="dark" size="lg" />}
            dark={<BrandLogo variant="stacked" theme="light" size="lg" />}
          />
          <LogoShowcase
            title="Icon"
            description="Favicons, avatars, and compact UI."
            light={<BrandLogo variant="icon" theme="dark" size="xl" />}
            dark={<BrandLogo variant="icon" theme="light" size="xl" />}
          />
        </div>
      </Section>

      {brandAssetSections.map((section) => {
        const assets = brandAssets.filter((asset) =>
          section.categories.includes(asset.category),
        );
        return (
          <Section
            key={section.id}
            id={section.id}
            eyebrow="Downloads"
            title={section.title}
            description={section.description}
            className="border-t border-border bg-surface/40"
          >
            {section.id === "favicon-assets" && (
              <div className="mb-10">
                <FaviconPreviewGrid />
              </div>
            )}
            <BrandAssetGrid assets={assets} />
          </Section>
        );
      })}

      <Section
        id="colors"
        eyebrow="Palette"
        title="Brand colors"
        description="Core palette for logos and supporting UI. Copy HEX or RGB values for design tools."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brandColors.map((color) => (
            <BrandColorSwatch key={color.id} {...color} />
          ))}
        </div>
      </Section>

      <Section
        id="typography"
        eyebrow="Type"
        title="Typography"
        description="Inter is the brand typeface for lockups and formal brand materials. Site UI may use Plus Jakarta Sans and Manrope."
        className="border-t border-border bg-surface/40"
      >
        <div
          className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8"
          style={{ fontFamily: "var(--font-inter-brand), Inter, sans-serif" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Wordmark
            </p>
            <p className="mt-3 text-4xl font-bold tracking-[0.08em] text-[#0B1320] dark:text-white sm:text-5xl">
              NIALL
              <span className="font-medium tracking-[0.28em] text-[#146BFF]">
                {" "}
                TECH
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Tagline
            </p>
            <p className="mt-2 text-sm font-medium tracking-[0.22em] text-[#475569] dark:text-slate-300">
              MODERN IT. LOCAL EXPERTISE.
            </p>
          </div>
          <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <TypeSample weight="700" label="Bold / Semibold — NIALL" sample="Aa Bb Cc" />
            <TypeSample weight="500" label="Medium — TECH" sample="Aa Bb Cc" />
            <TypeSample weight="400" label="Regular — body support" sample="Aa Bb Cc" />
          </div>
        </div>
      </Section>

      <Section
        id="usage"
        eyebrow="Guidance"
        title="Usage guidance"
        description="Follow these rules so the mark stays clear, consistent, and recognizable."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usageRules.map((rule) => (
            <article
              key={rule.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="font-display text-base font-semibold tracking-tight">
                {rule.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {rule.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <BrandUsageExample
            title="Light backgrounds"
            description="Full-color logo on white or light gray."
            variant="ok-light"
          />
          <BrandUsageExample
            title="Dark backgrounds"
            description="Reverse logo on Deep Navy."
            variant="ok-dark"
          />
        </div>
      </Section>

      <Section
        id="incorrect"
        eyebrow="Don'ts"
        title="Incorrect usage"
        description="Avoid these alterations. When in doubt, download an approved file from this page."
        className="border-t border-border bg-surface/40"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {incorrectUsage.map((item) => (
            <BrandUsageExample
              key={item.id}
              title={item.title}
              description={item.description}
              variant="incorrect"
              incorrectId={item.id}
            />
          ))}
        </div>
      </Section>

      <Section
        id="merch"
        eyebrow="In the wild"
        title="Merchandise & environments"
        description="Previews of the approved mark on apparel, drinkware, vehicles, signage, and more. Each mockup composites the live vector logo — no redrawn art."
      >
        <MerchandiseMockups />
      </Section>

      <Section
        id="package"
        eyebrow="Package"
        title="Complete brand package"
        description="One ZIP with every approved asset—logos, PNG exports, favicons, social, collateral, office templates, email signatures, and print—plus README, colors, and asset index."
      >
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              niall-tech-brand-assets.zip
            </p>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Includes logo masters, raster exports, favicons, social covers &
              banners, business cards, stationery, email signatures, Office
              templates, print PDFs, README.md, brand-colors.txt, and
              asset-index.json.
            </p>
          </div>
          {packageAsset ? (
            <DownloadButton
              href={packageAsset.path}
              label="Download Complete Brand Package"
              filename="niall-tech-brand-assets.zip"
              variant="primary"
              size="md"
            />
          ) : null}
        </div>
      </Section>
    </div>
  );
}

function LogoShowcase({
  title,
  description,
  light,
  dark,
}: {
  title: string;
  description: string;
  light: React.ReactNode;
  dark: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex h-32 items-center justify-center bg-white px-6 dark:bg-slate-100">
        {light}
      </div>
      <div className="flex h-32 items-center justify-center bg-[#0B1320] px-6">
        {dark}
      </div>
      <div className="border-t border-border p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </article>
  );
}

function TypeSample({
  weight,
  label,
  sample,
}: {
  weight: string;
  label: string;
  sample: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl text-foreground" style={{ fontWeight: weight }}>
        {sample}
      </p>
    </div>
  );
}
