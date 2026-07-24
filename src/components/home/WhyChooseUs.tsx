import { CheckCircle2 } from "lucide-react";
import { whyChooseUs } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function WhyChooseUs() {
  return (
    <Section
      className="bg-surface"
      eyebrow="Why Niall Tech"
      title="Trust, simplicity, and technical depth"
      description="We combine senior-level expertise with a delivery style that is clear, measured, and focused on outcomes."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {whyChooseUs.map((item, index) => (
          <AnimateIn key={item.title} delayMs={index * 80}>
            <article className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {item.description}
              </p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
