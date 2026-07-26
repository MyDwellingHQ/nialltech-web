import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Niall Tech consulting services spanning Microsoft 365, Azure, Entra ID, Intune, security, infrastructure, and technology strategy.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Niall Tech",
    description:
      "Microsoft 365, Azure, identity, security, infrastructure, and strategy consulting.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Consulting built around the platforms that run your business"
        description="Whether you need a focused engagement or a broader modernization program, we deliver practical guidance across Microsoft cloud, identity, endpoints, and infrastructure."
      />

      <Container className="py-16 sm:py-20">
        <div className="space-y-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimateIn key={service.slug} delayMs={Math.min(index * 40, 240)}>
                <article
                  id={service.slug}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h2 className="font-display text-2xl font-semibold tracking-tight">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">
                        {service.description}
                      </p>
                    </div>
                    <ul className="w-full max-w-md space-y-2.5 rounded-xl border border-border bg-background/70 p-5">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Tell us what you are trying to improve. We will recommend a focused
            first engagement and a practical path forward.
          </p>
          <Button href="/contact" className="mt-6">
            Talk with Niall Tech
          </Button>
        </div>
      </Container>
    </>
  );
}
