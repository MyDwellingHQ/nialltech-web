import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServices } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Capabilities built for modern IT"
      description="From Microsoft 365 and Azure to identity, security, and recovery—practical consulting that fits how your organization actually works."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service, index) => (
          <AnimateIn key={service.slug} delayMs={index * 70}>
            <ServiceCard service={service} />
          </AnimateIn>
        ))}
      </div>
      <div className="mt-10 flex justify-start">
        <Button href="/services" variant="outline">
          View all services
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
      <p className="sr-only">
        <Link href="/services">Browse the complete Niall Tech service catalog</Link>
      </p>
    </Section>
  );
}
