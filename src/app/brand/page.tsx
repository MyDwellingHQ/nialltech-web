import type { Metadata } from "next";
import { SiteLogo } from "@/components/brand/site-logo";
import { NiallTechMarkIcon } from "@/components/brand/niall-tech-mark-icon";
import { Container } from "@/components/ui/Container";
import { brandAssets } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Brand review",
  description: "Internal Niall Tech logo and brand asset review page.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BrandReviewPage() {
  return (
    <div className="bg-background pb-20">
      <div className="border-b border-amber-300/50 bg-amber-50 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100">
        <Container className="py-4">
          <p className="text-sm font-semibold tracking-wide">
            Brand review page — internal only (noindex)
          </p>
          <p className="mt-1 text-sm opacity-90">
            Compare logo variants before final approval. This route is not linked
            in primary navigation.
          </p>
        </Container>
      </div>

      <Container className="space-y-16 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Niall Tech logo system
          </h1>
          <p className="mt-3 text-muted">
            Geometric NT monogram with site-font wordmark. SVG files in{" "}
            <code className="rounded bg-primary-soft px-1.5 py-0.5 text-sm text-foreground">
              public/brand/
            </code>{" "}
            are the source of truth.
          </p>
        </header>

        <SectionBlock title="Primary variants">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <PreviewCard label="Primary horizontal">
              <SiteLogo variant="horizontal" size={48} />
            </PreviewCard>
            <PreviewCard label="Stacked">
              <SiteLogo variant="stacked" size={56} />
            </PreviewCard>
            <PreviewCard label="Symbol-only mark">
              <SiteLogo variant="mark" size={64} />
            </PreviewCard>
            <PreviewCard label="One-color (monochrome theme)">
              <SiteLogo variant="horizontal" theme="monochrome" size={48} />
            </PreviewCard>
            <PreviewCard label="Reversed on dark" dark>
              <SiteLogo variant="horizontal" theme="reversed" size={48} />
            </PreviewCard>
            <PreviewCard label="Static SVG horizontal">
              <SiteLogo variant="horizontal" theme="monochrome" size={48} />
              <span className="ml-3 text-xs text-muted">
                File: {brandAssets.logoHorizontal}
              </span>
            </PreviewCard>
          </div>
        </SectionBlock>

        <SectionBlock title="Light and dark backgrounds">
          <div className="grid gap-6 md:grid-cols-2">
            <PreviewCard label="Logo on light background" className="bg-white">
              <SiteLogo variant="horizontal" theme="default" size={44} />
            </PreviewCard>
            <PreviewCard label="Logo on dark background" dark>
              <SiteLogo variant="horizontal" theme="reversed" size={44} />
            </PreviewCard>
            <PreviewCard label="Mark on off-white" className="bg-[#F7F9FC]">
              <NiallTechMarkIcon className="h-16 w-16 text-brand-navy" />
            </PreviewCard>
            <PreviewCard label="Mark on charcoal" className="bg-[#1E293B]" dark>
              <NiallTechMarkIcon className="h-16 w-16 text-brand-reversed" />
            </PreviewCard>
          </div>
        </SectionBlock>

        <SectionBlock title="Small-size and favicon tests">
          <div className="grid gap-6 md:grid-cols-2">
            <PreviewCard label="Small sizes (48 / 32 / 24)">
              <div className="flex items-end gap-6">
                <NiallTechMarkIcon className="h-12 w-12 text-brand-navy" />
                <NiallTechMarkIcon className="h-8 w-8 text-brand-navy" />
                <NiallTechMarkIcon className="h-6 w-6 text-brand-navy" />
              </div>
            </PreviewCard>
            <PreviewCard label="Favicon sizes (48 / 32 / 16)">
              <div className="flex items-end gap-6">
                <FaviconFrame size={48} />
                <FaviconFrame size={32} />
                <FaviconFrame size={16} />
              </div>
            </PreviewCard>
          </div>
        </SectionBlock>

        <SectionBlock title="Application simulations">
          <div className="grid gap-6 lg:grid-cols-2">
            <PreviewCard label="Header simulation">
              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <SiteLogo variant="horizontal" size={32} />
                <div className="hidden gap-4 text-sm text-muted sm:flex">
                  <span>Services</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
                <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  Book
                </span>
              </div>
            </PreviewCard>

            <PreviewCard label="Business-card simulation">
              <div className="mx-auto aspect-[1.75/1] w-full max-w-md rounded-xl border border-border bg-white p-6 text-brand-navy shadow-soft">
                <SiteLogo variant="horizontal" theme="monochrome" size={36} />
                <div className="mt-8">
                  <p className="font-display text-lg font-semibold">Paul Dent</p>
                  <p className="text-sm text-slate-600">Founder</p>
                  <p className="mt-3 text-xs text-slate-500">
                    Bremerton, WA · hello@nialltech.com
                  </p>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard label="Polo / embroidery-style one-color">
              <div className="flex items-center justify-center rounded-xl bg-[#3f4f3a] px-6 py-10">
                <div className="flex flex-col items-center gap-3 text-[#E8EDE4]">
                  <NiallTechMarkIcon className="h-14 w-14" decorative />
                  <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase">
                    Niall Tech
                  </span>
                  <p className="text-[11px] text-[#E8EDE4]/80">
                    Flat one-color stitch simulation
                  </p>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard label="Vehicle-door / decal-style">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 px-6 py-12">
                <div
                  className="absolute inset-y-0 left-[18%] w-px bg-slate-500/30"
                  aria-hidden
                />
                <div className="relative flex flex-col items-start gap-2 text-brand-navy">
                  <SiteLogo variant="horizontal" theme="monochrome" size={42} />
                  <p className="text-xs font-medium tracking-wide text-slate-700">
                    Practical IT · Kitsap County
                  </p>
                </div>
              </div>
            </PreviewCard>
          </div>
        </SectionBlock>

        <SectionBlock title="Asset checklist">
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
            {Object.entries(brandAssets).map(([key, value]) => (
              <li
                key={key}
                className="rounded-xl border border-border bg-card px-4 py-3 font-mono text-xs text-foreground"
              >
                {value}
              </li>
            ))}
          </ul>
        </SectionBlock>
      </Container>
    </div>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function PreviewCard({
  label,
  children,
  dark = false,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`rounded-2xl border border-border p-5 ${
        dark ? "bg-brand-navy text-brand-reversed" : "bg-card"
      } ${className}`}
    >
      <figcaption
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.14em] ${
          dark ? "text-slate-300" : "text-muted"
        }`}
      >
        {label}
      </figcaption>
      <div className="flex min-h-[88px] items-center">{children}</div>
    </figure>
  );
}

function FaviconFrame({ size }: { size: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="overflow-hidden rounded-[20%] bg-brand-navy text-brand-reversed shadow-soft"
        style={{ width: size, height: size }}
      >
        <NiallTechMarkIcon className="h-full w-full p-[12%]" decorative />
      </div>
      <span className="text-xs text-muted">
        {size}×{size}
      </span>
    </div>
  );
}
