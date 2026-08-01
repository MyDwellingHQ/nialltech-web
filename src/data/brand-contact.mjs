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
  /** Display format for print + UI. */
  phone: "(360) 474-7305",
  /** E.164 for tel: links, vCard, and structured data. */
  phoneHref: "+13604747305",
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
  lastName: "Dent",
  title: "Founder / Systems Engineer",
  shortTitle: "Founder",
  email: "paul@nialltech.com",
  /** Display format for print + UI. */
  phone: "(360) 474-7305",
  /** E.164 for tel: links, vCard, and structured data. */
  phoneHref: "+13604747305",
  /** Short intro for the /connect digital card page. */
  intro:
    "I help organizations modernize with Microsoft 365, Azure, identity, and infrastructure that stays secure and maintainable.",
};

/** Digital card / QR destination — encoded exactly in print QR assets. */
export const CONNECT = {
  path: "/connect",
  url: "https://nialltech.com/connect",
  qrCta: "Scan to connect",
  vcardPath: "/contact/paul-dent.vcf",
};

/** Recommended VistaPrint back variant: A | B | C */
export const BUSINESS_CARD = {
  recommendedBack: "A",
  finishedIn: { width: 3.5, height: 2 },
  bleedIn: 0.125,
  fullBleedIn: { width: 3.75, height: 2.25 },
  safeInsetFromTrimIn: 0.125,
  /** Base / variants B–C QR edge length (inches). Variant A scales this. */
  qrTargetIn: 0.85,
  /**
   * Production Variant A printed QR edge length (inches @ dpi).
   * 0.85 × 1.12 → ~0.953" → 286 px at 300 DPI.
   */
  qrPrintedInA: 0.953,
  /** Production Variant A stacked wordmark width in design px (+10% from 300). */
  backLogoWidthPxA: 330,
  qrMinIn: 0.75,
  dpi: 300,
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
