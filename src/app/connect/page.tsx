import type { Metadata } from "next";
import { Mail, Phone, Globe, Download, MessageSquare } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PERSON, COMPANY, CONNECT } from "@/data/brand-contact";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const title = `${PERSON.name} | ${COMPANY.name}`;
const description = `${PERSON.name}, ${PERSON.title} at ${COMPANY.name}. ${PERSON.intro}`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: CONNECT.path,
  },
  openGraph: {
    title,
    description,
    url: CONNECT.path,
    type: "profile",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConnectPage() {
  const telHref = `tel:${PERSON.phoneHref}`;
  const mailHref = `mailto:${PERSON.email}`;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,107,255,0.14),_transparent_55%),linear-gradient(180deg,#f7f9fc_0%,#eef3fb_45%,#f7f9fc_100%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(20,107,255,0.18),_transparent_50%),linear-gradient(180deg,#070b14_0%,#0b1424_50%,#070b14_100%)]"
      />

      <Container className="relative flex min-h-[calc(100dvh-8rem)] max-w-md flex-col justify-center py-10 sm:py-14">
        <header className="text-center">
          <div className="flex justify-center">
            <BrandLogo variant="horizontal" theme="auto" size="lg" priority />
          </div>

          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {PERSON.name}
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-primary sm:text-base">
            {PERSON.title}
          </p>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted">
            {PERSON.intro}
          </p>
        </header>

        <nav
          aria-label="Contact actions"
          className="mt-10 flex flex-col gap-3"
        >
          <Button
            href={telHref}
            size="lg"
            className="w-full justify-center"
            aria-label={`Call ${PERSON.name} at ${PERSON.phone}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call {PERSON.phone}
          </Button>

          <Button
            href={mailHref}
            variant="outline"
            size="lg"
            className="w-full justify-center"
            aria-label={`Email ${PERSON.name} at ${PERSON.email}`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email {PERSON.email}
          </Button>

          <Button
            href={COMPANY.websiteUrl}
            variant="outline"
            size="lg"
            className="w-full justify-center"
            aria-label={`Visit ${COMPANY.website}`}
          >
            <Globe className="h-4 w-4" aria-hidden />
            Visit {COMPANY.website}
          </Button>

          {/* Native <a download> for reliable vCard install on iOS/Android */}
          <a
            href={CONNECT.vcardPath}
            download="paul-dent.vcf"
            aria-label={`Save ${PERSON.name} contact as vCard`}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold tracking-tight transition-all duration-200",
              "bg-transparent text-foreground ring-1 ring-border hover:bg-primary-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <Download className="h-4 w-4" aria-hidden />
            Save Contact
          </a>

          <Button
            href="/contact"
            variant="ghost"
            size="lg"
            className="w-full justify-center"
            aria-label="Request a consultation with Niall Tech"
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Request a consultation
          </Button>
        </nav>

        <p className="mt-8 text-center text-xs text-muted">
          {COMPANY.name} · Technology consulting
        </p>
      </Container>
    </div>
  );
}
