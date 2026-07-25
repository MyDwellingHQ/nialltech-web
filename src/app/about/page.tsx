import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FounderPhoto } from "@/components/brand/founder-photo";
import { aboutStats, values } from "@/content/company";
import { formatAddressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Niall Tech—founder-led IT consulting in Bremerton and Kitsap County focused on Microsoft cloud, security, and reliable infrastructure.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Niall Tech",
    description:
      "Founder-led IT consulting built on clarity, practical expertise, and local accountability.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Founder-led IT consulting for Kitsap County"
        description="Niall Tech helps organizations modernize with Microsoft cloud, identity, and infrastructure practices that are secure, understandable, and durable—without the corporate runaround."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <AnimateIn>
            <FounderPhoto
              priority
              className="mx-auto max-w-[340px] lg:max-w-none"
              sizes="(max-width: 1024px) 340px, 400px"
            />
            <div className="mt-5 text-center lg:text-left">
              <p className="font-display text-xl font-semibold tracking-tight">
                Paul Dent
              </p>
              <p className="mt-1 text-sm text-muted">
                Founder, Niall Tech · {formatAddressLine()}
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delayMs={100}>
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Who we are
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Niall Tech is a founder-led technology consulting practice.
                  Clients work directly with the engineer responsible for
                  understanding the problem, recommending the solution, and
                  carrying the work through implementation.
                </p>
                <p>
                  Based in {formatAddressLine()}, the practice focuses on
                  Microsoft 365, Azure, Entra ID, Intune, cybersecurity,
                  infrastructure, project services, and practical managed IT
                  support for organizations across Kitsap County.
                </p>
                <p>
                  The approach is simple: practical recommendations, clear
                  communication, and more than 15 years of professional IT
                  experience—without unnecessary complexity or a large-team
                  handoff.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {aboutStats.map((stat, index) => (
            <AnimateIn key={stat.label} delayMs={index * 60}>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="font-display text-3xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            What we value
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <AnimateIn key={value.title} delayMs={index * 80}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Let&apos;s talk through your next IT priority
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              From first assessment to hands-on delivery, you work with the same
              person accountable for the outcome.
            </p>
          </div>
          <Button href="/contact" className="mt-6 sm:mt-0">
            Contact Niall Tech
          </Button>
        </div>
      </Container>
    </>
  );
}
