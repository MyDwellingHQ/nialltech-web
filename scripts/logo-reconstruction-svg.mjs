/**
 * Niall Tech — Logo Reconstruction
 * SVG STRING GENERATION (shared by build + test scripts)
 *
 * Every string below is derived from the canonical geometry module. No
 * coordinates are hardcoded here — only layout math for lockups, which itself
 * comes from the documented spec constants.
 */

import {
  logoGeometry,
  pointsToSvg,
  getGapGeometry,
  getThemeColors,
  GAP_OPTIONS,
  SLATE,
} from "../src/components/brand/logo-reconstruction/logo-geometry.mjs";

const XMLNS = "http://www.w3.org/2000/svg";

/**
 * Build the inner glyph markup (three parallelograms + masked gap) for a
 * canonical 0 0 120 120 canvas.
 * @param {{ theme: "light" | "dark" | "monochrome", gap: "hairline" | "medium" | "chamfered", idPrefix: string }} opts
 * @returns {string}
 */
export function glyphMarkup({ theme, gap, idPrefix }) {
  const { primary, accent } = getThemeColors(theme);
  const maskId = `${idPrefix}-gap`;
  const gapPoints = pointsToSvg(getGapGeometry(gap));

  const left = pointsToSvg(logoGeometry.leftStem);
  const right = pointsToSvg(logoGeometry.rightStem);
  const diag = pointsToSvg(logoGeometry.diagonal);

  // Layer order: right blue stem, left stem, diagonal — all under one mask so
  // the gap is a true negative-space cutout revealing the background.
  return [
    `<defs>`,
    `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">`,
    `<rect x="0" y="0" width="120" height="120" fill="#fff"/>`,
    `<polygon points="${gapPoints}" fill="#000"/>`,
    `</mask>`,
    `</defs>`,
    `<g mask="url(#${maskId})">`,
    `<polygon points="${right}" fill="${accent}"/>`,
    `<polygon points="${left}" fill="${primary}"/>`,
    `<polygon points="${diag}" fill="${primary}"/>`,
    `</g>`,
  ].join("");
}

/**
 * Standalone icon SVG (square 120x120).
 * @param {{ theme: "light" | "dark" | "monochrome", gap?: "hairline" | "medium" | "chamfered", title: string }} opts
 * @returns {string}
 */
export function iconSvg({ theme, gap = "medium", title }) {
  const inner = glyphMarkup({ theme, gap, idPrefix: "nt" });
  return svgDocument({
    viewBox: "0 0 120 120",
    title,
    body: inner,
  });
}

/**
 * Horizontal lockup SVG (520x140) using the documented placement math.
 * @param {{ theme: "light" | "dark", gap?: "hairline" | "medium" | "chamfered", title: string }} opts
 * @returns {string}
 */
export function horizontalSvg({ theme, gap = "medium", title }) {
  const { primary, accent } = getThemeColors(theme);
  const divider = theme === "dark" ? "rgba(255,255,255,0.45)" : SLATE;
  const glyph = glyphMarkup({ theme, gap, idPrefix: "nt-h" });

  const body = [
    // icon at x=12 y=10 (scale 120->120 => translate only)
    `<g transform="translate(12 10)">${glyph}</g>`,
    // divider x=162 y1=24 y2=116
    `<line x1="162" y1="24" x2="162" y2="116" stroke="${divider}" stroke-width="1.5"/>`,
    // wordmark group starting x=198
    wordmarkText({ x: 198, niallBaseline: 66, techBaseline: 106, anchor: "start", primary, accent }),
  ].join("");

  return svgDocument({ viewBox: "0 0 520 140", title, body });
}

/**
 * Stacked lockup SVG (260x330) using the documented placement math.
 * @param {{ theme: "light" | "dark", gap?: "hairline" | "medium" | "chamfered", title: string }} opts
 * @returns {string}
 */
