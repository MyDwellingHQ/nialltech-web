import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Niall Tech to discuss Microsoft 365, Azure, security, infrastructure, or IT support consulting.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Niall Tech",
    description: "Book a consultation with Niall Tech.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need"
        description="Share a few details about your environment and goals. We typically respond the same business day with a clear next step."
      />

      <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 sm:py-20">
        <aside className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Get in touch
            </h2>
            <p className="mt-3 text-muted">
              Prefer email or phone? Reach us directly and we will route your
              request to the right consultant.
            </p>
          </div>

          <ul className="space-y-4">
            <ContactDetail
              icon={Mail}
              label="Email"
              value={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            <ContactDetail
              icon={Phone}
              label="Phone"
              value={siteConfig.phone}
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            />
            <ContactDetail
              icon={MapPin}
              label="Office"
              value={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`}
            />
            <ContactDetail
              icon={Clock3}
              label="Hours"
              value="Monday–Friday, 9:00–17:30 (local time)"
            />
          </ul>
        </aside>

        <ContactForm />
      </Container>
    </>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="mt-1 block text-sm text-muted">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
      {content}
    </li>
  );
}
