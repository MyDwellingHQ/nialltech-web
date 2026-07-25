export const siteConfig = {
  name: "Niall Tech",
  legalName: "Niall Technologies LLC",
  tagline: "Practical IT expertise for Kitsap County organizations.",
  description:
    "Niall Tech provides founder-led IT consulting in Bremerton and Kitsap County—Microsoft cloud, cybersecurity, infrastructure, project services, and practical managed IT support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nialltech.com",
  locale: "en_US",
  email: "hello@nialltech.com",
  phone: "+1 (555) 014-2200",
  address: {
    street: "",
    city: "Bremerton",
    region: "WA",
    postalCode: "",
    country: "US",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/niall-tech",
    github: "https://github.com/niall-tech",
  },
  keywords: [
    "Microsoft 365 consulting",
    "Azure consulting",
    "Entra ID",
    "Intune",
    "endpoint management",
    "identity and access management",
    "IT infrastructure",
    "security consulting",
    "cloud migration",
    "small business IT support",
    "network consulting",
    "virtualization",
    "backup and disaster recovery",
    "technology strategy",
    "Kitsap County IT",
    "Bremerton IT consulting",
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Status", href: "/status" },
  ],
  clients: [
    { label: "Client Portal", href: "/portal" },
    { label: "Book a Consultation", href: "/contact" },
    { label: "Client Login", href: "/login" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export function formatAddressLine() {
  const { city, region } = siteConfig.address;
  return `${city}, ${region}`;
}
