/**
 * Niall Tech — Logo Reconstruction
 * CANONICAL GEOMETRY (single source of truth)
 *
 * This framework-free module holds every coordinate for the reconstructed
 * mark. It is consumed by:
 *   - logo-geometry.ts        (typed re-export for React components)
 *   - build-logo-reconstruction.mjs (static SVG / PNG / ZIP generation)
 *   - test-logo-reconstruction.mjs  (automated geometry validation)
 *
 * Coordinates are NEVER duplicated anywhere else. All artwork derives from
 * the polygons below on a canonical 0 0 120 120 canvas.
 */

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const CANVAS_SIZE = 120;
export const TOP_Y = 16;
export const BOTTOM_Y = 104;
export const STROKE_WIDTH = 18;
export const FORWARD_LEAN = 8;

export const NAVY = "#0B1320";
export const ELECTRIC_BLUE = "#146BFF";
export const WHITE = "#FFFFFF";
export const SLATE = "#475569";

/** Optical center of the mark (documented reference point). */
export const OPTICAL_CENTER = { x: 57, y: 60 };

/** Nominal bounding box the mark occupies. */
export const BOUNDING_BOX = { minX: 12, minY: 16, maxX: 102, maxY: 104 };

/** Clear space = 0.20 x icon height. */
export const CLEAR_SPACE = Math.round(0.2 * CANVAS_SIZE); // 24

/* -------------------------------------------------------------------------- */
/*  Master geometry                                                            */
/* -------------------------------------------------------------------------- */

export const logoGeometry = {
  canvas: CANVAS_SIZE,
  topY: TOP_Y,
  bottomY: BOTTOM_Y,
  strokeWidth: STROKE_WIDTH,
  forwardLean: FORWARD_LEAN,

  // Navy left stem (forward lean at the top).
  leftStem: [
    [20, 16],
    [38, 16],
    [30, 104],
    [12, 104],
  ],

  // Electric-blue right stem / pillar (the defining element).
  rightStem: [
    [84, 16],
    [102, 16],
    [94, 104],
    [76, 104],
  ],

  // Navy diagonal, upper-left to lower-right.
  diagonal: [
    [25, 16],
    [43, 16],
    [91, 104],
    [73, 104],
  ],

  // Intentional upper-left negative-space cutout, three reviewable options.
  gaps: {
    hairline: [
      [32, 16],
      [34, 16],
      [31.8, 42],
      [29.8, 42],
    ],
    medium: [
      [31, 16],
      [35, 16],
      [32.6, 43],
      [28.6, 43],
    ],
    chamfered: [
      [30.5, 16],
      [35.5, 16],
      [33.2, 39],
      [31.2, 44],
      [27.8, 44],
      [29.8, 39],
    ],
  },
};

/** Provisional master gap option (not promoted to production until approved). */
export const MASTER_GAP = "medium";

/** All gap option keys. */
export const GAP_OPTIONS = ["hairline", "medium", "chamfered"];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Serialize a polygon (array of [x, y]) into an SVG `points` string,
 * rounding to at most two decimal places.
 * @param {ReadonlyArray<readonly [number, number]>} polygon
 * @returns {string}
 */
export function pointsToSvg(polygon) {
  return polygon
    .map(([x, y]) => `${round2(x)},${round2(y)}`)
    .join(" ");
}

/**
 * Return the cutout polygon for a given gap option.
 * @param {"hairline" | "medium" | "chamfered"} option
 * @returns {ReadonlyArray<readonly [number, number]>}
 */
export function getGapGeometry(option) {
  const gap = logoGeometry.gaps[option];
  if (!gap) {
    throw new Error(`Unknown gap option: ${option}`);
  }
  return gap;
}

/**
 * Theme color resolution. Geometry is identical across themes — only fills
 * change. Monochrome uses currentColor for both primary and accent.
 * @param {"light" | "dark" | "monochrome"} theme
 * @returns {{ primary: string; accent: string }}
 */
export function getThemeColors(theme) {
  switch (theme) {
    case "dark":
      return { primary: WHITE, accent: ELECTRIC_BLUE };
    case "monochrome":
      return { primary: "currentColor", accent: "currentColor" };
    case "light":
    default:
      return { primary: NAVY, accent: ELECTRIC_BLUE };
  }
}

/**
 * Small-size optical corrections (for display below 32 CSS px):
 *   - Gap reduced 25% (scaled horizontally about its centroid).
 *   - Blue pillar expanded 0.75 units toward the left.
 *   - Navy/white diagonal expanded 0.5 units on both slanted edges.
 * Stroke proportions of the stems are otherwise preserved.
 * @param {"hairline" | "medium" | "chamfered"} [gapOption]
 * @returns {{
 *   leftStem: ReadonlyArray<readonly [number, number]>,
 *   rightStem: ReadonlyArray<readonly [number, number]>,
 *   diagonal: ReadonlyArray<readonly [number, number]>,
 *   gap: ReadonlyArray<readonly [number, number]>,
 * }}
 */
export function getSmallSizeGeometry(gapOption = MASTER_GAP) {
  // Blue pillar: move the two left-edge vertices 0.75 units left.
  // rightStem left edge = points at index 0 (top-left) and 3 (bottom-left).
  const rightStem = logoGeometry.rightStem.map(([x, y], i) =>
    i === 0 || i === 3 ? [round2(x - 0.75), y] : [x, y],
  );

  // Diagonal: widen 0.5 on each slanted edge.
  // Left edge  = index 0 (top-left) + index 3 (bottom-left)  -> move left.
  // Right edge = index 1 (top-right) + index 2 (bottom-right) -> move right.
  const diagonal = logoGeometry.diagonal.map(([x, y], i) => {
    if (i === 0 || i === 3) return [round2(x - 0.5), y];
    return [round2(x + 0.5), y];
  });

  // Gap: reduce width 25% by scaling horizontally about its centroid.
  const gap = scaleHorizontallyAboutCentroid(getGapGeometry(gapOption), 0.75);

  return {
    leftStem: logoGeometry.leftStem,
    rightStem,
    diagonal,
    gap,
  };
}

/* ------------------------------ internal ---------------------------------- */

/**
 * @param {number} n
 * @returns {number}
 */
export function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * @param {ReadonlyArray<readonly [number, number]>} polygon
 * @param {number} factor
 * @returns {Array<[number, number]>}
 */
function scaleHorizontallyAboutCentroid(polygon, factor) {
  const cx = polygon.reduce((sum, [x]) => sum + x, 0) / polygon.length;
  return polygon.map(([x, y]) => [round2(cx + (x - cx) * factor), y]);
}
