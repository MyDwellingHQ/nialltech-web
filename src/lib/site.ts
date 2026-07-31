export const siteConfig = {
  name: "Niall Tech",
  legalName: "Niall Tech",
  tagline: "Modern IT. Local expertise.",
  description:
    "Niall Tech helps growing organizations stay productive and secure with Microsoft 365, Azure, identity, and practical IT consulting—without the noise.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nialltech.com",
  locale: "en_US",
  email: "hello@nialltech.com",
  /** Set to a real number when available. Empty string hides phone UI and schema. */
  phone: "" as string,
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
    "business IT consulting",
    "network consulting",
    "backup and disaster recovery",
    "technology strategy",
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNavGroups: {
  label: string;
  href: string;
  items: NavItem[];
}[] = [
  {
    label: "Cloud & productivity",
    href: "/services#cloud-productivity",
    items: [
      {
        label: "Microsoft 365",
        href: "/services#microsoft-365",
        description: "Email, Teams, and collaboration that stay secure",
      },
      {
        label: "Azure & Entra ID",
        href: "/services#azure-entra-id",
        description: "Cloud foundations with clear identity control",
      },
      {
        label: "Cloud migrations",
        href: "/services#cloud-migrations",
        description: "Move systems with less downtime and surprise",
      },
    ],
  },
  {
    label: "Identity & security",
    href: "/services#identity-security",
    items: [
      {
        label: "Intune / endpoints",
        href: "/services#intune-endpoint",
        description: "Company devices managed and protected",
      },
      {
        label: "Identity & access",
        href: "/services#identity-access",
        description: "Right people, right access, fewer breaches",
      },
      {
        label: "Security consulting",
        href: "/services#security-consulting",
        description: "Practical risk reduction for busy teams",
      },
    ],
  },
  {
    label: "Infrastructure & resilience",
    href: "/services#infrastructure-resilience",
    items: [
      {
        label: "IT infrastructure",
        href: "/services#it-infrastructure",
        description: "Reliable systems built to grow with you",
      },
      {
        label: "Backup & recovery",
        href: "/services#backup-dr",
        description: "Restore critical work when something fails",
      },
      {
        label: "Network consulting",
        href: "/services#network-consulting",
        description: "Fast, stable connectivity for office and remote",
      },
    ],
  },
  {
    label: "Strategy & support",
    href: "/services#strategy-support",
    items: [
      {
        label: "Technology strategy",
        href: "/services#technology-strategy",
        description: "A clear roadmap tied to business goals",
      },
      {
        label: "Business IT support",
        href: "/services#small-business-it",
        description: "Steady help without enterprise bloat",
      },
    ],
  },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Brand Assets", href: "/brand" },
  ],
  services: serviceNavGroups.map((group) => ({
    label: group.label,
    href: group.href,
  })),
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
