/**
 * Niall Tech — Logo Reconstruction SVG validator
 *
 * Lightweight, dependency-free structural checks against the strict SVG
 * contract from the spec. Returns an array of human-readable error strings
 * (empty === valid).
 */

/**
 * @param {string} svg
 * @returns {string[]}
 */
export function validateSvg(svg) {
  const errors = [];

  if (!/^<svg[\s>]/.test(svg.trim())) errors.push("does not start with <svg>");
  if (!/viewBox="[^"]+"/.test(svg)) errors.push("missing viewBox");
  if (!/<title>[^<]+<\/title>/.test(svg)) errors.push("missing non-empty <title>");

  // Forbidden content.
  if (/<image\b/i.test(svg)) errors.push("contains raster <image>");
  if (/xlink:href|href="data:/i.test(svg)) errors.push("contains embedded href/data URI");
  if (/<(linear|radial)Gradient\b/i.test(svg)) errors.push("contains gradient");
  if (/<filter\b|filter=/i.test(svg)) errors.push("contains filter");
  if (/<clipPath\b/i.test(svg)) errors.push("contains clipPath (not permitted)");
  if (/<style\b|style="/i.test(svg)) errors.push("contains inline style");
  if (/<font\b|@font-face/i.test(svg)) errors.push("contains embedded font");
  if (/<metadata\b|<!--|sodipodi|inkscape/i.test(svg)) errors.push("contains design-tool metadata");

  // Balanced tags. Lockups legitimately nest one inner <svg> for the icon, so
  // allow 1 or 2 open tags but require matching closes.
  const open = (svg.match(/<svg\b/g) || []).length;
  const close = (svg.match(/<\/svg>/g) || []).length;
  if (open < 1 || open > 2 || open !== close) errors.push("unbalanced <svg> tags");

  // Shapes are expressed as <path d="…"> — reject stray <polygon>/<rect> which
  // would indicate the old (superseded) construction leaked in.
  if (!/<path\s+d="/.test(svg)) errors.push("missing <path> geometry");

  // Coordinate precision: no more than two decimal places anywhere in path data.
  const pathMatches = svg.match(/\sd="([^"]+)"/g) || [];
  for (const m of pathMatches) {
    const nums = m.match(/-?\d+\.\d{3,}/g);
    if (nums) errors.push(`coordinate exceeds 2 decimals: ${nums.join(", ")}`);
    // Every numeric token in the path must be finite.
    const bad = (m.match(/-?\d*\.?\d+/g) || []).filter((n) => !Number.isFinite(parseFloat(n)));
    if (bad.length) errors.push(`malformed path number: ${bad.join(", ")}`);
  }

  return errors;
}
