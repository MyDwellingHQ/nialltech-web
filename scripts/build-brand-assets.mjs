/**
 * Niall Tech brand asset build pipeline.
 *
 * 1. Generate master SVG logos
 * 2. Rasterize PNG exports (icon / horizontal / stacked / reverse / social / favicon)
 * 3. Build favicon.ico + site.webmanifest
 * 4. Build print PDFs
 * 5. Write brand-colors.txt + asset-index.json
 * 6. Package public/brand/niall-tech-brand-assets.zip
 *
 * Usage: npm run brand:build
 */

import { createWriteStream, existsSync } from "node:fs";
import {
  access,
  copyFile,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument, rgb } from "pdf-lib";
import pngToIco from "png-to-ico";
import { generateSvgs } from "./generate-brand-svgs.mjs";
import { COLORS } from "./logo-geometry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BRAND = path.join(ROOT, "public/brand");
const FONTS_DIR = path.join(__dirname, "fonts");

const REQUIRED_SVGS = [
  "svg/niall-tech-icon.svg",
  "svg/niall-tech-horizontal.svg",
  "svg/niall-tech-stacked.svg",
  "svg/niall-tech-horizontal-light.svg",
  "svg/niall-tech-stacked-light.svg",
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureFonts() {
  const needed = [
    "Inter-Bold.ttf",
    "Inter-SemiBold.ttf",
    "Inter-Medium.ttf",
    "Inter-Regular.ttf",
  ];
  const missing = [];
  for (const f of needed) {
    if (!(await exists(path.join(FONTS_DIR, f)))) missing.push(f);
  }
  if (missing.length === 0) return;

  console.log("Downloading Inter fonts for SVG text rendering…");
  const zipUrl = "https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip";
  const res = await fetch(zipUrl);
  if (!res.ok) {
    throw new Error(
      `Missing fonts (${missing.join(", ")}) and failed to download Inter: ${res.status}`,
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = path.join(__dirname, ".inter-tmp.zip");
  await writeFile(tmp, buf);

  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const execFileAsync = promisify(execFile);
  await mkdir(FONTS_DIR, { recursive: true });
  await execFileAsync("unzip", [
    "-o",
    "-j",
    tmp,
    "extras/ttf/Inter-Bold.ttf",
    "extras/ttf/Inter-SemiBold.ttf",
    "extras/ttf/Inter-Medium.ttf",
    "extras/ttf/Inter-Regular.ttf",
    "-d",
    FONTS_DIR,
  ]);
  await rm(tmp, { force: true });
}

/**
 * @param {string} svgPath
 * @param {string} outPath
 * @param {number} width
 * @param {{ background?: string }} [opts]
 */
async function rasterize(svgPath, outPath, width, opts = {}) {
  if (!(await exists(svgPath))) {
    throw new Error(`Required SVG missing: ${svgPath}`);
  }
  const svg = await readFile(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles: [
        path.join(FONTS_DIR, "Inter-Bold.ttf"),
        path.join(FONTS_DIR, "Inter-SemiBold.ttf"),
        path.join(FONTS_DIR, "Inter-Medium.ttf"),
        path.join(FONTS_DIR, "Inter-Regular.ttf"),
      ],
      loadSystemFonts: true,
      defaultFontFamily: "Inter",
    },
    background: opts.background,
  });
  const pngData = resvg.render().asPng();
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, pngData);
  console.log(
    `png: ${path.relative(ROOT, outPath)} (${width}px${opts.background ? `, bg ${opts.background}` : ", transparent"})`,
  );
  return outPath;
}

