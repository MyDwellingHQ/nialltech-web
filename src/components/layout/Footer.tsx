import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BrandMark className="h-9 w-9" />
              <span className="font-display text-lg font-semibold tracking-tight">
                Niall Tech
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline} Microsoft 365, Azure, identity, and
              infrastructure consulting for organizations that need clarity and
              reliable delivery.
            </p>
            <div className="mt-5 space-y-1 text-sm text-muted">
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {siteConfig.email}
                </a>
              </p>
              {siteConfig.phone ? (
                <p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                GitHub
              </a>
            </div>
          </div>

          <FooterColumn title="Company" items={[...footerNav.company]} />
          <FooterColumn title="Services" items={[...footerNav.services]} />
          <FooterColumn title="Legal" items={[...footerNav.legal]} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted/80">
            Modern IT. Local expertise.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
