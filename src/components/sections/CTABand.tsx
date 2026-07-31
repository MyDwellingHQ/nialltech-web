import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type CTABandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CTABand({
  eyebrow = "Next step",
  title = "Tell us what is slowing the business down",
  description = "Share your goals and constraints. We will recommend a practical first engagement—usually the same business day.",
  primaryLabel = "Book a consultation",
  primaryHref = "/contact",
}: CTABandProps) {
  return (
    <Section className="pb-24 pt-8 sm:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-hero-glow px-6 py-12 text-white sm:px-10 sm:py-14">
        <div className="noise absolute inset-0" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200/90">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg">
                {primaryLabel}
              </Button>
              <Button
                href={`mailto:${siteConfig.email}`}
                variant="secondary"
                size="lg"
              >
                Email {siteConfig.email}
              </Button>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-sm text-slate-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              {siteConfig.email}
            </a>
            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 text-sm text-slate-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                {siteConfig.phone}
              </a>
            ) : (
              <p className="text-sm leading-relaxed text-slate-300">
                Prefer email for the first note. We reply the same business day
                with a clear next step.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
