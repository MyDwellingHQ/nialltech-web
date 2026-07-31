import { Section } from "@/components/ui/Section";
import { aboutStats } from "@/content/company";

type StatsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Stats({
  eyebrow = "At a glance",
  title = "How we show up",
  description = "A focused Microsoft practice built for clarity and follow-through.",
}: StatsProps) {
  return (
    <Section eyebrow={eyebrow} title={title} description={description}>
      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {aboutStats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
