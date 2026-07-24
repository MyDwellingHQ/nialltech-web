import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                NT
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Niall Tech
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline} Microsoft 365, Azure, identity, security, and
              infrastructure consulting for organizations that need clarity and
              reliable delivery.
            </p>
            <div className="mt-5 space-y-1 text-sm text-muted">
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </div>

          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Resources" items={[...footerNav.resources]} comingSoon />
          <FooterColumn title="Clients" items={[...footerNav.clients]} comingSoon />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  comingSoon = false,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  comingSoon?: boolean;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => {
          const isFuture =
            comingSoon &&
            ["/blog", "/knowledge-base", "/status", "/portal", "/login"].includes(
              item.href,
            );

          return (
            <li key={item.href}>
              {isFuture ? (
                <span className="text-sm text-muted/80">
                  {item.label}
                  <span className="ml-2 text-xs uppercase tracking-wide text-muted/60">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
