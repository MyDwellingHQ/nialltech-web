import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
  href?: string;
};

export function ServiceCard({
  service,
  className,
  href = "/services",
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card interactive className={cn("group h-full p-6", className)}>
      <Link href={`${href}#${service.slug}`} className="flex h-full flex-col">
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
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
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Card>
  );
}
