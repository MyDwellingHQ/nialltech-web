import { Section } from "@/components/ui/Section";
import { trustPoints } from "@/content/company";

export function TrustBar() {
  return (
    <Section className="border-b border-border py-10 sm:py-12" containerClassName="!max-w-6xl">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((item) => (
          <li key={item.label} className="min-w-0">
            <p className="font-display text-sm font-semibold tracking-tight text-foreground">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
