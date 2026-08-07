import { partnerCredential, credentialGroups } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/shared/AnimateIn";

export function Certifications() {
  return (
    <Section
      eyebrow="Experience"
      title="Credentials that match the work"
      description="Partner standing and certifications that map to how we actually deliver—security, infrastructure, and project execution—without the expiry fine print."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:items-start">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1f3a] via-[#123866] to-[#1d4ed8] px-6 py-8 text-on-hero sm:px-8 sm:py-10">
            <div className="noise absolute inset-0 opacity-40" aria-hidden />
            <div
              className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#22C1FF]/20 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#22C1FF]">
                Partner status
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {partnerCredential.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-on-hero-muted">
                {partnerCredential.program}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-on-hero-subtle sm:text-base">
                {partnerCredential.summary}
              </p>
            </div>
          </div>
        </AnimateIn>

        <div className="space-y-0 divide-y divide-border border-y border-border">
          {credentialGroups.map((group, index) => (
            <AnimateIn key={group.area} delayMs={80 + index * 70}>
              <div className="grid gap-3 py-6 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8 sm:items-baseline">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {group.area}
                </h3>
                <ul className="space-y-2">
                  {group.credentials.map((name) => (
                    <li
                      key={name}
                      className="text-base font-medium tracking-tight text-foreground sm:text-lg"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
