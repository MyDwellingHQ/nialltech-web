import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Stats } from "@/components/sections/Stats";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { aboutCopy, values } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Niall Tech—Microsoft-focused IT consulting for business owners who want clarity, security, and reliable delivery.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Niall Tech",
    description:
      "A Microsoft consulting partner focused on clarity, security, and accountable delivery.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Niall Tech",
    description:
      "A Microsoft consulting partner focused on clarity, security, and accountable delivery.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow={aboutCopy.eyebrow}
        title={aboutCopy.title}
        description={aboutCopy.description}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {aboutCopy.whoTitle}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              {aboutCopy.whoBody.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="border-l border-border pl-6 sm:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Local expertise
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              We work remotely-first with responsive communication. You get a
              named partner who explains tradeoffs in plain English and stays
              accountable through delivery—not a ticket queue.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            {aboutCopy.valuesTitle}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title}>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <Stats />
      <CTABand title={aboutCopy.ctaTitle} description={aboutCopy.ctaBody} />
    </>
  );
}
