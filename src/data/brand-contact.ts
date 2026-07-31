/**
 * Typed re-export of the canonical contact/collateral data.
 * Never duplicate values here — `brand-contact.mjs` is authoritative.
 */
import * as raw from "./brand-contact.mjs";

export const COMPANY = raw.COMPANY as {
  name: string;
  legalName: string;
  website: string;
  websiteUrl: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  tagline: string;
  taglineStack: string[];
  services: string[];
  headline: string[];
};

export const PERSON = raw.PERSON as {
  name: string;
  firstName: string;
  title: string;
  shortTitle: string;
  email: string;
  phone: string;
  phoneHref: string;
};

export const BRAND = raw.BRAND as {
  navy: string;
  navyDeep: string;
  navyMid: string;
  blue: string;
  cyan: string;
  slate: string;
  lightGray: string;
  offWhite: string;
  white: string;
};
