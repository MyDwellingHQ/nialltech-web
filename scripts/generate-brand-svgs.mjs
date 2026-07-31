/**
 * Generates all Niall Tech SVG brand masters into public/brand/svg/
 * Master icon geometry: the approved folded-beam N (see logo-geometry.mjs,
 * which maps src/brand/niall-mark-geometry.mjs into the icon coordinate space).
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  COLORS,
  renderIconMarkup,
  wrapSvg,
  resolveColors,
} from "./logo-geometry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SVG_DIR = path.join(ROOT, "public/brand/svg");
const PRINT_DIR = path.join(ROOT, "public/brand/print");

async function write(filePath, contents) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents, "utf8");
  console.log("svg:", path.relative(ROOT, filePath));
}

function iconSvg(mode, gap = "medium", title) {
  return wrapSvg({
    viewBox: "0 0 100 100",
    width: 100,
    height: 100,
    title: title || "Niall Tech icon",
    content: renderIconMarkup(gap, mode),
  });
}

function wordmarkMarkup(mode, { x = 0, y = 58, niallSize = 34, techSize = 34 } = {}) {
  const { primary, accent } = resolveColors(mode);
  // Approximate widths for layout (Inter Bold/Medium uppercase)
  const niall = "NIALL";
  const tech = "TECH";
  return `
  <g font-family="Inter, Arial, Helvetica, sans-serif">
    <text x="${x}" y="${y}" fill="${primary}" font-size="${niallSize}" font-weight="700" letter-spacing="3.2">${niall}</text>
    <text x="${x + niallSize * 3.55}" y="${y}" fill="${accent}" font-size="${techSize}" font-weight="500" letter-spacing="7.5">${tech}</text>
  </g>`;
}

function taglineMarkup(mode, { x = 0, y = 82, size = 11 } = {}) {
  const { primary } = resolveColors(mode === "color" ? "navy" : mode);
  const fill = mode === "color" ? COLORS.slate : primary;
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="500" letter-spacing="3.8">MODERN IT. LOCAL EXPERTISE.</text>`;
}

function horizontalSvg(mode, { tagline = false } = {}) {
  const icon = renderIconMarkup("medium", mode);
  const content = `
  <g transform="translate(0, 10) scale(0.8)">
    ${icon}
  </g>
  ${wordmarkMarkup(mode, { x: 98, y: 62, niallSize: 32, techSize: 32 })}
  ${tagline ? taglineMarkup(mode, { x: 98, y: 88, size: 10 }) : ""}
`;
  return wrapSvg({
    viewBox: tagline ? "0 0 420 110" : "0 0 420 100",
    width: tagline ? 420 : 420,
    height: tagline ? 110 : 100,
    title: tagline
      ? "Niall Tech horizontal logo with tagline"
      : "Niall Tech horizontal logo",
    content,
  });
}

function stackedSvg(mode) {
  const icon = renderIconMarkup("medium", mode);
  const { primary, accent } = resolveColors(mode);
  const content = `
  <g transform="translate(90, 8) scale(0.85)">
    ${icon}
  </g>
  <g font-family="Inter, Arial, Helvetica, sans-serif">
    <text x="118" y="128" fill="${primary}" font-size="28" font-weight="700" letter-spacing="3.2" text-anchor="end">NIALL</text>
    <text x="128" y="128" fill="${accent}" font-size="28" font-weight="500" letter-spacing="6.5" text-anchor="start">TECH</text>
  </g>
`;
  return wrapSvg({
    viewBox: "0 0 280 160",
    width: 280,
    height: 160,
    title: "Niall Tech stacked logo",
    content,
  });
}

function wordmarkOnlySvg(mode = "color") {
  const { primary, accent } = resolveColors(mode);
  const content = `
  <g font-family="Inter, Arial, Helvetica, sans-serif">
    <text x="0" y="48" fill="${primary}" font-size="40" font-weight="700" letter-spacing="3.6">NIALL</text>
    <text x="148" y="48" fill="${accent}" font-size="40" font-weight="500" letter-spacing="8.5">TECH</text>
  </g>`;
  return wrapSvg({
    viewBox: "0 0 360 64",
    width: 360,
    height: 64,
    title: "Niall Tech wordmark",
    content,
  });
}

function vehicleDecalSvg() {
  // High-contrast one-color white mark for dark vehicle panels
  const icon = renderIconMarkup("medium", "white");
  const content = `
  <g transform="translate(20, 24) scale(1.1)">
    ${icon}
  </g>
  <g font-family="Inter, Arial, Helvetica, sans-serif" fill="#FFFFFF">
    <text x="150" y="88" font-size="42" font-weight="700" letter-spacing="4">NIALL</text>
    <text x="318" y="88" font-size="42" font-weight="500" letter-spacing="9">TECH</text>
  </g>
  <text x="150" y="118" fill="#FFFFFF" font-family="Inter, Arial, Helvetica, sans-serif" font-size="12" font-weight="500" letter-spacing="4.2" opacity="0.85">MODERN IT. LOCAL EXPERTISE.</text>
`;
  return wrapSvg({
    viewBox: "0 0 560 150",
    width: 560,
    height: 150,
    title: "Niall Tech vehicle decal",
    content,
  });
}

function embroiderySvg() {
  // Simplified one-color navy mark; structural gaps kept open for stitch clarity
  const content = `
  <g transform="translate(10, 10)">
    ${renderIconMarkup("medium", "navy")}
  </g>
`;
  return wrapSvg({
    viewBox: "0 0 120 120",
    width: 120,
    height: 120,
    title: "Niall Tech embroidery mark",
    content,
  });
}

function printMasterSvg() {
  const icon = renderIconMarkup("medium", "color");
  const content = `
  <g transform="translate(40, 40) scale(1.2)">
    ${icon}
  </g>
  <g font-family="Inter, Arial, Helvetica, sans-serif">
    <text x="190" y="100" fill="${COLORS.navy}" font-size="48" font-weight="700" letter-spacing="4.5">NIALL</text>
    <text x="380" y="100" fill="${COLORS.blue}" font-size="48" font-weight="500" letter-spacing="10">TECH</text>
  </g>
  <text x="190" y="140" fill="${COLORS.slate}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="14" font-weight="500" letter-spacing="4.5">MODERN IT. LOCAL EXPERTISE.</text>
  <g font-family="Inter, Arial, Helvetica, sans-serif" font-size="11" fill="${COLORS.slate}">
    <text x="40" y="220">Print master — RGB reference. Deep Navy ${COLORS.navy} · Electric Blue ${COLORS.blue}</text>
    <text x="40" y="238">Master geometry: approved folded-beam N. Do not outline or recolor without brand approval.</text>
  </g>
`;
  return wrapSvg({
    viewBox: "0 0 700 280",
    width: 700,
    height: 280,
    title: "Niall Tech print logo master",
    content,
  });
}

export async function generateSvgs() {
  await mkdir(SVG_DIR, { recursive: true });
  await mkdir(PRINT_DIR, { recursive: true });

  // Primary icons
  await write(path.join(SVG_DIR, "niall-tech-icon.svg"), iconSvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-icon-dark.svg"), iconSvg("color")); // full color for light bg
  await write(path.join(SVG_DIR, "niall-tech-icon-light.svg"), iconSvg("white")); // reverse for dark bg

  // Horizontal
  await write(path.join(SVG_DIR, "niall-tech-horizontal.svg"), horizontalSvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-horizontal-dark.svg"), horizontalSvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-horizontal-light.svg"), horizontalSvg("white"));
  await write(
    path.join(SVG_DIR, "niall-tech-horizontal-tagline.svg"),
    horizontalSvg("color", { tagline: true }),
  );

  // Stacked
  await write(path.join(SVG_DIR, "niall-tech-stacked.svg"), stackedSvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-stacked-dark.svg"), stackedSvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-stacked-light.svg"), stackedSvg("white"));

  // Wordmark & mono
  await write(path.join(SVG_DIR, "niall-tech-wordmark.svg"), wordmarkOnlySvg("color"));
  await write(path.join(SVG_DIR, "niall-tech-one-color-black.svg"), horizontalSvg("black"));
  await write(path.join(SVG_DIR, "niall-tech-one-color-white.svg"), horizontalSvg("white"));

  // Special use — single source in svg/ (surfaced under Vehicle & embroidery).
  await write(path.join(SVG_DIR, "niall-tech-vehicle-decal.svg"), vehicleDecalSvg());
  await write(path.join(SVG_DIR, "niall-tech-embroidery.svg"), embroiderySvg());

  // Print master sheet (genuine vendor handoff; vehicle/embroidery are NOT
  // duplicated here — the svg/ masters above are the single source).
  await write(path.join(PRINT_DIR, "niall-tech-logo-print.svg"), printMasterSvg());
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  generateSvgs().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
