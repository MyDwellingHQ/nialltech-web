import { workflowSteps } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="Engagement model"
      title="A simple customer workflow"
      description="Every engagement follows a clear path from discovery to optimization—so stakeholders always know what happens next."
    >
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {workflowSteps.map((step, index) => (
          <AnimateIn key={step.step} delayMs={index * 80}>
            <li className="relative h-full rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary">
                {step.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          </AnimateIn>
        ))}
      </ol>
    </Section>
  );
}
