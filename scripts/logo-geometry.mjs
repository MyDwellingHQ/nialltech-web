/**
 * Shared Niall Tech logo geometry.
 * ----------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH: the approved mark now lives in
 * `../src/brand/niall-mark-geometry.mjs` (the bold folded-beam "N" — a navy
 * main beam, a navy lower-left pillar, and a tall electric-blue right pillar).
 * This module adapts that canonical geometry into the 100×100 icon coordinate
 * space every downstream generator (SVG masters, PNGs, favicons, avatars,
 * covers, print PDFs) already expects, so promoting the approved mark is a
 * single, lossless mapping — no coordinates are duplicated or redesigned here.
 */

import {
  NIALL_MARK_PATHS as CANONICAL_PATHS,
  CANVAS_SIZE as CANONICAL_CANVAS,
} from "../src/brand/niall-mark-geometry.mjs";

export const COLORS = {
  navy: "#0B1320",
  blue: "#146BFF",
  cyan: "#22C1FF",
  slate: "#475569",
  lightGray: "#E5E7EB",
  white: "#FFFFFF",
  black: "#000000",
};

/** Scale that maps the canonical 120-unit canvas into the 100×100 icon box. */
const CANONICAL_TO_ICON = 100 / CANONICAL_CANVAS;

/** @typedef {'hairline' | 'medium' | 'chamfered'} GapStyle (legacy; ignored) */
/** @typedef {'color' | 'navy' | 'white' | 'black'} ColorMode */

/**
 * @param {ColorMode} mode
 */
export function resolveColors(mode) {
  switch (mode) {
    case "white":
      return { primary: COLORS.white, accent: COLORS.white };
    case "black":
      return { primary: COLORS.black, accent: COLORS.black };
    case "navy":
      return { primary: COLORS.navy, accent: COLORS.navy };
    case "color":
    default:
      return { primary: COLORS.navy, accent: COLORS.blue };
  }
}

/**
 * Renders the approved canonical mark into the 100×100 icon coordinate space.
 * The `gapStyle` argument is retained for call-site compatibility but is now a
 * no-op: the approved mark's negative space is structural (the gaps between the
 * three shapes), not a tunable stroke gap. Paint order matches the canonical
 * source: main beam, lower-left pillar, then the electric-blue right pillar.
 * @param {GapStyle} [gapStyle] retained for signature compatibility (ignored)
 * @param {ColorMode} mode
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- gapStyle kept for call-site compatibility (see doc above)
export function renderIconMarkup(gapStyle = "medium", mode = "color") {
  const { primary, accent } = resolveColors(mode);
  const s = CANONICAL_TO_ICON.toFixed(5);
  return [
    `<g transform="scale(${s})">`,
    `  <path d="${CANONICAL_PATHS.main}" fill="${primary}"/>`,
    `  <path d="${CANONICAL_PATHS.lowerLeft}" fill="${primary}"/>`,
    `  <path d="${CANONICAL_PATHS.bluePillar}" fill="${accent}"/>`,
    `</g>`,
  ].join("\n  ");
}

/**
 * @param {object} opts
 */
export function wrapSvg(opts) {
  const {
    viewBox,
    width,
    height,
    content,
    title = "Niall Tech logo",
  } = opts;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  ${content}
</svg>
`;
}
