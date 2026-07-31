import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { serviceCategories, servicesByCategory } from "@/content/services";
import { ServicesJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Microsoft 365, Azure, identity, security, infrastructure, and IT strategy consulting for growing businesses.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Niall Tech",
    description:
      "Practical Microsoft consulting for productivity, security, and reliable operations.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Niall Tech",
    description:
      "Practical Microsoft consulting for productivity, security, and reliable operations.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesJsonLd />
      <PageIntro
        eyebrow="Services"
        title="IT help that protects productivity and reduces risk"
        description="Browse by outcome. Every engagement is scoped to what your business needs next—not a generic managed-services menu."
      >
        <Button href="/contact" variant="secondary" size="md">
          Talk through priorities
        </Button>
      </PageIntro>

      <Container className="py-16 sm:py-20">
        <div className="space-y-16">
          {serviceCategories.map((category) => {
            const items = servicesByCategory(category.id);
            return (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-28"
                aria-labelledby={`${category.id}-title`}
              >
                <div className="max-w-2xl">
                  <h2
                    id={`${category.id}-title`}
                    className="font-display text-3xl font-semibold tracking-tight"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 space-y-5">
                  {items.map((service) => {
                    const Icon = service.icon;
                    return (
                      <article
                        key={service.slug}
                        id={service.slug}
                        className="scroll-mt-28 border-t border-border pt-6 sm:pt-8"
                      >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                          <div className="max-w-2xl">
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                              <Icon className="h-5 w-5" aria-hidden />
                            </div>
                            <h3 className="font-display text-2xl font-semibold tracking-tight">
                              {service.title}
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-muted">
                              {service.description}
                            </p>
                          </div>
                          <ul className="w-full max-w-md space-y-2.5 border-l border-border pl-5">
                            {service.outcomes.map((outcome) => (
                              <li
                                key={outcome}
                                className="text-sm leading-relaxed text-foreground/90"
                              >
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <CTABand
        title="Not sure which service fits?"
        description="Tell us what is blocking the business. We will recommend a focused first step."
      />
    </>
  );
}
