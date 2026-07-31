import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Niall Tech.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Niall Tech",
    description: "Terms governing use of the Niall Tech website.",
    url: "/terms",
  },
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing the ${siteConfig.name} website, you agree to these Terms of Service. If you do not agree, please do not use the site.`,
  },
  {
    title: "2. Website purpose",
    body: "This website provides general information about our consulting services. Content is for informational purposes and does not constitute a binding offer, professional advice specific to your environment, or a guarantee of outcomes.",
  },
  {
    title: "3. Engagements",
    body: "Any consulting engagement is governed by a separate statement of work, master services agreement, or other written contract between you and Niall Tech. Website inquiries do not create a client relationship until mutually agreed in writing.",
  },
  {
    title: "4. Intellectual property",
    body: "All website content, branding, and materials are owned by Niall Tech or its licensors and may not be copied, modified, or distributed without prior written permission, except as allowed by applicable law.",
  },
  {
    title: "5. Acceptable use",
    body: "You agree not to misuse the website, attempt unauthorized access, disrupt service, or submit unlawful, harmful, or misleading content through forms or communications.",
  },
  {
    title: "6. Disclaimer",
    body: "The website is provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
  },
  {
    title: "7. Limitation of liability",
    body: "To the fullest extent permitted by law, Niall Tech is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.",
  },
  {
    title: "8. Changes",
    body: "We may update these Terms of Service from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Contact",
    body: `Questions about these terms can be sent to ${siteConfig.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Terms governing use of the Niall Tech website and related informational materials."
      />
      <Container className="max-w-3xl py-16 sm:py-20">
        <p className="text-sm text-muted">Last updated: July 24, 2026</p>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
