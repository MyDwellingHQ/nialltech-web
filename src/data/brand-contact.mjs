/**
 * Niall Tech — canonical contact + collateral data.
 * Single source of truth for business cards, signatures, letterhead, invoices,
 * proposals, SOWs, Office templates, and every other named-person asset.
 * Consumed by Node generator scripts (.mjs) and re-exported with types in
 * `brand-contact.ts` for React components.
 */

export const COMPANY = {
  name: "Niall Tech",
  legalName: "Niall Tech",
  website: "nialltech.com",
  websiteUrl: "https://nialltech.com",
  email: "hello@nialltech.com",
  phone: "+1 (555) 014-2200",
  phoneHref: "+15550142200",
  linkedin: "https://www.linkedin.com/company/niall-tech",
  github: "https://github.com/niall-tech",
  tagline: "Modern IT. Local Expertise.",
  taglineStack: ["Modern IT.", "Cybersecurity.", "Cloud."],
  services: ["Microsoft 365", "Cybersecurity", "Networking", "Cloud"],
  headline: ["Secure IT.", "Modern Cloud.", "Local Expertise."],
};

export const PERSON = {
  name: "Paul Dent",
  firstName: "Paul",
  title: "Founder / Systems Engineer",
  shortTitle: "Founder",
  email: "paul@nialltech.com",
  phone: "+1 (555) 014-2200",
  phoneHref: "+15550142200",
};

/** Brand palette mirror (hex) — kept in sync with globals + brand-assets. */
export const BRAND = {
  navy: "#0B1320",
  navyDeep: "#0E1A2E",
  navyMid: "#102A56",
  blue: "#146BFF",
  cyan: "#22C1FF",
  slate: "#475569",
  lightGray: "#E5E7EB",
  offWhite: "#F7F9FC",
  white: "#FFFFFF",
};
