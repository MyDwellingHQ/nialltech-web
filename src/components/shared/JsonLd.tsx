import { formatAddressLine, siteConfig } from "@/lib/site";

export function OrganizationJsonLd() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  };

  if (siteConfig.address.street) {
    address.streetAddress = siteConfig.address.street;
  }
  if (siteConfig.address.postalCode) {
    address.postalCode = siteConfig.address.postalCode;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    areaServed: ["Bremerton, WA", "Kitsap County", "Washington"],
    address,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    knowsAbout: siteConfig.keywords,
    slogan: siteConfig.tagline,
    location: formatAddressLine(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
