import { Mail, Phone, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";

export function ContactBlock() {
  return (
    <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 sm:py-20">
      <aside className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Get in touch
          </h2>
          <p className="mt-3 text-muted">
            Tell us what you need to improve. We route requests to the right
            consultant and reply the same business day whenever possible.
          </p>
        </div>

        <ul className="space-y-4">
          <ContactDetail
            icon={Mail}
            label="Email"
            value={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
          />
          {siteConfig.phone ? (
            <ContactDetail
              icon={Phone}
              label="Phone"
              value={siteConfig.phone}
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            />
          ) : null}
          <ContactDetail
            icon={Clock3}
            label="Hours"
            value="Monday–Friday, 9:00–17:30 (local time)"
          />
        </ul>
      </aside>

      <ContactForm />
    </Container>
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
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
