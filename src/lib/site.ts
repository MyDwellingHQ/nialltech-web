import { COMPANY } from "@/data/brand-contact";

export const siteConfig = {
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  tagline: "Technology consulting that keeps your business moving.",
  description:
    "Niall Tech delivers Microsoft 365, Azure, Entra ID, Intune, security, and infrastructure consulting for modern organizations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nialltech.com",
  locale: "en_US",
  email: COMPANY.email,
  /** Display phone — keep in sync via brand-contact.mjs. */
  phone: COMPANY.phone,
  /** E.164 for tel: links and JSON-LD. */
  phoneHref: COMPANY.phoneHref,
  social: {
    linkedin: COMPANY.linkedin,
    github: COMPANY.github,
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
    { label: "Brand Assets", href: "/brand" },
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
