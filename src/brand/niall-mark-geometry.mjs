/**
 * Niall Tech — CANONICAL MARK GEOMETRY (single source of truth)
 * ============================================================================
 * Rebuilt to match the APPROVED brand-board reference: a bold, architectural,
 * forward-leaning "N" constructed from three flat polygon shapes on parallel
 * 45-degree diagonals — NOT a thin monogram, font glyph, stroke, or skew.
 *
 *   1. main       — one continuous folded beam: upper-left cap + thick
 *                   45-degree diagonal + lower-right termination.
 *   2. lowerLeft  — the separate lower-left pillar (chamfered base).
 *   3. bluePillar — the tall electric-blue upper-right structural column.
 *
 * The intentional negative-space channels (left channel between the beam and
 * the lower-left pillar, and the channel between the blue pillar and the
 * diagonal) are STRUCTURAL — they are the gaps between shapes, so no mask or
 * cutout is required.
 *
 * Every React component and every exported asset MUST consume these paths.
 * Do not duplicate or re-derive the coordinates anywhere else.
 */

/** Canonical coordinate system. */
export const CANVAS_SIZE = 120;
export const NIALL_MARK_VIEWBOX = "0 0 120 120";

/** Spec construction constants (documented for the review overlay). */
export const CONSTANTS = Object.freeze({
  TOP_Y: 5,
  BOTTOM_Y: 116,
  STRUCTURAL_THICKNESS: 27,
  BLUE_PILLAR_WIDTH: 24,
  FORWARD_RHYTHM_DEG: 45,
});

/**
 * The three canonical path definitions. These strings are the authoritative
 * geometry — all other representations (vertices, SVG files, React paths)
 * derive from them.
 */
export const NIALL_MARK_PATHS = Object.freeze({
  main: "M8 5H35L112 82V115H85L8 38Z",
  lowerLeft: "M8 49L35 76V112L31 116H12L8 112Z",
  bluePillar: "M88 5H108L112 9V70L88 46Z",
});

/** Brand colors (exact). */
export const COLORS = Object.freeze({
  navy: "#0B1320",
  electricBlue: "#146BFF",
  electricBlueDigital: "#176BFF",
  white: "#FFFFFF",
  slate: "#475569",
});

// Back-compat named exports used around the reconstruction tree.
export const NAVY = COLORS.navy;
export const ELECTRIC_BLUE = COLORS.electricBlue;
export const WHITE = COLORS.white;
export const SLATE = COLORS.slate;

/** CSS custom-property names the React component binds fills to. */
export const CSS_VARS = Object.freeze({
  primary: "--niall-mark-primary",
  blue: "--niall-mark-blue",
});

/**
 * Resolve the two fill colors for a theme.
 * @param {"light" | "dark" | "monochrome"} theme
 * @returns {{ primary: string, blue: string }}
 */
export function getThemeColors(theme) {
  if (theme === "dark") return { primary: COLORS.white, blue: COLORS.electricBlue };
  if (theme === "monochrome") return { primary: "currentColor", blue: "currentColor" };
  return { primary: COLORS.navy, blue: COLORS.electricBlue };
}

/**
 * Minimal absolute-command path parser (M/L/H/V/Z only — the commands used by
 * the canonical paths). Returns the ring vertices, excluding the implicit
 * close. Used for the construction overlay and geometry validation so vertices
 * are never hand-duplicated.
 * @param {string} d
 * @returns {Array<[number, number]>}
 */
export function parsePathVertices(d) {
  const tokens = d.match(/[MLHVZ]|-?\d*\.?\d+/g) || [];
  /** @type {Array<[number, number]>} */
  const pts = [];
  let i = 0;
  let cx = 0;
  let cy = 0;
  let cmd = null;
  while (i < tokens.length) {
    const t = tokens[i];
    if (/[MLHVZ]/.test(t)) {
      cmd = t;
      i++;
      continue;
    }
    if (cmd === "M" || cmd === "L") {
      cx = parseFloat(tokens[i++]);
      cy = parseFloat(tokens[i++]);
      pts.push([cx, cy]);
    } else if (cmd === "H") {
      cx = parseFloat(tokens[i++]);
      pts.push([cx, cy]);
    } else if (cmd === "V") {
      cy = parseFloat(tokens[i++]);
      pts.push([cx, cy]);
    } else {
      i++;
    }
  }
  return pts;
}

/** Vertices for each shape, derived once from the canonical paths. */
export const MARK_VERTICES = Object.freeze({
  main: parsePathVertices(NIALL_MARK_PATHS.main),
  lowerLeft: parsePathVertices(NIALL_MARK_PATHS.lowerLeft),
  bluePillar: parsePathVertices(NIALL_MARK_PATHS.bluePillar),
});

/**
 * Axis-aligned bounding box across all three shapes.
 * @returns {{ minX: number, minY: number, maxX: number, maxY: number }}
 */
export function getBoundingBox() {
  const all = [...MARK_VERTICES.main, ...MARK_VERTICES.lowerLeft, ...MARK_VERTICES.bluePillar];
  return {
    minX: Math.min(...all.map((p) => p[0])),
    minY: Math.min(...all.map((p) => p[1])),
    maxX: Math.max(...all.map((p) => p[0])),
    maxY: Math.max(...all.map((p) => p[1])),
  };
}

export const BOUNDING_BOX = Object.freeze(getBoundingBox());

/** Optical center per spec (approximately 57, 60). */
export const OPTICAL_CENTER = Object.freeze({ x: 57, y: 60 });

/** Clear space = 0.20 × icon height = 24 units. */
export const CLEAR_SPACE = Math.round(0.2 * CANVAS_SIZE);

/** Documented proportional ratios (spec §9). */
export const RATIOS = Object.freeze({
  artworkWidth: 104,
  artworkHeight: 111,
  widthToHeight: +(104 / 111).toFixed(4),
  structuralThicknessPct: +((27 / 104) * 100).toFixed(2),
  bluePillarWidthPct: +((24 / 104) * 100).toFixed(2),
  leftChannelPct: +((11 / 111) * 100).toFixed(2),
  bluePillarHeightPct: +((65 / 111) * 100).toFixed(2),
  lowerLeftPillarHeightPct: +((67 / 111) * 100).toFixed(2),
});

/**
 * Structural negative-space channels. Both edges follow the same 45-degree
 * direction, so the perpendicular separation ≈ vertical / √2.
 */
export const NEGATIVE_SPACE = Object.freeze({
  leftChannel: {
    label: "Left channel (beam ↔ lower-left pillar)",
    verticalUnits: 11,
    perpendicularUnits: +(11 / Math.SQRT2).toFixed(2),
    measuredAtX: 8,
  },
  blueChannel: {
    label: "Blue channel (pillar ↔ diagonal)",
    verticalUnits: 12,
    perpendicularUnits: +(12 / Math.SQRT2).toFixed(2),
    measuredAtX: 88,
  },
});

/** Minimum sizes (documentation). */
export const MIN_SIZES = Object.freeze({
  digitalPx: 24,
  faviconPx: 16,
  printInches: 0.25,
  embroideryInches: 0.5,
});
