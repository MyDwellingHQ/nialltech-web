import { Section } from "@/components/ui/Section";
import { technologies } from "@/content/company";

/** Platform cloud — Microsoft-first stack, not fake client logos. */
export function LogoCloud() {
  return (
    <Section
      id="platforms"
      eyebrow="Platforms"
      title="The tools your team already depends on"
      description="We specialize where Microsoft work happens—and the infrastructure around it."
      className="border-t border-border"
      align="center"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground/90"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Section>
  );
}
