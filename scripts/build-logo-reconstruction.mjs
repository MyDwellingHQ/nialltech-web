/**
 * Niall Tech — Logo Reconstruction build script
 *
 *   npm run brand:logo-reconstruction
 *
 * Generates every static SVG from the canonical geometry, validates each one,
 * optionally rasterizes PNG previews, writes a manifest with checksums, and
 * bundles everything into a ZIP. Touches ONLY the logo-reconstruction output
 * directory — the production brand build is never modified.
 */

import { mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { exportMatrix } from "./logo-reconstruction-svg.mjs";
import { validateSvg } from "./validate-logo-reconstruction.mjs";
import {
  NAVY,
  ELECTRIC_BLUE,
  WHITE,
  MASTER_GAP,
  CANVAS_SIZE,
} from "../src/components/brand/logo-reconstruction/logo-geometry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "brand", "logo-reconstruction");
const SVG_DIR = path.join(OUT_DIR, "svg");
const PNG_DIR = path.join(OUT_DIR, "png");

const PNG_SIZES = [16, 24, 32, 48, 64, 128, 256, 512, 1024];

async function main() {
  const skipPng = process.argv.includes("--no-png");
  console.log("[logo-reconstruction] Starting build");

  // Fresh output dirs (only our reconstruction subtree).
  await rm(SVG_DIR, { recursive: true, force: true });
  await rm(PNG_DIR, { recursive: true, force: true });
  await mkdir(SVG_DIR, { recursive: true });

  const matrix = exportMatrix();
  const manifestFiles = [];
  let failures = 0;

  for (const { file, svg, kind } of matrix) {
    const errors = validateSvg(svg);
    if (errors.length) {
      failures += errors.length;
      console.error(`[FAIL] ${file}`);
      for (const e of errors) console.error(`        - ${e}`);
      continue;
    }
    const target = path.join(SVG_DIR, file);
    await writeFile(target, svg, "utf8");
    manifestFiles.push({
      file: `svg/${file}`,
      kind,
      bytes: Buffer.byteLength(svg, "utf8"),
      sha256: createHash("sha256").update(svg).digest("hex"),
    });
    console.log(`[ok]   svg/${file}`);
  }

  if (failures > 0) {
    console.error(`\n[logo-reconstruction] ${failures} validation error(s). Aborting.`);
    process.exit(1);
  }

  // Optional PNG previews of the master icon (light + dark, master gap).
  const pngRecords = [];
  if (!skipPng) {
    let Resvg;
    try {
      ({ Resvg } = await import("@resvg/resvg-js"));
    } catch {
      console.warn("[logo-reconstruction] @resvg/resvg-js unavailable — skipping PNG previews");
    }
    if (Resvg) {
      await mkdir(PNG_DIR, { recursive: true });
      for (const theme of ["light", "dark"]) {
        const svgPath = path.join(SVG_DIR, `niall-tech-mark-${theme}-${MASTER_GAP}.svg`);
        const svg = await readFile(svgPath, "utf8");
        for (const size of PNG_SIZES) {
          const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
          const png = resvg.render().asPng();
          const name = `niall-tech-mark-${theme}-${size}.png`;
          await writeFile(path.join(PNG_DIR, name), png);
          pngRecords.push({ file: `png/${name}`, bytes: png.length, size, theme });
        }
      }
      console.log(`[ok]   ${pngRecords.length} PNG preview(s)`);
    }
  }

  // Manifest.
  const manifest = {
    project: "niall-tech",
    artifact: "logo-reconstruction",
    generatedAt: new Date().toISOString(),
    status: "approval-candidate",
    canvas: `${CANVAS_SIZE}x${CANVAS_SIZE}`,
    masterGap: MASTER_GAP,
    colors: { navy: NAVY, electricBlue: ELECTRIC_BLUE, white: WHITE },
    svg: manifestFiles,
    png: pngRecords,
  };
  const manifestStr = JSON.stringify(manifest, null, 2);
  await writeFile(path.join(OUT_DIR, "manifest.json"), manifestStr + "\n", "utf8");
  console.log("[ok]   manifest.json");

  // ZIP (svg + png + manifest).
  await createZip(OUT_DIR, path.join(OUT_DIR, "niall-tech-logo-reconstruction.zip"), pngRecords.length > 0);

  console.log(`\n[logo-reconstruction] Done — ${manifestFiles.length} SVG, ${pngRecords.length} PNG`);
}

/**
 * @param {string} baseDir
 * @param {string} zipPath
 * @param {boolean} includePng
 */
async function createZip(baseDir, zipPath, includePng) {
  let ZipArchive;
  try {
    ({ ZipArchive } = await import("archiver"));
  } catch {
    console.warn("[logo-reconstruction] archiver unavailable — skipping ZIP");
    return;
  }
  await new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(path.join(baseDir, "svg"), "svg");
    if (includePng) archive.directory(path.join(baseDir, "png"), "png");
    archive.file(path.join(baseDir, "manifest.json"), { name: "manifest.json" });
    archive.finalize();
  });
  console.log("[ok]   niall-tech-logo-reconstruction.zip");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
