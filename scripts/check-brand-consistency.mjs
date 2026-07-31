#!/usr/bin/env node
/**
 * Brand asset consistency audit.
 * ---------------------------------------------------------------------------
 * Fails (non-zero exit) when the /brand asset hub diverges from reality.
 * Cross-checks FIVE sources:
 *   1. the structured registry  (src/data/brand-assets.data.mjs)
 *   2. the generated files       (public/brand/**)
 *   3. the manifest              (public/brand/asset-index.json)
 *   4. the complete ZIP          (public/brand/niall-tech-brand-assets.zip)
 *   5. the site favicon metadata (src/app/layout.tsx)
 *
 * Failure conditions (per the audit spec):
 *   A. a registry asset path (or preview) does not exist on disk        → 404
 *   B. a generated asset in the manifest is absent from the registry
 *   C. the ZIP omits an approved asset category
 *   D. a favicon referenced by site metadata is absent from the registry
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  brandAssets,
  brandAssetSections,
} from "../src/data/brand-assets.data.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const BRAND = path.join(PUBLIC, "brand");
const MANIFEST = path.join(BRAND, "asset-index.json");
const ZIP = path.join(BRAND, "niall-tech-brand-assets.zip");
const LAYOUT = path.join(ROOT, "src/app/layout.tsx");

/** Every asset category that MUST be represented inside the complete ZIP. */
const REQUIRED_ZIP_DIRS = [
  "svg",
  "png",
  "favicon",
  "social",
  "print",
  "collateral",
  "office",
  "email",
];

const failures = [];
const warnings = [];
const fail = (code, msg) => failures.push({ code, msg });
const warn = (msg) => warnings.push(msg);

/** Resolve a public web path ("/brand/...") to an absolute fs path. */
const toFsPath = (webPath) => path.join(PUBLIC, webPath.replace(/^\//, ""));

// ---------------------------------------------------------------------------
// Load sources
// ---------------------------------------------------------------------------
const registryPaths = new Set(brandAssets.map((a) => a.path));
// A generated file is "surfaced" on /brand if it is downloadable (a card
// `path`) OR shown as a card `preview` image. Both count as coverage so raster
// previews of PDF collateral don't register as orphaned assets.
const surfacedPaths = new Set([
  ...brandAssets.map((a) => a.path),
  ...brandAssets.map((a) => a.preview).filter(Boolean),
]);

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const manifestPaths = manifest.assets.map((a) => a.path);

let zipEntries = [];
try {
  zipEntries = execSync(`unzip -Z1 "${ZIP}"`, { encoding: "utf8" })
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
} catch {
  fail("ZIP", `Could not read ZIP at ${ZIP} (run "npm run brand:all").`);
}
const zipTopDirs = new Set(
  zipEntries.map((e) => e.split("/")[0]).filter(Boolean),
);

const layoutSrc = readFileSync(LAYOUT, "utf8");
const faviconMetaPaths = [
  ...new Set(
    (layoutSrc.match(/\/brand\/favicon\/[A-Za-z0-9/_.-]+/g) || []).concat(
      layoutSrc.match(/\/[A-Za-z0-9/_.-]+\.webmanifest/g) || [],
    ),
  ),
];

// ---------------------------------------------------------------------------
// A. Every registry asset (path + preview) must exist on disk
// ---------------------------------------------------------------------------
for (const asset of brandAssets) {
  if (!asset.path || !asset.path.startsWith("/")) {
    fail("REGISTRY", `Asset "${asset.id}" has an invalid path: ${asset.path}`);
    continue;
  }
  if (!existsSync(toFsPath(asset.path))) {
    fail("404", `Registry asset "${asset.id}" → ${asset.path} does not exist on disk.`);
  }
  // Previews that point at real files (svg/png) must exist too.
  if (asset.preview && asset.preview.startsWith("/") && !existsSync(toFsPath(asset.preview))) {
    fail("404", `Preview for "${asset.id}" → ${asset.preview} does not exist on disk.`);
  }
}

// ---------------------------------------------------------------------------
// B. Every generated (manifest) asset must be present in the registry
// ---------------------------------------------------------------------------
for (const mp of manifestPaths) {
  if (!surfacedPaths.has(mp)) {
    fail("MISSING", `Generated asset ${mp} is in the manifest but absent from the /brand registry.`);
  }
}

// Inverse (warning only): registry download paths that aren't generated assets.
// The ZIP package + a few curated extras legitimately live outside the manifest.
const manifestSet = new Set(manifestPaths);
for (const asset of brandAssets) {
  if (asset.category === "package") continue; // the ZIP itself isn't walked
  if (!manifestSet.has(asset.path)) {
    warn(`Registry asset "${asset.id}" (${asset.path}) is not tracked in the manifest.`);
  }
}

// ---------------------------------------------------------------------------
// C. The complete ZIP must contain every approved category directory
// ---------------------------------------------------------------------------
for (const dir of REQUIRED_ZIP_DIRS) {
  if (!zipTopDirs.has(dir)) {
    fail("ZIP", `Complete ZIP is missing the approved asset category "${dir}/".`);
  }
}

// ---------------------------------------------------------------------------
// D. Every favicon referenced by site metadata must be in the registry
// ---------------------------------------------------------------------------
for (const fp of faviconMetaPaths) {
  if (!registryPaths.has(fp)) {
    fail("FAVICON", `Favicon ${fp} is referenced by site metadata but absent from the /brand registry.`);
  }
  if (!existsSync(toFsPath(fp))) {
    fail("404", `Favicon ${fp} referenced by site metadata does not exist on disk.`);
  }
}

// ---------------------------------------------------------------------------
// E. Every asset category must be surfaced by a page section (except the ZIP,
//    which renders in its own dedicated "Complete package" section)
// ---------------------------------------------------------------------------
const sectionCategories = new Set(
  brandAssetSections.flatMap((s) => s.categories),
);
for (const asset of brandAssets) {
  if (asset.category === "package") continue;
  if (!sectionCategories.has(asset.category)) {
    fail("SECTION", `Asset "${asset.id}" has category "${asset.category}" which is not rendered by any /brand section.`);
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log("\nBrand asset consistency audit\n" + "=".repeat(48));
console.log(`Registry assets : ${brandAssets.length}`);
console.log(`Manifest assets : ${manifestPaths.length}`);
console.log(`ZIP entries     : ${zipEntries.length} (top dirs: ${[...zipTopDirs].sort().join(", ")})`);
console.log(`Favicon metadata: ${faviconMetaPaths.length} referenced`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  · ${w}`);
}

if (failures.length) {
  console.log(`\nFAILURES (${failures.length}):`);
  for (const f of failures) console.log(`  [${f.code}] ${f.msg}`);
  console.log("\nAudit FAILED.\n");
  process.exit(1);
}

console.log("\nAll checks passed. Asset inventory is complete and consistent.\n");
