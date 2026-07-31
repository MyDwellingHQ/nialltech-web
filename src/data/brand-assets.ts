import {
  BRAND_ASSET_CATEGORIES,
  brandAssets as _brandAssets,
  brandAssetSections as _brandAssetSections,
} from "./brand-assets.data.mjs";

export const brandColors = [
  {
    id: "navy",
    name: "Deep Navy",
    hex: "#0B1320",
    rgb: "11, 19, 32",
    usage: "Primary logo color, dark backgrounds, wordmark NIALL",
  },
  {
    id: "blue",
    name: "Electric Blue",
    hex: "#146BFF",
    rgb: "20, 107, 255",
    usage: "Accent pillar, TECH wordmark, interactive accents",
  },
  {
    id: "cyan",
    name: "Cyan Accent",
    hex: "#22C1FF",
    rgb: "34, 193, 255",
    usage: "Secondary highlights and motion accents only",
  },
  {
    id: "slate",
    name: "Slate",
    hex: "#475569",
    rgb: "71, 85, 105",
    usage: "Secondary text and tagline on light surfaces",
  },
  {
    id: "lightGray",
    name: "Light Gray",
    hex: "#E5E7EB",
    rgb: "229, 231, 235",
    usage: "Borders, dividers, light structural surfaces",
  },
  {
    id: "white",
    name: "White",
    hex: "#FFFFFF",
    rgb: "255, 255, 255",
    usage: "Reverse logos and light backgrounds",
  },
] as const;

export type BrandAssetCategory = (typeof BRAND_ASSET_CATEGORIES)[number];

export type BrandAssetFormat =
  | "SVG"
  | "PNG"
  | "ICO"
  | "PDF"
  | "ZIP"
  | "JSON"
  | "TXT"
  | "HTML"
  | "PPTX"
  | "DOCX"
  | "webmanifest";

export type BrandAsset = {
  id: string;
  name: string;
  category: BrandAssetCategory;
  path: string;
  format: BrandAssetFormat;
  dimensions?: string;
  background: "light" | "dark" | "transparent" | "any";
  description: string;
  recommendedUse: string;
  preview?: string;
};

export type BrandAssetSection = {
  id: string;
  title: string;
  description: string;
  categories: BrandAssetCategory[];
};

/**
 * SINGLE SOURCE OF TRUTH: the asset inventory and section grouping live in
 * `brand-assets.data.mjs` (plain JS so scripts/check-brand-consistency.mjs can
 * import the exact same data). They are re-exported here with types so the app
 * keeps full type-safety and existing imports are unchanged.
 */
export const brandAssets = _brandAssets as BrandAsset[];
export const brandAssetSections = _brandAssetSections as BrandAssetSection[];

export const usageRules = [
  {
    title: "Minimum size",
    body: "Keep the icon at least 16px digital / 8mm print. Prefer 24px+ in product UI.",
  },
  {
    title: "Clear space",
    body: "Leave clear space equal to at least half the icon width on every side of the lockup.",
  },
  {
    title: "Light backgrounds",
    body: "Use the full-color (dark) logo on white, light gray, or pale surfaces.",
  },
  {
    title: "Dark backgrounds",
    body: "Use the reverse (light) logo on Deep Navy, near-black, or photography with strong contrast.",
  },
  {
    title: "One-color use",
    body: "Use black or white mono lockups for single-ink print, engraving, and fax.",
  },
  {
    title: "Embroidery",
    body: "Use the embroidery mark. Do not reduce gaps or introduce gradients in stitch files.",
  },
  {
    title: "Vehicle decals",
    body: "Use the vehicle decal asset on dark panels. Maintain clear space around door handles and body lines.",
  },
] as const;

export const incorrectUsage = [
  {
    id: "stretch",
    title: "Do not stretch",
    description: "Never scale non-uniformly or distort proportions.",
  },
  {
    id: "rotate",
    title: "Do not rotate",
    description: "Keep the mark upright. Do not tilt or mirror.",
  },
  {
    id: "recolor",
    title: "Do not recolor arbitrarily",
    description: "Only approved navy, blue, black, or white combinations.",
  },
  {
    id: "shadow",
    title: "Do not add shadows",
    description: "No drop shadows, glows, bevels, or outlines.",
  },
  {
    id: "contrast",
    title: "Do not use low contrast",
    description: "Avoid navy on charcoal or white on pale gray.",
  },
  {
    id: "spacing",
    title: "Do not change spacing",
    description: "Keep the gap between icon and wordmark as provided.",
  },
] as const;
