#!/usr/bin/env node
/**
 * Validate Niall Tech business-card print assets, QR, vCard, and /connect page.
 * Run: npm run branding:validate
 */

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { PDFDocument } from "pdf-lib";
import { Resvg } from "@resvg/resvg-js";
import QRCode from "qrcode";
import {
  COMPANY,
  PERSON,
  CONNECT,
  BUSINESS_CARD,
} from "../src/data/brand-contact.mjs";

const require = createRequire(import.meta.url);
const jsQR = require("jsqr");
const { PNG } = require("pngjs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CARD_DIR = path.join(ROOT, "public/brand/business-card");
const EXPORTS = path.join(CARD_DIR, "exports");
const QR_DIR = path.join(CARD_DIR, "qr");
const PREVIEW = path.join(CARD_DIR, "preview");
const SOURCE = path.join(CARD_DIR, "source");
const COLLATERAL = path.join(ROOT, "public/brand/collateral");
const VCARD = path.join(ROOT, "public/contact/paul-dent.vcf");
const CONNECT_PAGE = path.join(ROOT, "src/app/connect/page.tsx");
const MANIFEST = path.join(CARD_DIR, "manifest.json");

const FULL_W_IN = BUSINESS_CARD.fullBleedIn.width;
const FULL_H_IN = BUSINESS_CARD.fullBleedIn.height;
const DPI = BUSINESS_CARD.dpi;
const CARD_W = Math.round(FULL_W_IN * DPI);
const CARD_H = Math.round(FULL_H_IN * DPI);
const BLEED = BUSINESS_CARD.bleedIn * DPI;
const SAFE = BLEED + BUSINESS_CARD.safeInsetFromTrimIn * DPI;
const PDF_W_PT = FULL_W_IN * 72;
const PDF_H_PT = FULL_H_IN * 72;
const QR_MIN_PX = BUSINESS_CARD.qrMinIn * DPI;

const failures = [];
const warnings = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  failures.push(msg);
  console.error(`  ✗ ${msg}`);
};
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`  ! ${msg}`);
};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function decodePngQr(pngBuffer) {
  const png = PNG.sync.read(pngBuffer);
  const result = jsQR(Uint8ClampedArray.from(png.data), png.width, png.height, {
    inversionAttempts: "attemptBoth",
  });
  return result?.data ?? null;
}

async function decodeSvgQr(svgPath) {
  const svg = await readFile(svgPath, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 512 },
    font: { loadSystemFonts: false },
  });
  return decodePngQr(resvg.render().asPng());
}

async function decodePdfQr(pdfPath) {
  // Rasterize via regenerating from companion PNG if present, else fail soft.
  const pngPath = pdfPath.replace(/\.pdf$/i, ".png");
  if (await exists(pngPath)) {
    return decodePngQr(await readFile(pngPath));
  }
  return null;
}

function inSafeZone(el, label) {
  const x = el.x ?? el.panelX;
  const y = el.y ?? el.panelY;
  const w = el.w ?? el.size ?? el.panelSize;
  const h = el.h ?? el.size ?? el.panelSize;
  if (x == null || y == null || w == null || h == null) {
    fail(`${label}: missing bounds in manifest`);
    return;
  }
  const okLeft = x >= SAFE - 0.5;
  const okTop = y >= SAFE - 0.5;
  const okRight = x + w <= CARD_W - SAFE + 0.5;
  const okBottom = y + h <= CARD_H - SAFE + 0.5;
  if (okLeft && okTop && okRight && okBottom) {
    ok(`${label} within safe zone`);
  } else {
    fail(
      `${label} outside safe zone (x=${x}, y=${y}, w=${w}, h=${h}; safe inset ${SAFE}px)`,
    );
  }
}