export function stackedSvg({ theme, gap = "medium", title }) {
  const { primary, accent } = getThemeColors(theme);
  const glyph = glyphMarkup({ theme, gap, idPrefix: "nt-s" });

  const body = [
    `<g transform="translate(70 20)">${glyph}</g>`,
    wordmarkText({ x: 130, niallBaseline: 216, techBaseline: 258, anchor: "middle", primary, accent }),
  ].join("");

  return svgDocument({ viewBox: "0 0 260 330", title, body });
}

/* -------------------------------------------------------------------------- */
/*  Wordmark (outlined via text with system-safe Inter stack)                  */
/* -------------------------------------------------------------------------- */

/**
 * @param {{ x: number, niallBaseline: number, techBaseline: number, anchor: "start" | "middle", primary: string, accent: string }} o
 * @returns {string}
 */
function wordmarkText({ x, niallBaseline, techBaseline, anchor, primary, accent }) {
  const family = "Inter, 'Helvetica Neue', Arial, sans-serif";
  return [
    `<text x="${x}" y="${niallBaseline}" text-anchor="${anchor}" font-family="${family}" ` +
      `font-size="42" font-weight="650" letter-spacing="10.08" fill="${primary}">NIALL</text>`,
    `<text x="${x}" y="${techBaseline}" text-anchor="${anchor}" font-family="${family}" ` +
      `font-size="26" font-weight="500" letter-spacing="8.32" fill="${accent}">TECH</text>`,
  ].join("");
}

/* -------------------------------------------------------------------------- */
/*  Document wrapper                                                            */
/* -------------------------------------------------------------------------- */

/**
 * @param {{ viewBox: string, title: string, body: string }} o
 * @returns {string}
 */
function svgDocument({ viewBox, title, body }) {
  return (
    `<svg xmlns="${XMLNS}" viewBox="${viewBox}" role="img" ` +
    `shape-rendering="geometricPrecision">` +
    `<title>${escapeXml(title)}</title>` +
    body +
    `</svg>\n`
  );
}

/**
 * @param {string} s
 * @returns {string}
 */
function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* -------------------------------------------------------------------------- */
/*  Export matrix                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The full set of files to generate: filename -> svg string factory.
 * @returns {Array<{ file: string, svg: string, kind: string }>}
 */
export function exportMatrix() {
  /** @type {Array<{ file: string, svg: string, kind: string }>} */
  const out = [];

  // Icon: light + dark across all three gaps.
  for (const theme of /** @type {const} */ (["light", "dark"])) {
    for (const gap of GAP_OPTIONS) {
      out.push({
        file: `niall-tech-mark-${theme}-${gap}.svg`,
        kind: "icon",
        svg: iconSvg({ theme, gap, title: `Niall Tech mark — ${theme}, ${gap} gap` }),
      });
    }
  }

  // Monochrome icon (single file, master gap).
  out.push({
    file: "niall-tech-mark-monochrome.svg",
    kind: "icon",
    svg: iconSvg({ theme: "monochrome", gap: "medium", title: "Niall Tech mark — monochrome" }),
  });

  // Lockups.
  out.push({
    file: "niall-tech-horizontal-light.svg",
    kind: "horizontal",
    svg: horizontalSvg({ theme: "light", title: "Niall Tech horizontal lockup — light" }),
  });
  out.push({
    file: "niall-tech-horizontal-dark.svg",
    kind: "horizontal",
    svg: horizontalSvg({ theme: "dark", title: "Niall Tech horizontal lockup — dark" }),
  });
  out.push({
    file: "niall-tech-stacked-light.svg",
    kind: "stacked",
    svg: stackedSvg({ theme: "light", title: "Niall Tech stacked lockup — light" }),
  });
  out.push({
    file: "niall-tech-stacked-dark.svg",
    kind: "stacked",
    svg: stackedSvg({ theme: "dark", title: "Niall Tech stacked lockup — dark" }),
  });

  return out;
}
