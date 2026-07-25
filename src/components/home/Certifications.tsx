import { Award } from "lucide-react";
import { certifications } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function Certifications() {
  return (
    <Section
      eyebrow="Credentials"
      title="Certifications that signal readiness"
      description="Credential highlights relevant to the Microsoft, security, and infrastructure work Niall Tech delivers. Official badge artwork is shown only when authorized files are available—never as a substitute for the Niall Tech logo."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <AnimateIn key={cert.name} delayMs={index * 60}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Award className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold tracking-tight text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{cert.detail}</p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
