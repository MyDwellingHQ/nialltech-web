import { Section } from "@/components/ui/Section";
import { whyChooseUs } from "@/content/company";

type BenefitsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Benefits({
  eyebrow = "Why Niall Tech",
  title = "Consulting that respects how businesses actually run",
  description = "Less jargon. Clear priorities. Delivery you can measure in uptime, risk, and staff productivity.",
}: BenefitsProps) {
  return (
    <Section
      id="why"
      eyebrow={eyebrow}
      title={title}
      description={description}
      className="border-t border-border bg-surface/50"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {whyChooseUs.map((item) => (
          <article key={item.title} className="max-w-md">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
