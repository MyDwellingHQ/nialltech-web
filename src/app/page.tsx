import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Certifications } from "@/components/home/Certifications";
import { TechStack } from "@/components/home/TechStack";
import { Workflow } from "@/components/home/Workflow";
import { ContactCTA } from "@/components/home/ContactCTA";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Technology Consulting`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Technology Consulting`,
    description: siteConfig.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyChooseUs />
      <Certifications />
      <TechStack />
      <Workflow />
      <ContactCTA />
    </>
  );
}