async function buildPngs() {
  const iconMaster = path.join(BRAND, "svg/niall-tech-icon.svg");
  const horizontal = path.join(BRAND, "svg/niall-tech-horizontal.svg");
  const horizontalLight = path.join(BRAND, "svg/niall-tech-horizontal-light.svg");
  const stacked = path.join(BRAND, "svg/niall-tech-stacked.svg");
  const stackedLight = path.join(BRAND, "svg/niall-tech-stacked-light.svg");

  const iconSizes = [16, 32, 64, 128, 256, 512, 1024, 2048];
  for (const size of iconSizes) {
    await rasterize(
      iconMaster,
      path.join(BRAND, `png/icon/niall-tech-icon-${size}.png`),
      size,
    );
  }

  for (const size of [500, 1000, 2000]) {
    await rasterize(
      horizontal,
      path.join(BRAND, `png/horizontal/niall-tech-horizontal-${size}.png`),
      size,
    );
    await rasterize(
      stacked,
      path.join(BRAND, `png/stacked/niall-tech-stacked-${size}.png`),
      size,
    );
  }

  for (const size of [1000, 2000]) {
    await rasterize(
      horizontalLight,
      path.join(BRAND, `png/reverse/niall-tech-horizontal-white-${size}.png`),
      size,
    );
    await rasterize(
      stackedLight,
      path.join(BRAND, `png/reverse/niall-tech-stacked-white-${size}.png`),
      size,
    );
  }

  // Social
  await rasterize(
    iconMaster,
    path.join(BRAND, "social/social-avatar-1024.png"),
    1024,
  );

  // Dark avatar: navy rounded field with light icon
  const avatarDarkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" rx="180" fill="${COLORS.navy}"/>
  <g transform="translate(192, 192) scale(6.4)">
    ${await readFile(path.join(BRAND, "svg/niall-tech-icon-light.svg"), "utf8").then((s) => {
      const inner = s.replace(/<\?xml[^>]*>/, "").replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "").replace(/<title[^>]*>[^<]*<\/title>/, "");
      return inner;
    })}
  </g>
</svg>`;
  const darkTmp = path.join(BRAND, "social/.avatar-dark-tmp.svg");
  await writeFile(darkTmp, avatarDarkSvg);
  await rasterize(darkTmp, path.join(BRAND, "social/social-avatar-dark-1024.png"), 1024);
  await rm(darkTmp, { force: true });

  // Light avatar with navy field alternative already done; also create rounded light avatar
  const avatarLightSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" rx="180" fill="${COLORS.white}"/>
  <g transform="translate(192, 192) scale(6.4)">
    ${await readFile(path.join(BRAND, "svg/niall-tech-icon.svg"), "utf8").then((s) => {
      const inner = s.replace(/<\?xml[^>]*>/, "").replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "").replace(/<title[^>]*>[^<]*<\/title>/, "");
      return inner;
    })}
  </g>
</svg>`;
  const lightTmp = path.join(BRAND, "social/.avatar-light-tmp.svg");
  await writeFile(lightTmp, avatarLightSvg);
  await rasterize(lightTmp, path.join(BRAND, "social/social-avatar-1024.png"), 1024);
  await rm(lightTmp, { force: true });

  await buildCover(
    "open-graph-1200x630.png",
    1200,
    630,
    horizontalLight,
  );
  await buildCover(
    "linkedin-company-cover-1128x191.png",
    1128,
    191,
    horizontalLight,
  );
  await buildCover(
    "facebook-cover-1640x624.png",
    1640,
    624,
    horizontalLight,
  );
}

async function buildCover(name, w, h, logoSvgPath) {
  const logoSvg = await readFile(logoSvgPath, "utf8");
  const logoInner = logoSvg
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .replace(/<title[^>]*>[^<]*<\/title>/, "");

  const logoWidth = Math.round(w * 0.42);
  const scale = logoWidth / 420;
  const logoH = 100 * scale;
  const x = Math.round((w - logoWidth) / 2);
  const y = Math.round((h - logoH) / 2);

  const cover = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.navy}"/>
      <stop offset="55%" stop-color="#0E1A2E"/>
      <stop offset="100%" stop-color="#102A56"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g opacity="0.12">
    <line x1="0" y1="${h * 0.3}" x2="${w}" y2="${h * 0.15}" stroke="${COLORS.blue}" stroke-width="2"/>
    <line x1="0" y1="${h * 0.7}" x2="${w}" y2="${h * 0.55}" stroke="${COLORS.cyan}" stroke-width="1.5"/>
  </g>
  <g transform="translate(${x}, ${y}) scale(${scale})">
    ${logoInner}
  </g>
