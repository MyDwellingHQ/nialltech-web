import { FounderPhoto } from "@/components/brand/founder-photo";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatAddressLine } from "@/lib/site";

export function Founder() {
  return (
    <Section
      className="bg-surface"
      eyebrow="Founder-led"
      title="Experienced IT guidance without the corporate runaround"
      description="Niall Tech is founder-led, which means clients work directly with the person responsible for understanding the problem, recommending the solution, and carrying the work through implementation."
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <AnimateIn>
          <FounderPhoto
            className="mx-auto max-w-[320px] lg:max-w-none"
            sizes="(max-width: 1024px) 320px, 380px"
          />
        </AnimateIn>

        <AnimateIn delayMs={100}>
          <div className="space-y-5">
            <ul className="space-y-3 text-sm leading-relaxed text-muted sm:text-base">
              <li className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                  aria-hidden
                />
                Work directly with the engineer performing the work
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                  aria-hidden
                />
                Local experience in {formatAddressLine()} and Kitsap County
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                  aria-hidden
                />
                Practical recommendations without unnecessary complexity
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                  aria-hidden
                />
                More than 15 years of professional IT experience
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              From Microsoft cloud and identity work to cybersecurity,
              infrastructure, and day-to-day support, the focus stays on clear
              communication and reliable delivery—not a large-team handoff.
            </p>
            <Button href="/about">Meet the founder</Button>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}
