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

  // Balanced tags (crude but catches malformed output).
  const open = (svg.match(/<svg\b/g) || []).length;
  const close = (svg.match(/<\/svg>/g) || []).length;
  if (open !== 1 || close !== 1) errors.push("unbalanced <svg> tags");

  // Coordinate precision: no more than two decimal places in points.
  const pointMatches = svg.match(/points="([^"]+)"/g) || [];
  for (const m of pointMatches) {
    const nums = m.match(/-?\d+\.\d{3,}/g);
    if (nums) errors.push(`coordinate exceeds 2 decimals: ${nums.join(", ")}`);
  }

  // Polygon point ranges (icon canvas only — lockups translate the glyph).
  if (/viewBox="0 0 120 120"/.test(svg)) {
    for (const m of pointMatches) {
      const inner = m.slice(8, -1);
      for (const pair of inner.trim().split(/\s+/)) {
        const [x, y] = pair.split(",").map(Number);
        if ([x, y].some((n) => Number.isNaN(n))) {
          errors.push(`malformed point: ${pair}`);
        }
      }
    }
  }

  return errors;
}