</svg>`;
  const tmp = path.join(BRAND, `social/.${name}.svg`);
  await writeFile(tmp, cover);
  await rasterize(tmp, path.join(BRAND, `social/${name}`), w);
  await rm(tmp, { force: true });
}

async function buildFavicons() {
  const favDir = path.join(BRAND, "favicon");
  await mkdir(favDir, { recursive: true });

  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${COLORS.navy}"/>
  <g transform="translate(8, 8) scale(0.48)">
    ${await readFile(path.join(BRAND, "svg/niall-tech-icon-light.svg"), "utf8").then((s) =>
      s
        .replace(/<\?xml[^>]*>/, "")
        .replace(/<svg[^>]*>/, "")
        .replace(/<\/svg>/, "")
        .replace(/<title[^>]*>[^<]*<\/title>/, ""),
    )}
  </g>
</svg>`;
  await writeFile(path.join(favDir, "favicon.svg"), faviconSvg);
  // Also publish as site root icon for Next metadata convenience
  await writeFile(path.join(ROOT, "public/icon.svg"), faviconSvg);
  console.log("svg: public/brand/favicon/favicon.svg");

  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "favicon-16x16.png"), 16);
  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "favicon-32x32.png"), 32);
  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "favicon-48x48.png"), 48);
  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "apple-touch-icon.png"), 180);
  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "android-chrome-192x192.png"), 192);
  await rasterize(path.join(favDir, "favicon.svg"), path.join(favDir, "android-chrome-512x512.png"), 512);

  const icoBuf = await pngToIco([
    path.join(favDir, "favicon-16x16.png"),
    path.join(favDir, "favicon-32x32.png"),
  ]);
  await writeFile(path.join(favDir, "favicon.ico"), icoBuf);
  await copyFile(path.join(favDir, "favicon.ico"), path.join(ROOT, "public/favicon.ico"));
  console.log("ico: public/brand/favicon/favicon.ico");

  const manifest = {
    name: "Niall Tech",
    short_name: "Niall Tech",
    description:
      "Microsoft 365, Azure, Entra ID, Intune, security, and infrastructure consulting.",
    start_url: "/",
    display: "standalone",
    background_color: COLORS.navy,
    theme_color: COLORS.blue,
    icons: [
      {
        src: "/brand/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/favicon/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
  await writeFile(
    path.join(favDir, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log("manifest: public/brand/favicon/site.webmanifest");
}

async function buildPdfs() {
  const printDir = path.join(BRAND, "print");
  await mkdir(printDir, { recursive: true });

  // RGB logo PDF — embed high-res horizontal PNG
  const rgbPng = await readFile(
    path.join(BRAND, "png/horizontal/niall-tech-horizontal-2000.png"),
  );
  const rgbDoc = await PDFDocument.create();
  const rgbPage = rgbDoc.addPage([792, 612]); // letter landscape
  const rgbImage = await rgbDoc.embedPng(rgbPng);
  const maxW = 520;
  const scale = maxW / rgbImage.width;
  const w = rgbImage.width * scale;
  const h = rgbImage.height * scale;
  rgbPage.drawRectangle({
    x: 0,
    y: 0,
    width: 792,
    height: 612,
    color: rgb(1, 1, 1),
  });
  rgbPage.drawImage(rgbImage, {
    x: (792 - w) / 2,
    y: (612 - h) / 2 + 20,
    width: w,
    height: h,
  });
  const navy = hexToRgb(COLORS.navy);
  rgbPage.drawText("Niall Tech — Logo Master (RGB)", {
    x: 48,
    y: 56,
    size: 12,
    color: rgb(navy.r / 255, navy.g / 255, navy.b / 255),
  });
  rgbPage.drawText(
    `Deep Navy ${COLORS.navy}  ·  Electric Blue ${COLORS.blue}  ·  Master: approved folded-beam icon`,
    {
      x: 48,
      y: 36,
      size: 9,
      color: rgb(0.28, 0.33, 0.41),
    },
  );
  await writeFile(path.join(printDir, "niall-tech-logo-rgb.pdf"), await rgbDoc.save());
  console.log("pdf: public/brand/print/niall-tech-logo-rgb.pdf");

  // One-color PDF
  const monoSvg = path.join(BRAND, "svg/niall-tech-one-color-black.svg");
  const monoPngPath = path.join(printDir, ".mono-tmp.png");
  await rasterize(monoSvg, monoPngPath, 2000);
  const monoPng = await readFile(monoPngPath);
  const monoDoc = await PDFDocument.create();
  const monoPage = monoDoc.addPage([792, 612]);
  const monoImage = await monoDoc.embedPng(monoPng);
  const mScale = maxW / monoImage.width;
  const mw = monoImage.width * mScale;
  const mh = monoImage.height * mScale;
  monoPage.drawRectangle({
    x: 0,
    y: 0,
    width: 792,
    height: 612,
    color: rgb(1, 1, 1),
  });
  monoPage.drawImage(monoImage, {
    x: (792 - mw) / 2,
    y: (612 - mh) / 2 + 20,
    width: mw,
    height: mh,
  });
  monoPage.drawText("Niall Tech — One-Color Logo Master", {
    x: 48,
    y: 56,
    size: 12,
    color: rgb(0, 0, 0),
  });
  monoPage.drawText("Use for single-color print, engraving, and embroidery transfers.", {
    x: 48,
    y: 36,
    size: 9,
    color: rgb(0.28, 0.33, 0.41),
  });
  await writeFile(
    path.join(printDir, "niall-tech-logo-one-color.pdf"),
    await monoDoc.save(),
  );
  await rm(monoPngPath, { force: true });
  console.log("pdf: public/brand/print/niall-tech-logo-one-color.pdf");
}

async function writeBrandColors() {
  const text = `Niall Tech Brand Colors
=======================

Deep Navy        ${COLORS.navy}    RGB ${Object.values(hexToRgb(COLORS.navy)).join(", ")}
Electric Blue    ${COLORS.blue}    RGB ${Object.values(hexToRgb(COLORS.blue)).join(", ")}
Cyan Accent      ${COLORS.cyan}    RGB ${Object.values(hexToRgb(COLORS.cyan)).join(", ")}
Slate            ${COLORS.slate}    RGB ${Object.values(hexToRgb(COLORS.slate)).join(", ")}
Light Gray       ${COLORS.lightGray}    RGB ${Object.values(hexToRgb(COLORS.lightGray)).join(", ")}
White            ${COLORS.white}    RGB 255, 255, 255

Primary lockup uses Deep Navy + Electric Blue only.
Cyan Accent is reserved for secondary highlights and motion accents.
`;
  await writeFile(path.join(BRAND, "brand-colors.txt"), text);
  console.log("txt: public/brand/brand-colors.txt");
}

async function writeAssetIndex() {
  const entries = [];

  async function walk(dir, category) {
    if (!(await exists(dir))) return;
    const items = await readdir(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      const s = await stat(full);
      if (s.isDirectory()) {
        await walk(full, category || item);
      } else if (!item.startsWith(".")) {
        const rel = `/brand/${path.relative(BRAND, full).split(path.sep).join("/")}`;
        const ext = path.extname(item).slice(1).toLowerCase();
        entries.push({
          name: item,
          category: category || path.basename(dir),
          path: rel,
          format: ext,
          bytes: s.size,
        });
      }
    }
  }

  // Every surfaced asset directory is walked so the manifest is a complete
  // inventory. Keep this list in sync with the ZIP include list and the
  // brand-page registry — scripts/check-brand-consistency.mjs enforces it.
  await walk(path.join(BRAND, "svg"), "svg");
  await walk(path.join(BRAND, "png"), "png");
  await walk(path.join(BRAND, "favicon"), "favicon");
  await walk(path.join(BRAND, "social"), "social");
  await walk(path.join(BRAND, "print"), "print");
  await walk(path.join(BRAND, "collateral"), "collateral");
  await walk(path.join(BRAND, "office"), "office");
  await walk(path.join(BRAND, "email"), "email");
  // Canonical VistaPrint masters (brand hub downloads/previews point here).
  await walk(path.join(BRAND, "business-card/exports"), "business-card");

  // Drop collateral business-card sync copies from the index so the registry
  // can surface a single production set under business-card/exports/ without
  // duplicating "final" cards on /brand.
  const filtered = entries.filter(
    (e) =>
      !(
        e.category === "collateral" &&
        /^business-card-(front|back)\.(pdf|png|svg)$/.test(e.name)
      ),
  );

  const index = {
    generatedAt: new Date().toISOString(),
    masterSvg: "/brand/svg/niall-tech-icon.svg",
    masterGeometry: "approved-folded-beam",
    brandColors: COLORS,
    assets: filtered.sort((a, b) => a.path.localeCompare(b.path)),
  };

  await writeFile(
    path.join(BRAND, "asset-index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );
  console.log(`json: public/brand/asset-index.json (${entries.length} assets)`);
  return index;
}

async function writeReadme() {
  const readme = `# Niall Tech Brand Assets

Official logo files, raster exports, favicons, social covers, and print masters for Niall Tech.

## Master logo

- **Production master icon:** \`svg/niall-tech-icon.svg\`
- **Geometry:** the approved folded-beam **N**, defined once in \`src/brand/niall-mark-geometry.mjs\` and mapped into every asset

The mark is a bold folded-beam capital **N**:
- Deep Navy main beam (upper-left → lower-right)
- Deep Navy lower-left pillar
- Electric Blue tall right pillar
- Flat color only — no gradients, shadows, or filters

## Color values

| Name | HEX | RGB |
|------|-----|-----|
| Deep Navy | \`#0B1320\` | 11, 19, 32 |
| Electric Blue | \`#146BFF\` | 20, 107, 255 |
| Cyan Accent | \`#22C1FF\` | 34, 193, 255 |
| Slate | \`#475569\` | 71, 85, 105 |
| Light Gray | \`#E5E7EB\` | 229, 231, 235 |
| White | \`#FFFFFF\` | 255, 255, 255 |

See also \`brand-colors.txt\`.

## Typography

- **Typeface:** Inter
- **NIALL:** Bold / Semibold, uppercase, generous tracking, Deep Navy or White
- **TECH:** Medium / Semibold, uppercase, wider tracking, Electric Blue (or White/Black in mono)
- **Tagline:** MODERN IT. LOCAL EXPERTISE.

Site UI may continue to use Plus Jakarta Sans / Manrope; Inter is required for brand lockups.

## File locations

\`\`\`
public/brand/
  svg/           Vector logo masters
  png/           Transparent PNG exports
  favicon/       Favicon + PWA icons + site.webmanifest
  social/        Avatars, cover images, and profile banners
  collateral/    Business cards, letterhead, invoice, proposal/SOW covers
  business-card/ VistaPrint sources, variants, QR, preview (see README there)
  email/         HTML email signatures (responsive + Outlook-safe)
  office/        PowerPoint + Word templates
  print/         PDF + SVG print masters
  README.md
  brand-colors.txt
  asset-index.json
  niall-tech-brand-assets.zip
\`\`\`

### Business cards (VistaPrint)

See [\`business-card/README.md\`](./business-card/README.md) for source-of-truth SVGs, bleed specs, QR destination (\`https://nialltech.com/connect\`), and regenerate/validate commands:

\`\`\`bash
npm run branding:build
npm run branding:validate
\`\`\`

Contact/phone values come from \`src/data/brand-contact.mjs\` — regenerate collateral after contact changes.

## Intended usage

| Asset | Use |
|-------|-----|
| Horizontal | Primary digital lockup (headers, docs) |
| Stacked | Square / centered placements |
| Icon | Favicon, app icon, avatar, sparse UI |
| Wordmark | Text-only contexts when icon is already present |
| One-color | Fax, engraving, single-ink print |
| Vehicle decal | High-contrast vehicle / signage wrap |
| Embroidery | Simplified stitch-friendly mark |

### Minimum sizes

- Icon digital: **16px** (recognizable), preferred **24px+**
- Icon print: **8mm**
- Horizontal digital: **120px** wide
- Clear space: ≥ **0.5× icon width** on all sides

### Backgrounds

- **Dark logo** (\`*-dark\` / default color): light backgrounds
- **Light / reverse** (\`*-light\` / \`*-white\`): dark backgrounds
- Maintain contrast — do not place navy on dark charcoal or white on pale gray

## Regenerating assets

From the repo root:

\`\`\`bash
npm run brand:build
\`\`\`

This runs \`scripts/build-brand-assets.mjs\`, which:

1. Regenerates SVG masters from \`scripts/logo-geometry.mjs\`
2. Rasterizes PNGs via \`@resvg/resvg-js\` (Inter fonts in \`scripts/fonts/\`)
3. Builds favicons (including \`.ico\`)
4. Builds RGB + one-color PDFs via \`pdf-lib\`
5. Writes \`asset-index.json\`, \`brand-colors.txt\`, and the ZIP package

Required Inter TTF files are downloaded automatically into \`scripts/fonts/\` if missing.

## ZIP package

\`niall-tech-brand-assets.zip\` includes SVG, PNG, favicon, social, print assets, this README, \`brand-colors.txt\`, and \`asset-index.json\`.

## AI / EPS limitations

This toolchain does **not** produce native Adobe Illustrator (\`.ai\`) or Encapsulated PostScript (\`.eps\`) files.

Use the SVG masters and PDF print files as the source of truth for design tools. Open the SVG in Illustrator/Affinity/Figma and save AI/EPS from there if a vendor requires those formats. Do not rename SVG/PDF to \`.ai\` or \`.eps\`.

## License

© Niall Tech. Brand assets may be used by authorized partners for approved communications. Do not modify the mark, proportions, or colors outside this guide.
`;
  await writeFile(path.join(BRAND, "README.md"), readme);
  console.log("md: public/brand/README.md");
}

async function buildZip() {
  const zipPath = path.join(BRAND, "niall-tech-brand-assets.zip");
  await rm(zipPath, { force: true });

  await new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);

    const include = [
      "svg",
      "png",
      "favicon",
      "social",
      "print",
      "collateral",
      "office",
      "email",
    ];
    for (const dir of include) {
      const full = path.join(BRAND, dir);
      // collateral/office/email are produced by sibling scripts; only add if built.
      if (existsSync(full)) {
        archive.directory(full, dir);
      }
    }
    archive.file(path.join(BRAND, "README.md"), { name: "README.md" });
    archive.file(path.join(BRAND, "brand-colors.txt"), {
      name: "brand-colors.txt",
    });
    archive.file(path.join(BRAND, "asset-index.json"), {
      name: "asset-index.json",
    });
    archive.finalize();
  });

  const s = await stat(zipPath);
  console.log(
    `zip: public/brand/niall-tech-brand-assets.zip (${Math.round(s.size / 1024)} KB)`,
  );
}

async function verifyRequired() {
  for (const rel of REQUIRED_SVGS) {
    const full = path.join(BRAND, rel);
    if (!(await exists(full))) {
      throw new Error(`Required source file missing after SVG generation: ${rel}`);
    }
  }
}

async function main() {
  // Fast path: re-package the ZIP only, after sibling collateral/office/email
  // scripts have run, without regenerating every raster asset.
  if (process.argv.includes("--zip-only")) {
    console.log("\nNiall Tech brand asset — re-zip only\n");
    await writeAssetIndex();
    await buildZip();
    console.log("\nRe-zip complete.\n");
    return;
  }

  console.log("\nNiall Tech brand asset build\n");
  await ensureFonts();
  await generateSvgs();
  await verifyRequired();
  await buildPngs();
  await buildFavicons();
  await buildPdfs();
  await writeBrandColors();
  await writeReadme();
  await writeAssetIndex();
  await buildZip();
  console.log("\nBrand build complete.\n");
}

main().catch((err) => {
  console.error("\nBrand build failed:", err.message || err);
  process.exit(1);
});
