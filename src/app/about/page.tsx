import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { aboutStats, values } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Niall Tech—a technology consulting firm focused on Microsoft platforms, security, and reliable infrastructure delivery.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Niall Tech",
    description:
      "A consulting partner focused on trust, professionalism, and technical expertise.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A consulting partner built on clarity and craft"
        description="Niall Tech helps organizations modernize with Microsoft cloud, identity, and infrastructure practices that are secure, understandable, and durable."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <AnimateIn>
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Who we are
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Niall Tech is a technology consulting company for leaders who
                  want capable partners—not another layer of complexity. We
                  specialize in Microsoft 365, Azure, Entra ID, Intune, security,
                  and the infrastructure foundations that keep operations steady.
                </p>
                <p>
                  Our approach is simple: understand the business, design for
                  security and maintainability, and deliver with clear
                  communication. Whether you are a growing company or an
                  established organization modernizing legacy systems, we meet
                  you where you are.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delayMs={100}>
            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <p className="font-display text-3xl font-semibold tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
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
              Let&apos;s build the next chapter of your IT strategy
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              From first assessment to long-term partnership, we are ready to
              help.
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
