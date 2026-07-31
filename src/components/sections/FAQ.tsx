import { Section } from "@/components/ui/Section";
import { faqs } from "@/content/company";

type FAQProps = {
  items?: typeof faqs;
};

export function FAQ({ items = faqs }: FAQProps) {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Common questions"
      description="Straight answers for business owners evaluating Microsoft consulting help."
      className="border-t border-border bg-surface/50"
    >
      <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="cursor-pointer list-none font-display text-lg font-semibold tracking-tight text-foreground marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span
                  className="mt-1 text-muted transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function FaqJsonLd({ items = faqs }: FAQProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
