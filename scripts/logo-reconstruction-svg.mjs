/**
 * Niall Tech — reconstruction SVG string builders.
 * ============================================================================
 * Every standalone SVG asset is generated here from the CANONICAL geometry in
 * src/brand/niall-mark-geometry.mjs. No coordinates are duplicated: the three
 * path strings and theme colors come straight from the source of truth.
 *
 * Output rules (spec §11): descriptive <title>, no design-tool metadata, no
 * embedded fonts, no raster data, no groups/filters/gradients, no clipping,
 * two-decimal coordinates, human-readable.
 */
import {
  NIALL_MARK_VIEWBOX,
  NIALL_MARK_PATHS,
  getThemeColors,
} from "../src/brand/niall-mark-geometry.mjs";

const XMLNS = "http://www.w3.org/2000/svg";

/** Escape text for safe inclusion in an SVG <title>. */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * The three mark shapes as <path> elements for a given theme.
 * @param {"light" | "dark" | "monochrome"} theme
 * @returns {string[]}
 */
function markPaths(theme) {
  const { primary, blue } = getThemeColors(theme);
  return [
    `<path d="${NIALL_MARK_PATHS.main}" fill="${primary}" />`,
    `<path d="${NIALL_MARK_PATHS.lowerLeft}" fill="${primary}" />`,
    `<path d="${NIALL_MARK_PATHS.bluePillar}" fill="${blue}" />`,
  ];
}

/**
 * Standalone icon SVG (120×120).
 * @param {"light" | "dark" | "monochrome"} theme
 * @param {string} title
 */
export function buildMarkSvg(theme, title) {
  const paths = markPaths(theme)
    .map((p) => `  ${p}`)
    .join("\n");
  return `<svg xmlns="${XMLNS}" viewBox="${NIALL_MARK_VIEWBOX}" role="img" aria-label="${esc(
    title,
  )}" shape-rendering="geometricPrecision">
  <title>${esc(title)}</title>
${paths}
</svg>
`;
}

/**
 * Wordmark <text> block. Uses a system-safe Inter fallback stack (no embedded
 * font). Colors follow the theme: navy/white NIALL, electric-blue TECH.
 * @param {"light" | "dark"} theme
 * @param {number} x
 * @param {number} yNiall
 * @param {number} yTech
 * @param {"start" | "middle"} anchor
 * @returns {string[]}
 */
function wordmark(theme, x, yNiall, yTech, anchor) {
  const niallFill = theme === "dark" ? "#FFFFFF" : "#0B1320";
  const techFill = getThemeColors(theme).blue;
  const family = "font-family=\"Inter, 'Helvetica Neue', Arial, sans-serif\"";
  return [
    `<text x="${x}" y="${yNiall}" ${family} font-size="46" font-weight="650" letter-spacing="11" text-anchor="${anchor}" fill="${niallFill}">NIALL</text>`,
    `<text x="${x}" y="${yTech}" ${family} font-size="24" font-weight="500" letter-spacing="7.7" text-anchor="${anchor}" fill="${techFill}">TECH</text>`,
  ];
}

/**
 * Horizontal lockup (520×140): icon + divider + wordmark, per spec §9.
 * @param {"light" | "dark"} theme
 */
export function buildHorizontalSvg(theme) {
  const title = `Niall Tech horizontal lockup (${theme})`;
  const divider = theme === "dark" ? "rgba(255,255,255,0.45)" : "#475569";
  const marks = markPaths(theme)
    .map((p) => `    ${p}`)
    .join("\n");
  const words = wordmark(theme, 198, 66, 106, "start")
    .map((t) => `  ${t}`)
    .join("\n");
  return `<svg xmlns="${XMLNS}" viewBox="0 0 520 140" role="img" aria-label="${esc(
    title,
  )}" shape-rendering="geometricPrecision">
  <title>${esc(title)}</title>
  <svg x="12" y="10" width="120" height="120" viewBox="${NIALL_MARK_VIEWBOX}">
${marks}
  </svg>
  <line x1="162" y1="24" x2="162" y2="116" stroke="${divider}" stroke-width="1.5" />
${words}
</svg>
`;
}

/**
 * Stacked lockup (260×330): centered icon over centered wordmark, per spec §10.
 * @param {"light" | "dark"} theme
 */
export function buildStackedSvg(theme) {
  const title = `Niall Tech stacked lockup (${theme})`;
  const marks = markPaths(theme)
    .map((p) => `    ${p}`)
    .join("\n");
  const words = wordmark(theme, 130, 216, 258, "middle")
    .map((t) => `  ${t}`)
    .join("\n");
  return `<svg xmlns="${XMLNS}" viewBox="0 0 260 330" role="img" aria-label="${esc(
    title,
  )}" shape-rendering="geometricPrecision">
  <title>${esc(title)}</title>
  <svg x="70" y="20" width="120" height="120" viewBox="${NIALL_MARK_VIEWBOX}">
${marks}
  </svg>
${words}
</svg>
`;
}

/**
 * The full export set: file name → svg string + metadata.
 * @returns {Array<{ file: string, svg: string, title: string, kind: string, theme: string }>}
 */
export function buildAllSvgs() {
  /** @type {Array<{ file: string, svg: string, title: string, kind: string, theme: string }>} */
  const out = [];
  const marks = [
    ["niall-tech-mark-light.svg", "light", "Niall Tech mark (light)"],
    ["niall-tech-mark-dark.svg", "dark", "Niall Tech mark (dark)"],
    ["niall-tech-mark-monochrome.svg", "monochrome", "Niall Tech mark (monochrome)"],
  ];
  for (const [file, theme, title] of marks) {
    out.push({ file, svg: buildMarkSvg(theme, title), title, kind: "mark", theme });
  }
  for (const theme of ["light", "dark"]) {
    out.push({
      file: `niall-tech-horizontal-${theme}.svg`,
      svg: buildHorizontalSvg(theme),
      title: `Niall Tech horizontal lockup (${theme})`,
      kind: "horizontal",
      theme,
    });
    out.push({
      file: `niall-tech-stacked-${theme}.svg`,
      svg: buildStackedSvg(theme),
      title: `Niall Tech stacked lockup (${theme})`,
      kind: "stacked",
      theme,
    });
  }
  return out;
}