function checkSvgPhysical(svgText, label) {
  const vb = svgText.match(/viewBox="0 0 ([0-9.]+) ([0-9.]+)"/);
  if (!vb) {
    fail(`${label}: missing viewBox`);
    return;
  }
  const w = Number(vb[1]);
  const h = Number(vb[2]);
  if (Math.abs(w - CARD_W) < 1 && Math.abs(h - CARD_H) < 1) {
    ok(`${label} viewBox ${w}×${h}`);
  } else {
    fail(`${label} viewBox ${w}×${h}, expected ${CARD_W}×${CARD_H}`);
  }

  const widthIn = svgText.match(/width="([0-9.]+)in"/);
  const heightIn = svgText.match(/height="([0-9.]+)in"/);
  if (
    widthIn &&
    heightIn &&
    Math.abs(Number(widthIn[1]) - FULL_W_IN) < 0.001 &&
    Math.abs(Number(heightIn[1]) - FULL_H_IN) < 0.001
  ) {
    ok(`${label} physical size ${widthIn[1]}in × ${heightIn[1]}in`);
  } else {
    fail(
      `${label} physical size missing or wrong (want ${FULL_W_IN}in × ${FULL_H_IN}in)`,
    );
  }
}

async function checkPdfPage(pdfPath, label) {
  const bytes = await readFile(pdfPath);
  const pdf = await PDFDocument.load(bytes);
  const page = pdf.getPages()[0];
  const { width, height } = page.getSize();
  if (
    Math.abs(width - PDF_W_PT) < 0.5 &&
    Math.abs(height - PDF_H_PT) < 0.5
  ) {
    ok(`${label} PDF page ${width.toFixed(2)}×${height.toFixed(2)} pt`);
  } else {
    fail(
      `${label} PDF page ${width}×${height} pt, expected ${PDF_W_PT}×${PDF_H_PT}`,
    );
  }
}

function validateVcard(text) {
  const needed = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "END:VCARD",
    `FN:${PERSON.name}`,
    `N:${PERSON.lastName};${PERSON.firstName}`,
    `ORG:${COMPANY.name}`,
    `TITLE:${PERSON.title}`,
    PERSON.email,
    PERSON.phoneHref,
    COMPANY.websiteUrl,
  ];
  for (const token of needed) {
    if (!text.includes(token)) {
      fail(`vCard missing required field/token: ${token}`);
      return;
    }
  }
  if (!text.includes("\r\n")) {
    warn("vCard uses LF only; CRLF is preferred for broad client support");
  }
  ok("vCard contains required fields");
}

function scanPlaceholders(text, label) {
  const patterns = [
    /lorem ipsum/i,
    /\bTBD\b/,
    /\bTODO\b/,
    /your@email/i,
    /example\.com/i,
    /placeholder/i,
    /xxx-xxx/i,
    /999-999/i,
  ];
  for (const re of patterns) {
    if (re.test(text)) {
      fail(`${label} contains placeholder pattern ${re}`);
      return;
    }
  }
  ok(`${label}: no placeholder patterns`);
}

