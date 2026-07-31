import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { featuredServices, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  services?: Service[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function ServiceGrid({
  services = featuredServices,
  eyebrow = "Services",
  title = "What we help you improve",
  description = "Focused Microsoft consulting for productivity, security, and reliable operations.",
  className,
}: ServiceGridProps) {
  return (
    <Section
      id="services"
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={className}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className={cn(
                "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors",
                "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
