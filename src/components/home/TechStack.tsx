import { technologies } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function TechStack() {
  return (
    <Section
      className="relative overflow-hidden bg-surface"
      eyebrow="Platforms"
      title="Technologies we work with every day"
      description="Deep familiarity with the Microsoft ecosystem and the infrastructure stack that surrounds it."
      align="center"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <AnimateIn>
        <ul className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 shadow-soft"
            >
              {tech}
            </li>
          ))}
        </ul>
      </AnimateIn>
    </Section>
  );
}