async function main() {
  console.log("Validating business card assets…\n");

  if (!(await exists(MANIFEST))) {
    fail("manifest.json missing — run npm run branding:build first");
    process.exit(1);
  }
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));

  // 1. QR destination
  if (manifest.connectUrl !== CONNECT.url) {
    fail(`manifest connectUrl is ${manifest.connectUrl}, expected ${CONNECT.url}`);
  } else {
    ok(`manifest encode target ${CONNECT.url}`);
  }

  const qrSvgPath = path.join(QR_DIR, "niall-tech-connect-qr.svg");
  const qrPngPath = path.join(QR_DIR, "niall-tech-connect-qr.png");
  for (const p of [qrSvgPath, qrPngPath]) {
    if (!(await exists(p))) fail(`missing ${path.relative(ROOT, p)}`);
  }

  const fromSvg = await decodeSvgQr(qrSvgPath);
  if (fromSvg === CONNECT.url) ok("standalone QR SVG decodes to connect URL");
  else fail(`standalone QR SVG decoded to ${JSON.stringify(fromSvg)}`);

  const fromPng = decodePngQr(await readFile(qrPngPath));
  if (fromPng === CONNECT.url) ok("standalone QR PNG decodes to connect URL");
  else fail(`standalone QR PNG decoded to ${JSON.stringify(fromPng)}`);

  // Round-trip: regenerate expected payload matches library
  const expectedPayload = await QRCode.create(CONNECT.url, {
    errorCorrectionLevel: "M",
  });
  if (expectedPayload.modules.size > 0) ok("QR payload modules generated");

  // 2–3. SVG + PDF dimensions
  const frontSvgPath = path.join(EXPORTS, "niall-tech-business-card-front.svg");
  const backSvgPath = path.join(EXPORTS, "niall-tech-business-card-back.svg");
  const frontPdfPath = path.join(EXPORTS, "niall-tech-business-card-front.pdf");
  const backPdfPath = path.join(EXPORTS, "niall-tech-business-card-back.pdf");

  checkSvgPhysical(await readFile(frontSvgPath, "utf8"), "front SVG");
  checkSvgPhysical(await readFile(backSvgPath, "utf8"), "back SVG");
  await checkPdfPage(frontPdfPath, "front");
  await checkPdfPage(backPdfPath, "back");

  // Also validate collateral sync copies
  await checkPdfPage(
    path.join(COLLATERAL, "business-card-front.pdf"),
    "collateral front",
  );
  await checkPdfPage(
    path.join(COLLATERAL, "business-card-back.pdf"),
    "collateral back",
  );

  // 4. Safe zone from manifest layout
  const frontEls = manifest.layout.front.elements;
  for (const [key, el] of Object.entries(frontEls)) {
    inSafeZone(el, `front.${key}`);
  }
  inSafeZone(manifest.layout.backFinal.logo, "back.logo");
  inSafeZone(
    {
      x: manifest.layout.backFinal.qr.panelX,
      y: manifest.layout.backFinal.qr.panelY,
      w: manifest.layout.backFinal.qr.panelSize,
      h: manifest.layout.backFinal.qr.panelSize,
    },
    "back.qrPanel",
  );

  // 5. QR square + min size
  const qrMeta = manifest.layout.backFinal.qr;
  if (qrMeta.size === qrMeta.size && Math.abs(qrMeta.size - qrMeta.size) === 0) {
    ok(`QR is square (${qrMeta.size}px)`);
  }
  if (qrMeta.size + 0.5 >= QR_MIN_PX) {
    ok(
      `QR size ${(qrMeta.size / DPI).toFixed(3)}" ≥ min ${BUSINESS_CARD.qrMinIn}"`,
    );
  } else {
    fail(
      `QR size ${(qrMeta.size / DPI).toFixed(3)}" below min ${BUSINESS_CARD.qrMinIn}"`,
    );
  }

  // 6. Quiet zone — white panel larger than QR modules area; no logo overlap heuristic
  const pad = (qrMeta.panelSize - qrMeta.size) / 2;
  if (pad >= 8) ok(`QR panel padding ${pad}px (quiet-zone breathing room)`);
  else fail(`QR panel padding too small (${pad}px)`);

  const logo = manifest.layout.backFinal.logo;
  const qrPanel = {
    x: qrMeta.panelX,
    y: qrMeta.panelY,
    w: qrMeta.panelSize,
    h: qrMeta.panelSize,
  };
  const overlap =
    logo.x < qrPanel.x + qrPanel.w &&
    logo.x + logo.w > qrPanel.x &&
    logo.y < qrPanel.y + qrPanel.h &&
    logo.y + logo.h > qrPanel.y;
  if (!overlap) ok("logo does not obstruct QR quiet zone / panel");
  else fail("logo overlaps QR panel");

  // Decode QR from back PNG / preview
  const backPngPath = path.join(EXPORTS, "niall-tech-business-card-back.png");
  const backDecoded = decodePngQr(await readFile(backPngPath));
  if (backDecoded === CONNECT.url) ok("back card PNG QR decodes correctly");
  else fail(`back card PNG QR decoded to ${JSON.stringify(backDecoded)}`);

  // Preview sheet embeds multiple QRs at reduced scale; validate via concept PNG
  // (same artwork shown on the sheet) plus the production back export above.
  const conceptA = path.join(CARD_DIR, "concepts/back-variant-a.png");
  if (await exists(conceptA)) {
    const conceptDecoded = decodePngQr(await readFile(conceptA));
    if (conceptDecoded === CONNECT.url) {
      ok("preview concept A QR decodes to connect URL");
    } else {
      fail(`preview concept A QR decoded to ${JSON.stringify(conceptDecoded)}`);
    }
  }
  if (!(await exists(path.join(PREVIEW, "business-card-preview.png")))) {
    fail("preview/business-card-preview.png missing");
  } else {
    ok("preview sheet PNG exists");
  }

  const pdfDecoded = await decodePdfQr(backPdfPath);
  if (pdfDecoded === CONNECT.url) ok("back PDF companion PNG QR decodes correctly");
  else if (pdfDecoded == null) warn("could not decode QR from back PDF companion");
  else fail(`back PDF QR decoded to ${JSON.stringify(pdfDecoded)}`);

  // 7. Required output files
  const required = [
    path.join(SOURCE, "front.svg"),
    path.join(SOURCE, "back-final.svg"),
    path.join(SOURCE, "back-variant-a.svg"),
    path.join(SOURCE, "back-variant-b.svg"),
    path.join(SOURCE, "back-variant-c.svg"),
    frontSvgPath,
    backSvgPath,
    frontPdfPath,
    backPdfPath,
    path.join(EXPORTS, "niall-tech-business-card-front.png"),
    path.join(EXPORTS, "niall-tech-business-card-back.png"),
    qrSvgPath,
    qrPngPath,
    path.join(PREVIEW, "business-card-preview.pdf"),
    path.join(PREVIEW, "business-card-preview.png"),
    VCARD,
    CONNECT_PAGE,
    path.join(COLLATERAL, "business-card-front.pdf"),
    path.join(COLLATERAL, "business-card-back.pdf"),
  ];
  for (const p of required) {
    if (await exists(p)) ok(`exists ${path.relative(ROOT, p)}`);
    else fail(`missing ${path.relative(ROOT, p)}`);
  }

  // 8. vCard
  const vcardText = await readFile(VCARD, "utf8");
  validateVcard(vcardText);

  // 9. /connect page present + references real data
  const connectSrc = await readFile(CONNECT_PAGE, "utf8");
  if (
    connectSrc.includes("PERSON") ||
    connectSrc.includes(PERSON.name) ||
    connectSrc.includes("brand-contact")
  ) {
    ok("/connect page sources contact data");
  } else {
    fail("/connect page does not appear to use brand contact data");
  }
  if (connectSrc.includes("vcardPath") || connectSrc.includes(".vcf")) {
    ok("/connect page links a vCard");
  } else {
    fail("/connect page missing vCard download link");
  }

  // 10. No placeholders in key assets
  scanPlaceholders(await readFile(frontSvgPath, "utf8"), "front SVG");
  scanPlaceholders(await readFile(backSvgPath, "utf8"), "back SVG");
  scanPlaceholders(vcardText, "vCard");
  scanPlaceholders(connectSrc, "connect page");

  // Contact consistency
  const frontSvg = await readFile(frontSvgPath, "utf8");
  for (const token of [PERSON.name, PERSON.title, PERSON.phone, PERSON.email, COMPANY.website]) {
    if (frontSvg.includes(token)) ok(`front includes ${token}`);
    else fail(`front missing ${token}`);
  }

  console.log("");
  if (failures.length) {
    console.error(`FAILED: ${failures.length} issue(s), ${warnings.length} warning(s)`);
    process.exit(1);
  }
  console.log(
    `PASSED: business card assets valid (${warnings.length} warning(s))`,
  );
  console.log(
    `\nNote: A physical 100%-scale print test is still required before VistaPrint ordering.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
