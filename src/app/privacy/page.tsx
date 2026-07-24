import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Niall Tech.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Niall Tech",
    description: "How Niall Tech collects, uses, and protects information.",
    url: "/privacy",
  },
};

const sections = [
  {
    title: "1. Overview",
    body: `This Privacy Policy explains how ${siteConfig.name} collects, uses, and protects information when you visit our website or contact us about consulting services. This page uses placeholder language suitable for a marketing site and should be reviewed by legal counsel before production use.`,
  },
  {
    title: "2. Information we collect",
    body: "We may collect information you voluntarily provide through contact forms, email, or phone—such as your name, company, email address, phone number, and project details. We may also collect standard technical data such as IP address, browser type, and pages visited through analytics tools.",
  },
  {
    title: "3. How we use information",
    body: "We use collected information to respond to inquiries, provide consulting services, improve our website, and communicate about relevant offerings. We do not sell personal information.",
  },
  {
    title: "4. Sharing of information",
    body: "We may share information with trusted service providers who help us operate our website, email, or business systems, and only as needed to perform those services. We may also disclose information when required by law.",
  },
  {
    title: "5. Data retention",
    body: "We retain contact and project-related information for as long as needed to fulfill the purposes described in this policy, comply with legal obligations, or resolve disputes.",
  },
  {
    title: "6. Security",
    body: "We apply reasonable administrative and technical safeguards designed to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Your choices",
    body: "You may request access to, correction of, or deletion of personal information we hold about you by contacting us. Depending on your location, additional privacy rights may apply.",
  },
  {
    title: "8. Contact",
    body: `If you have questions about this Privacy Policy, contact us at ${siteConfig.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Placeholder policy content describing how Niall Tech handles information collected through this website."
      />
      <Container className="prose-niall max-w-3xl py-16 sm:py-20">
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
