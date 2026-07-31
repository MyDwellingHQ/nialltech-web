/**
 * Niall Tech — Logo Reconstruction automated geometry tests
 *
 *   node scripts/test-logo-reconstruction.mjs
 *
 * Dependency-free assertions covering the spec's acceptance criteria for the
 * three-shape folded-beam construction.
 */

import {
  CANVAS_SIZE,
  NIALL_MARK_PATHS,
  MARK_VERTICES,
  BOUNDING_BOX,
  getThemeColors,
  getBoundingBox,
  parsePathVertices,
} from "../src/brand/niall-mark-geometry.mjs";
import {
  buildMarkSvg,
  buildHorizontalSvg,
  buildStackedSvg,
  buildAllSvgs,
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

// Three canonical shapes exist and are non-empty path strings.
for (const id of ["main", "lowerLeft", "bluePillar"]) {
  assert(`path "${id}" is a non-empty string`, typeof NIALL_MARK_PATHS[id] === "string" && NIALL_MARK_PATHS[id].length > 0);
}

// All vertices inside the canvas.
for (const [id, poly] of Object.entries(MARK_VERTICES)) {
  assert(`${id}: all points within 0–120`, allInCanvas(poly), JSON.stringify(poly));
}

// Vertex counts derived from the paths.
assert("main has 6 vertices", MARK_VERTICES.main.length === 6, `${MARK_VERTICES.main.length}`);
assert("lowerLeft has 6 vertices", MARK_VERTICES.lowerLeft.length === 6, `${MARK_VERTICES.lowerLeft.length}`);
assert("bluePillar has 5 vertices", MARK_VERTICES.bluePillar.length === 5, `${MARK_VERTICES.bluePillar.length}`);

// Bounding box within canvas and matches recomputed value.
const bb = getBoundingBox();
assert(
  "bounding box within canvas",
  bb.minX >= 0 && bb.minY >= 0 && bb.maxX <= 120 && bb.maxY <= 120,
  JSON.stringify(bb),
);
assert(
  "cached BOUNDING_BOX matches recompute",
  bb.minX === BOUNDING_BOX.minX && bb.maxX === BOUNDING_BOX.maxX && bb.maxY === BOUNDING_BOX.maxY,
);

// The main beam runs upper-left to lower-right (forward lean).
const mainXs = MARK_VERTICES.main.map((p) => p[0]);
const mainYs = MARK_VERTICES.main.map((p) => p[1]);
assert("main beam starts near top-left", Math.min(...mainYs) <= 6 && Math.min(...mainXs) <= 10);
assert("main beam reaches lower-right", Math.max(...mainXs) >= 108 && Math.max(...mainYs) >= 112);

// Blue pillar is the rightmost & upper shape.
const blueMaxX = Math.max(...MARK_VERTICES.bluePillar.map((p) => p[0]));
const lowerLeftMaxX = Math.max(...MARK_VERTICES.lowerLeft.map((p) => p[0]));
assert("blue pillar is rightmost shape", blueMaxX > lowerLeftMaxX);

// Path parser round-trips a simple path.
const rt = parsePathVertices("M0 0H10V10Z");
assert(
  "parser handles H/V/Z",
  rt.length === 3 && rt[0][0] === 0 && rt[1][0] === 10 && rt[2][1] === 10,
  JSON.stringify(rt),
);

// Theme color contract.
assert("light primary is navy", getThemeColors("light").primary === "#0B1320");
assert("light blue is electric blue", getThemeColors("light").blue === "#146BFF");
assert("dark primary is white", getThemeColors("dark").primary === "#FFFFFF");
assert("dark blue is electric blue", getThemeColors("dark").blue === "#146BFF");
assert(
  "monochrome uses currentColor for both fills",
  getThemeColors("monochrome").primary === "currentColor" &&
    getThemeColors("monochrome").blue === "currentColor",
);

// Light vs dark: identical geometry, only fills differ.
const lightSvg = buildMarkSvg("light", "t");
const darkSvg = buildMarkSvg("dark", "t");
const stripFills = (s) => s.replace(/fill="[^"]*"/g, 'fill="_"');
assert("light & dark share identical geometry", stripFills(lightSvg) === stripFills(darkSvg));
assert("light & dark differ only in fills", lightSvg !== darkSvg);

// Monochrome SVG: every fill is currentColor.
const monoSvg = buildMarkSvg("monochrome", "m");
const monoFills = [...monoSvg.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]);
assert(
  "monochrome fills all currentColor",
  monoFills.length === 3 && monoFills.every((f) => f === "currentColor"),
  monoFills.join(","),
);

// Every generated SVG passes the strict contract.
const matrix = [
  ...buildAllSvgs(),
  { file: "horizontal-light", svg: buildHorizontalSvg("light") },
  { file: "stacked-light", svg: buildStackedSvg("light") },
];
for (const { file, svg } of matrix) {
  const errors = validateSvg(svg);
  assert(`SVG valid: ${file}`, errors.length === 0, errors.join("; "));
  assert(`SVG has viewBox: ${file}`, /viewBox=/.test(svg));
  assert(`SVG has title: ${file}`, /<title>[^<]+<\/title>/.test(svg));
  assert(`SVG has path geometry: ${file}`, /<path\s+d="/.test(svg));
  assert(`SVG has no raster: ${file}`, !/<image\b/i.test(svg));
  assert(`SVG has no gradient/filter: ${file}`, !/gradient|<filter/i.test(svg));
}

// Export set is exactly the expected 7 files.
const files = buildAllSvgs().map((s) => s.file).sort();
const expected = [
  "niall-tech-horizontal-dark.svg",
  "niall-tech-horizontal-light.svg",
  "niall-tech-mark-dark.svg",
  "niall-tech-mark-light.svg",
  "niall-tech-mark-monochrome.svg",
  "niall-tech-stacked-dark.svg",
  "niall-tech-stacked-light.svg",
].sort();
assert("export set matches expected 7 files", JSON.stringify(files) === JSON.stringify(expected), files.join(", "));

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
