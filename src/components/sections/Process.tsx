import { Section } from "@/components/ui/Section";
import { workflowSteps } from "@/content/company";

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="How we work"
      title="A simple path from first call to steady operations"
      description="Four stages. Clear owners. No mystery deliverables."
    >
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {workflowSteps.map((step) => (
          <li key={step.step}>
            <p className="font-mono text-sm font-semibold tracking-widest text-primary">
              {step.step}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
