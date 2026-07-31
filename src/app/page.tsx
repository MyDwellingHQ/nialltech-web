import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { FAQ, FaqJsonLd } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Certifications } from "@/components/home/Certifications";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Microsoft IT Consulting`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Microsoft IT Consulting`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Microsoft IT Consulting`,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <TrustBar />
      <ServiceGrid />
      <Benefits />
      <Certifications />
      <LogoCloud />
      <Process />
      <FAQ />
      <CTABand />
    </>
  );
}
