import Link from "next/link";
import {
  ArrowUpRight,
  KeyRound,
  Laptop,
  Lock,
  Network,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Microsoft 365 & Identity",
    description:
      "Tenant hardening, collaboration, and Entra ID controls that keep access clear and secure.",
    href: "/services#microsoft-365",
    icon: KeyRound,
  },
  {
    title: "Endpoint Management",
    description:
      "Intune policies, compliance baselines, and device readiness for everyday work.",
    href: "/services#intune-endpoint",
    icon: Laptop,
  },
  {
    title: "Cybersecurity",
    description:
      "Practical defenses prioritized for your risk, not a checklist of unused tools.",
    href: "/services#security-consulting",
    icon: Lock,
  },
  {
    title: "Network & Infrastructure",
    description:
      "Connectivity, hybrid platforms, and cloud foundations built for reliability.",
    href: "/services#network-consulting",
    icon: Network,
  },
] as const;

const proofPoints = [
  "Microsoft-focused",
  "Security-first",
  "Local and responsive",
  "Clear project delivery",
] as const;

export function ModernizeTransition() {
  return (
    <section
      aria-labelledby="modernize-heading"
      className="relative z-10 -mt-20 pb-6 sm:-mt-24 sm:pb-8"
    >
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card text-card-foreground shadow-soft">
          <div className="border-b border-border bg-gradient-to-b from-primary-soft/40 to-transparent px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Focus areas
            </p>
            <h2
              id="modernize-heading"
              className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              What we help modernize
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              Clear starting points for the systems that keep your organization
              productive and protected.
            </p>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className={cn(
                    "group flex gap-4 bg-card p-6 transition-colors duration-200",
                    "hover:bg-primary-soft/35 focus-visible:bg-primary-soft/35",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  )}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {category.title}
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">
                      {category.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <ul className="grid gap-3 border-t border-border bg-surface/70 px-6 py-5 sm:grid-cols-2 sm:gap-4 sm:px-8 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#146BFF]"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
