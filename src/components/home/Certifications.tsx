import { certifications } from "@/content/company";
import { Section } from "@/components/ui/Section";

export function Certifications() {
  return (
    <Section
      eyebrow="Credentials"
      title="Microsoft and security certifications"
      description="Current credentials that match the platforms we implement—so recommendations stay grounded in how the products actually work."
      className="border-t border-border bg-surface/40"
    >
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <li key={cert.name} className="border-t border-border pt-4">
            <p className="font-semibold tracking-tight text-foreground">
              {cert.name}
            </p>
            <p className="mt-1 text-sm text-muted">{cert.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
