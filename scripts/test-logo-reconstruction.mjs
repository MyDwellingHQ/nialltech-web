/**
 * Niall Tech — Logo Reconstruction automated geometry tests
 *
 *   node scripts/test-logo-reconstruction.mjs
 *
 * Dependency-free assertions covering the spec's acceptance criteria.
 */

import {
  logoGeometry,
  CANVAS_SIZE,
  GAP_OPTIONS,
  getGapGeometry,
  getThemeColors,
} from "../src/components/brand/logo-reconstruction/logo-geometry.mjs";
import {
  iconSvg,
  horizontalSvg,
  stackedSvg,
  exportMatrix,
  glyphMarkup,
} from "./logo-reconstruction-svg.mjs";
import { validateSvg } from "./validate-logo-reconstruction.mjs";

let passed = 0;
let failed = 0;

/**
 * @param {string} name
 * @param {boolean} cond
 * @param {string} [detail]
 */
function assert(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ok  ${name}`);
  } else {
    failed++;
    console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

/** @param {ReadonlyArray<readonly [number, number]>} poly */
function allInCanvas(poly) {
  return poly.every(([x, y]) => x >= 0 && x <= CANVAS_SIZE && y >= 0 && y <= CANVAS_SIZE);
}

console.log("Geometry tests\n");

// Point ranges.
const strokes = { leftStem: logoGeometry.leftStem, rightStem: logoGeometry.rightStem, diagonal: logoGeometry.diagonal };
for (const [name, poly] of Object.entries(strokes)) {
  assert(`${name}: all points within 0–120`, allInCanvas(poly));
}
for (const gap of GAP_OPTIONS) {
  assert(`gap ${gap}: all points within 0–120`, allInCanvas(getGapGeometry(gap)));
}

// Point counts.
assert("left stem has 4 points", logoGeometry.leftStem.length === 4);
assert("right stem has 4 points", logoGeometry.rightStem.length === 4);
assert("diagonal has 4 points", logoGeometry.diagonal.length === 4);
assert("hairline gap has 4 points", getGapGeometry("hairline").length === 4);
assert("medium gap has 4 points", getGapGeometry("medium").length === 4);
assert("chamfered gap has 6 points", getGapGeometry("chamfered").length === 6);

// Gap validity (each point is a finite [x,y] pair).
for (const gap of GAP_OPTIONS) {
  const valid = getGapGeometry(gap).every(
    (p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite),
  );
  assert(`gap ${gap}: valid point pairs`, valid);
}

// Bounding box does not exceed canvas.
const allPts = [...logoGeometry.leftStem, ...logoGeometry.rightStem, ...logoGeometry.diagonal];
const maxX = Math.max(...allPts.map((p) => p[0]));
const maxY = Math.max(...allPts.map((p) => p[1]));
const minX = Math.min(...allPts.map((p) => p[0]));
const minY = Math.min(...allPts.map((p) => p[1]));
assert("bounding box within canvas", minX >= 0 && minY >= 0 && maxX <= 120 && maxY <= 120, `box=${minX},${minY},${maxX},${maxY}`);

// Diagonal runs upper-left to lower-right.
const dTop = logoGeometry.diagonal[0];
const dBottom = logoGeometry.diagonal[2];
assert("diagonal runs upper-left to lower-right", dTop[1] < dBottom[1] && dTop[0] < dBottom[0]);

// Blue pillar is the right stem (rightmost stroke).
const rightMax = Math.max(...logoGeometry.rightStem.map((p) => p[0]));
const leftMax = Math.max(...logoGeometry.leftStem.map((p) => p[0]));
assert("right stem is rightmost stroke (blue pillar)", rightMax > leftMax);

// Light vs dark: identical geometry, only fills differ.
const lightSvg = iconSvg({ theme: "light", gap: "medium", title: "t" });
const darkSvg = iconSvg({ theme: "dark", gap: "medium", title: "t" });
const stripFills = (s) => s.replace(/fill="[^"]*"/g, 'fill="_"');
assert("light & dark share identical geometry", stripFills(lightSvg) === stripFills(darkSvg));
assert("light & dark differ only in fills", lightSvg !== darkSvg);

// Monochrome uses only currentColor.
const monoInner = glyphMarkup({ theme: "monochrome", gap: "medium", idPrefix: "m" });
const monoFills = [...monoInner.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]).filter((f) => f !== "#fff" && f !== "#000");
assert("monochrome fills are all currentColor", monoFills.length > 0 && monoFills.every((f) => f === "currentColor"), monoFills.join(","));

// Theme color contract.
assert("light primary is navy", getThemeColors("light").primary === "#0B1320");
assert("dark primary is white", getThemeColors("dark").primary === "#FFFFFF");
assert("accent is electric blue in light & dark",
  getThemeColors("light").accent === "#146BFF" && getThemeColors("dark").accent === "#146BFF");

// Every generated SVG passes the strict contract.
const matrix = [
  ...exportMatrix(),
  { file: "horizontal-light", svg: horizontalSvg({ theme: "light", title: "h" }) },
  { file: "stacked-light", svg: stackedSvg({ theme: "light", title: "s" }) },
];
for (const { file, svg } of matrix) {
  const errors = validateSvg(svg);
  assert(`SVG valid: ${file}`, errors.length === 0, errors.join("; "));
  assert(`SVG has viewBox: ${file}`, /viewBox=/.test(svg));
  assert(`SVG has title: ${file}`, /<title>[^<]+<\/title>/.test(svg));
  assert(`SVG has no raster: ${file}`, !/<image\b/i.test(svg));
  assert(`SVG has no gradient/filter: ${file}`, !/gradient|<filter/i.test(svg));
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
