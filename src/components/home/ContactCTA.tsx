import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function ContactCTA() {
  return (
    <Section id="contact" className="pb-24 pt-8 sm:pb-28">
      <AnimateIn>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-hero-glow px-6 py-12 text-on-hero sm:px-10 sm:py-14">
          <div className="noise absolute inset-0" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-on-hero-muted">
                Contact
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to modernize with confidence?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-on-hero-subtle">
                Tell us about your environment, priorities, and timeline. We will
                respond with a clear next step—usually the same business day.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Book a consultation
                </Button>
                <Button href={`mailto:${siteConfig.email}`} variant="secondary" size="lg">
                  Email us
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-on-hero-border bg-on-hero-soft p-6 backdrop-blur-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-on-hero-muted transition-colors hover:text-on-hero"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-on-hero-soft">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 text-sm text-on-hero-muted transition-colors hover:text-on-hero"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-on-hero-soft">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
}
