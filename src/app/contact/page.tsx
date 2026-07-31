import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { FAQ, FaqJsonLd } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Niall Tech to discuss Microsoft 365, Azure, security, infrastructure, or IT priorities for your business.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Niall Tech",
    description: "Book a consultation with Niall Tech.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Niall Tech",
    description: "Book a consultation with Niall Tech.",
  },
};

export default function ContactPage() {
  return (
    <>
      <FaqJsonLd />
      <PageIntro
        eyebrow="Contact"
        title="Tell us what you need to improve"
        description="Share a few details about your goals and constraints. We typically respond the same business day with a clear next step."
      />
      <ContactBlock />
      <FAQ />
    </>
  );
}
