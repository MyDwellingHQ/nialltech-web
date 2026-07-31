#!/usr/bin/env node
/**
 * Niall Tech — VistaPrint business card builder.
 * ----------------------------------------------------------------------------
 * Source of truth: generated SVGs under public/brand/business-card/source/
 * (built from approved logo masters + brand-contact data).
 *
 * Outputs:
 *   public/brand/business-card/{source,exports,qr,preview,concepts}/
 *   public/brand/collateral/business-card-{front,back}.{svg,png,pdf}
 *   public/contact/paul-dent.vcf
 *
 * Run: npm run branding:build
 */

import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import {
  COMPANY,
  PERSON,
  BRAND,
  CONNECT,
  BUSINESS_CARD,
} from "../src/data/brand-contact.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BRAND_DIR = path.join(ROOT, "public/brand");
const CARD_DIR = path.join(BRAND_DIR, "business-card");
const SOURCE_DIR = path.join(CARD_DIR, "source");
const EXPORTS_DIR = path.join(CARD_DIR, "exports");
const QR_DIR = path.join(CARD_DIR, "qr");
const PREVIEW_DIR = path.join(CARD_DIR, "preview");
const CONCEPTS_DIR = path.join(CARD_DIR, "concepts");
const COLLATERAL_DIR = path.join(BRAND_DIR, "collateral");
const CONTACT_DIR = path.join(ROOT, "public/contact");
const FONTS_DIR = path.join(__dirname, "fonts");

const FONT_FILES = [
  path.join(FONTS_DIR, "Inter-Bold.ttf"),
  path.join(FONTS_DIR, "Inter-SemiBold.ttf"),
  path.join(FONTS_DIR, "Inter-Medium.ttf"),
  path.join(FONTS_DIR, "Inter-Regular.ttf"),
];

const DPI = BUSINESS_CARD.dpi;
const FULL_W_IN = BUSINESS_CARD.fullBleedIn.width;
const FULL_H_IN = BUSINESS_CARD.fullBleedIn.height;
const TRIM_W_IN = BUSINESS_CARD.finishedIn.width;
const TRIM_H_IN = BUSINESS_CARD.finishedIn.height;
const BLEED_IN = BUSINESS_CARD.bleedIn;
const SAFE_FROM_TRIM_IN = BUSINESS_CARD.safeInsetFromTrimIn;

/** Design coordinate system: 300 dpi pixels across full-bleed artwork. */
const CARD_W = Math.round(FULL_W_IN * DPI); // 1125
const CARD_H = Math.round(FULL_H_IN * DPI); // 675
/** Per-side bleed in design pixels (0.125" × 300dpi = 37.5). */
const BLEED = BLEED_IN * DPI;
/** Safe inset from bleed edge (= bleed + safe-from-trim). */
const SAFE = BLEED + SAFE_FROM_TRIM_IN * DPI; // 75
const QR_TARGET_PX = Math.round(BUSINESS_CARD.qrTargetIn * DPI); // 255
const RECOMMENDED = BUSINESS_CARD.recommendedBack;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function svgDoc(w, h, content, { physical = true } = {}) {
  const sizeAttrs = physical
    ? `width="${FULL_W_IN}in" height="${FULL_H_IN}in"`
    : `width="${w}" height="${h}"`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}" ${sizeAttrs} font-family="Inter, Arial, Helvetica, sans-serif">
${content}
</svg>
`;
}

async function logoInner(relPath) {
  const raw = await readFile(path.join(BRAND_DIR, relPath), "utf8");
  const vb = raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 100";
  const inner = raw
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title[^>]*>[^<]*<\/title>/, "");
  return { inner, viewBox: vb };
}

async function placeLogo(relPath, { x, y, width, align = "xMinYMid" }) {
  const { inner, viewBox } = await logoInner(relPath);
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);
  const height = (width * vh) / vw;
  return {
    x,
    y,
    width,
    height,
    markup: `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${viewBox}" preserveAspectRatio="${align} meet">${inner}</svg>`,
  };
}

const ICONS = {
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  mailLine: "m22 6-10 7L2 6",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  globeLines: "M2 12h20 M12 2a15.3 15.3 0 0 1 0 20 M12 2a15.3 15.3 0 0 0 0 20",
};

function icon(name, x, y, s, color) {
  const scale = s / 24;
  const g = (paths) =>
    `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`;
  if (name === "phone") return g(`<path d="${ICONS.phone}"/>`);
  if (name === "mail")
    return g(`<path d="${ICONS.mail}"/><path d="${ICONS.mailLine}"/>`);
  return g(`<path d="${ICONS.globe}"/><path d="${ICONS.globeLines}"/>`);
}

function rasterize(svgString, pxWidth) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: pxWidth },
    font: {
      fontFiles: FONT_FILES,
      loadSystemFonts: true,
      defaultFontFamily: "Inter",
    },
  });
  return resvg.render().asPng();
}

async function writePdfFromPng(outPath, pngBytes, widthIn, heightIn) {
  const pdf = await PDFDocument.create();
  const img = await pdf.embedPng(pngBytes);
  const page = pdf.addPage([widthIn * 72, heightIn * 72]);
  page.drawImage(img, {
    x: 0,
    y: 0,
    width: widthIn * 72,
    height: heightIn * 72,
  });
  const bytes = await pdf.save();
  await writeFile(outPath, bytes);
  return bytes;
}

/** Generate standalone QR assets (dark on white, quiet zone included). */
async function buildQrAssets() {
  await mkdir(QR_DIR, { recursive: true });

  const svg = await QRCode.toString(CONNECT.url, {
    type: "svg",
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#0B1320", light: "#FFFFFF" },
  });

  // Force physical-friendly root attributes while keeping module geometry.
  const sized = svg
    .replace(/<svg /, `<svg width="512" height="512" `)
    .replace(/\s+width="[^"]*"/, ' width="512"')
    .replace(/\s+height="[^"]*"/, ' height="512"');

  // Ensure width/height once
  const finalSvg = sized.includes('width="512"')
    ? sized.replace(/<svg([^>]*)>/, (m, attrs) => {
        const cleaned = attrs
          .replace(/\swidth="[^"]*"/g, "")
          .replace(/\sheight="[^"]*"/g, "");
        return `<svg${cleaned} width="512" height="512">`;
      })
    : sized;

  const qrSvgPath = path.join(QR_DIR, "niall-tech-connect-qr.svg");
  await writeFile(qrSvgPath, finalSvg, "utf8");

  const png = await QRCode.toBuffer(CONNECT.url, {
    type: "png",
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#0B1320", light: "#FFFFFF" },
    width: 1024,
  });
  const qrPngPath = path.join(QR_DIR, "niall-tech-connect-qr.png");
  await writeFile(qrPngPath, png);

  // Extract inner markup + viewBox for embedding in cards.
  const vb = finalSvg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 37 37";
  const inner = finalSvg
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");

  console.log(`qr: ${CONNECT.url}`);
  return { svg: finalSvg, inner, viewBox: vb, pngPath: qrPngPath, svgPath: qrSvgPath };
}

function qrPanel({ x, y, size, qr, label, labelBelow = true }) {
  // White panel includes quiet zone already present in QR SVG (margin:4).
  // Extra 12px padding for print breathing room around the module field.
  const pad = 12;
  const panel = size + pad * 2;
  const panelX = x - pad;
  const panelY = y - pad;
  const labelY = labelBelow ? y + size + pad + 28 : y - pad - 18;
  const labelMarkup = label
    ? `<text x="${x + size / 2}" y="${labelY}" text-anchor="middle" fill="${BRAND.slate}" font-size="20" font-weight="500" letter-spacing="1.2">${esc(label)}</text>`
    : "";
  return {
    panelX,
    panelY,
    panel,
    qrX: x,
    qrY: y,
    qrSize: size,
    markup: `
  <rect x="${panelX}" y="${panelY}" width="${panel}" height="${panel}" rx="8" fill="${BRAND.white}"/>
  <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${qr.viewBox}" preserveAspectRatio="xMidYMid meet">${qr.inner}</svg>
  ${labelMarkup}`,
  };
}

async function buildFront() {
  const logo = await placeLogo("svg/niall-tech-horizontal-light.svg", {
    x: SAFE,
    y: SAFE + 4,
    width: 340,
  });

  // Keep glyph bottoms / icon boxes inside the safe rectangle.
  const contentBottom = CARD_H - SAFE - 8;
  const contactX = CARD_W - SAFE - 292;
  const rowH = 36;
  const line = (i) => contentBottom - (2 - i) * rowH;
  const iconSize = 18;

  const titleY = contentBottom;
  const nameY = contentBottom - 34;

  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  <rect x="0" y="0" width="8" height="${CARD_H}" fill="${BRAND.blue}"/>
  ${logo.markup}
  <text x="${SAFE}" y="${nameY}" fill="${BRAND.white}" font-size="42" font-weight="700" letter-spacing="0.4">${esc(PERSON.name)}</text>
  <text x="${SAFE}" y="${titleY}" fill="${BRAND.cyan}" font-size="20" font-weight="500" letter-spacing="1.4">${esc(PERSON.title)}</text>
  <g font-size="20" font-weight="400">
    ${icon("phone", contactX, line(0) - 15, iconSize, BRAND.blue)}
    <text x="${contactX + 30}" y="${line(0)}" fill="${BRAND.lightGray}">${esc(PERSON.phone)}</text>
    ${icon("mail", contactX, line(1) - 15, iconSize, BRAND.blue)}
    <text x="${contactX + 30}" y="${line(1)}" fill="${BRAND.lightGray}">${esc(PERSON.email)}</text>
    ${icon("globe", contactX, line(2) - 15, iconSize, BRAND.blue)}
    <text x="${contactX + 30}" y="${line(2)}" fill="${BRAND.lightGray}">${esc(COMPANY.website)}</text>
  </g>`;

  const contactTop = line(0) - 18;
  const contactBottom = line(2) + 4;
  const meta = {
    side: "front",
    elements: {
      logo: { x: logo.x, y: logo.y, w: logo.width, h: logo.height },
      name: { x: SAFE, y: nameY - 36, w: 360, h: 42 },
      title: { x: SAFE, y: titleY - 18, w: 360, h: 22 },
      contact: {
        x: contactX,
        y: contactTop,
        w: 292,
        h: contactBottom - contactTop,
      },
    },
  };

  return { svg: svgDoc(CARD_W, CARD_H, content), meta };
}

/** Variant A — centered wordmark + QR + short CTA (recommended). */
async function buildBackA(qr) {
  const logo = await placeLogo("svg/niall-tech-stacked-light.svg", {
    x: CARD_W / 2 - 150,
    y: SAFE + 18,
    width: 300,
    align: "xMidYMid",
  });

  const qrSize = QR_TARGET_PX;
  const qrX = (CARD_W - qrSize) / 2;
  // Sit QR in lower half with room for CTA under the white panel.
  const qrY = CARD_H - SAFE - qrSize - 44;
  const panel = qrPanel({
    x: qrX,
    y: qrY,
    size: qrSize,
    qr,
    label: CONNECT.qrCta,
    labelBelow: true,
  });

  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  ${logo.markup}
  ${panel.markup}`;

  return {
    svg: svgDoc(CARD_W, CARD_H, content),
    meta: {
      side: "back-A",
      qr: {
        x: panel.qrX,
        y: panel.qrY,
        size: panel.qrSize,
        panelX: panel.panelX,
        panelY: panel.panelY,
        panelSize: panel.panel,
        encoded: CONNECT.url,
      },
      logo: { x: logo.x, y: logo.y, w: logo.width, h: logo.height },
    },
  };
}

/** Variant B — corner mark + QR as primary visual. */
async function buildBackB(qr) {
  const mark = await placeLogo("svg/niall-tech-icon-light.svg", {
    x: SAFE,
    y: SAFE,
    width: 72,
  });

  const qrSize = QR_TARGET_PX;
  const qrX = (CARD_W - qrSize) / 2;
  const qrY = (CARD_H - qrSize) / 2 + 12;
  const panel = qrPanel({
    x: qrX,
    y: qrY,
    size: qrSize,
    qr,
    label: null,
  });

  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  ${mark.markup}
  ${panel.markup}`;

  return {
    svg: svgDoc(CARD_W, CARD_H, content),
    meta: {
      side: "back-B",
      qr: {
        x: panel.qrX,
        y: panel.qrY,
        size: panel.qrSize,
        panelX: panel.panelX,
        panelY: panel.panelY,
        panelSize: panel.panel,
        encoded: CONNECT.url,
      },
      logo: { x: mark.x, y: mark.y, w: mark.width, h: mark.height },
    },
  };
}

/** Variant C — split: logo left, QR right. */
async function buildBackC(qr) {
  const logo = await placeLogo("svg/niall-tech-stacked-light.svg", {
    x: SAFE + 20,
    y: (CARD_H - 160) / 2,
    width: 280,
    align: "xMidYMid",
  });

  const qrSize = QR_TARGET_PX;
  const qrX = CARD_W - SAFE - qrSize;
  const qrY = (CARD_H - qrSize) / 2;
  const panel = qrPanel({
    x: qrX,
    y: qrY,
    size: qrSize,
    qr,
    label: CONNECT.qrCta,
    labelBelow: true,
  });

  // Soft vertical divider for structure without clutter.
  const midX = CARD_W / 2;
  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  <line x1="${midX}" y1="${SAFE + 40}" x2="${midX}" y2="${CARD_H - SAFE - 40}" stroke="${BRAND.navyMid}" stroke-width="2"/>
  ${logo.markup}
  ${panel.markup}`;

  return {
    svg: svgDoc(CARD_W, CARD_H, content),
    meta: {
      side: "back-C",
      qr: {
        x: panel.qrX,
        y: panel.qrY,
        size: panel.qrSize,
        panelX: panel.panelX,
        panelY: panel.panelY,
        panelSize: panel.panel,
        encoded: CONNECT.url,
      },
      logo: { x: logo.x, y: logo.y, w: logo.width, h: logo.height },
    },
  };
}

async function emitCardFiles(baseName, svgString, destDirs) {
  const pxWidth = CARD_W;
  const png = rasterize(svgString, pxWidth);

  for (const dir of destDirs) {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${baseName}.svg`), svgString, "utf8");
    await writeFile(path.join(dir, `${baseName}.png`), png);
    await writePdfFromPng(
      path.join(dir, `${baseName}.pdf`),
      png,
      FULL_W_IN,
      FULL_H_IN,
    );
  }
  return png;
}

function vcardBody() {
  // vCard 3.0 — broadly supported on iOS / Android.
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${PERSON.lastName};${PERSON.firstName};;;`,
    `FN:${PERSON.name}`,
    `ORG:${COMPANY.name}`,
    `TITLE:${PERSON.title}`,
    `TEL;TYPE=WORK,VOICE:${PERSON.phoneHref}`,
    `EMAIL;TYPE=INTERNET,WORK:${PERSON.email}`,
    `URL:${COMPANY.websiteUrl}`,
    `NOTE:${PERSON.intro}`,
    "END:VCARD",
  ];
  return `${lines.join("\r\n")}\r\n`;
}

async function writeVcard() {
  await mkdir(CONTACT_DIR, { recursive: true });
  const out = path.join(CONTACT_DIR, "paul-dent.vcf");
  await writeFile(out, vcardBody(), "utf8");
  console.log(`vcard: ${path.relative(ROOT, out)}`);
}

function guideOverlay({ showLabels = true } = {}) {
  const trimX = BLEED;
  const trimY = BLEED;
  const trimW = CARD_W - BLEED * 2;
  const trimH = CARD_H - BLEED * 2;
  const safeX = SAFE;
  const safeY = SAFE;
  const safeW = CARD_W - SAFE * 2;
  const safeH = CARD_H - SAFE * 2;
  const labels = showLabels
    ? `
  <text x="${trimX + 8}" y="${trimY - 8}" fill="#DC2626" font-size="14" font-weight="600">TRIM</text>
  <text x="${safeX + 8}" y="${safeY - 8}" fill="#16A34A" font-size="14" font-weight="600">SAFE</text>
  <text x="8" y="20" fill="#F59E0B" font-size="14" font-weight="600">BLEED</text>`
    : "";
  return `
  <rect x="0.5" y="0.5" width="${CARD_W - 1}" height="${CARD_H - 1}" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="${trimX}" y="${trimY}" width="${trimW}" height="${trimH}" fill="none" stroke="#DC2626" stroke-width="2"/>
  <rect x="${safeX}" y="${safeY}" width="${safeW}" height="${safeH}" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="6 4"/>
  ${labels}`;
}

async function buildPreviewSheet({ frontSvg, variants }) {
  // Preview canvas: 11×8.5 landscape inches at 150 dpi for a review sheet.
  const sheetWIn = 11;
  const sheetHIn = 8.5;
  const sheetDpi = 150;
  const W = Math.round(sheetWIn * sheetDpi);
  const H = Math.round(sheetHIn * sheetDpi);

  const cardScale = 0.42; // enlarged review size on the sheet
  const cardDispW = CARD_W * cardScale;
  const cardDispH = CARD_H * cardScale;
  const actualScale = sheetDpi / DPI; // true 100% relative to sheet dpi
  const actualW = CARD_W * actualScale;
  const actualH = CARD_H * actualScale;

  const embed = (svgString, id) => {
    const inner = svgString
      .replace(/<\?xml[^>]*>/, "")
      .replace(/<svg[^>]*>/, `<g id="${id}">`)
      .replace(/<\/svg>\s*$/, "</g>");
    return inner;
  };

  const frontInner = embed(frontSvg, "front");
  const aInner = embed(variants.A.svg, "backA");
  const bInner = embed(variants.B.svg, "backB");
  const cInner = embed(variants.C.svg, "backC");

  const colGap = 36;
  const row1Y = 110;
  const row2Y = 110 + cardDispH + 70;
  const leftX = 48;

  const slot = (x, y, label, recommended = false) => `
  <text x="${x}" y="${y - 14}" fill="#0B1320" font-size="18" font-weight="700">${esc(label)}${recommended ? "  ·  RECOMMENDED" : ""}</text>
  <rect x="${x - 4}" y="${y - 4}" width="${cardDispW + 8}" height="${cardDispH + 8}" fill="#E5E7EB" rx="4"/>`;

  const content = `
  <rect width="${W}" height="${H}" fill="#F7F9FC"/>
  <text x="48" y="48" fill="#0B1320" font-size="28" font-weight="700">Niall Tech — Business card preview</text>
  <text x="48" y="76" fill="#475569" font-size="14">Finished ${TRIM_W_IN}" × ${TRIM_H_IN}"  ·  Full bleed ${FULL_W_IN}" × ${FULL_H_IN}"  ·  Safe ${SAFE_FROM_TRIM_IN}" inside trim  ·  QR → ${esc(CONNECT.url)}</text>

  ${slot(leftX, row1Y, "Front")}
  <svg x="${leftX}" y="${row1Y}" width="${cardDispW}" height="${cardDispH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${frontInner}${guideOverlay()}</svg>

  ${slot(leftX + cardDispW + colGap, row1Y, "Back — Variant A", RECOMMENDED === "A")}
  <svg x="${leftX + cardDispW + colGap}" y="${row1Y}" width="${cardDispW}" height="${cardDispH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${aInner}${guideOverlay()}</svg>

  ${slot(leftX, row2Y, "Back — Variant B", RECOMMENDED === "B")}
  <svg x="${leftX}" y="${row2Y}" width="${cardDispW}" height="${cardDispH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${bInner}${guideOverlay()}</svg>

  ${slot(leftX + cardDispW + colGap, row2Y, "Back — Variant C", RECOMMENDED === "C")}
  <svg x="${leftX + cardDispW + colGap}" y="${row2Y}" width="${cardDispW}" height="${cardDispH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${cInner}${guideOverlay()}</svg>

  <text x="${W - 48}" y="48" text-anchor="end" fill="#0B1320" font-size="16" font-weight="600">Actual-size (100%)</text>
  <text x="${W - 48}" y="70" text-anchor="end" fill="#475569" font-size="12">Print this sheet at 100% scale to verify size</text>
  <svg x="${W - 48 - actualW}" y="90" width="${actualW}" height="${actualH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${frontInner}${guideOverlay({ showLabels: false })}</svg>
  <svg x="${W - 48 - actualW}" y="${90 + actualH + 16}" width="${actualW}" height="${actualH}" viewBox="0 0 ${CARD_W} ${CARD_H}">${embed(variants[RECOMMENDED].svg, "backFinalActual")}${guideOverlay({ showLabels: false })}</svg>

  <g font-size="12" fill="#475569">
    <rect x="48" y="${H - 56}" width="18" height="10" fill="none" stroke="#F59E0B" stroke-width="2"/>
    <text x="72" y="${H - 46}">Bleed</text>
    <rect x="140" y="${H - 56}" width="18" height="10" fill="none" stroke="#DC2626" stroke-width="2"/>
    <text x="164" y="${H - 46}">Trim</text>
    <rect x="230" y="${H - 56}" width="18" height="10" fill="none" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="254" y="${H - 46}">Safe</text>
  </g>`;

  const previewSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${sheetWIn}in" height="${sheetHIn}in" font-family="Inter, Arial, Helvetica, sans-serif">
${content}
</svg>
`;

  await mkdir(PREVIEW_DIR, { recursive: true });
  await writeFile(path.join(PREVIEW_DIR, "business-card-preview.svg"), previewSvg, "utf8");
  const png = rasterize(previewSvg, W);
  await writeFile(path.join(PREVIEW_DIR, "business-card-preview.png"), png);
  await writePdfFromPng(
    path.join(PREVIEW_DIR, "business-card-preview.pdf"),
    png,
    sheetWIn,
    sheetHIn,
  );

  // Lightweight HTML preview for browser review.
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Niall Tech — Business card preview</title>
  <style>
    :root { color-scheme: light; font-family: Inter, system-ui, sans-serif; }
    body { margin: 0; background: #F7F9FC; color: #0B1320; }
    main { max-width: 1100px; margin: 0 auto; padding: 32px 20px 64px; }
    h1 { font-size: 1.5rem; margin: 0 0 8px; }
    p { color: #475569; line-height: 1.5; }
    .grid { display: grid; gap: 28px; margin-top: 28px; }
    @media (min-width: 800px) { .grid { grid-template-columns: 1fr 1fr; } }
    figure { margin: 0; }
    figcaption { font-weight: 600; margin-bottom: 8px; }
    img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 12px 40px -24px rgba(15,23,42,.45); background: #0B1320; }
    .rec { color: #146BFF; font-size: .85rem; }
    .meta { font-size: .9rem; }
    code { background: #E5E7EB; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <main>
    <h1>Niall Tech business card preview</h1>
    <p class="meta">Finished <code>${TRIM_W_IN}" × ${TRIM_H_IN}"</code> · Full bleed <code>${FULL_W_IN}" × ${FULL_H_IN}"</code> · QR → <code>${esc(CONNECT.url)}</code></p>
    <p>Recommended back: <strong>Variant ${RECOMMENDED}</strong>. Print <code>business-card-preview.pdf</code> at 100% scale for an actual-size check before VistaPrint ordering.</p>
    <div class="grid">
      <figure>
        <figcaption>Front</figcaption>
        <img src="../exports/niall-tech-business-card-front.png" alt="Business card front"/>
      </figure>
      <figure>
        <figcaption>Back — Variant A ${RECOMMENDED === "A" ? '<span class="rec">Recommended</span>' : ""}</figcaption>
        <img src="../concepts/back-variant-a.png" alt="Back variant A"/>
      </figure>
      <figure>
        <figcaption>Back — Variant B ${RECOMMENDED === "B" ? '<span class="rec">Recommended</span>' : ""}</figcaption>
        <img src="../concepts/back-variant-b.png" alt="Back variant B"/>
      </figure>
      <figure>
        <figcaption>Back — Variant C ${RECOMMENDED === "C" ? '<span class="rec">Recommended</span>' : ""}</figcaption>
        <img src="../concepts/back-variant-c.png" alt="Back variant C"/>
      </figure>
    </div>
  </main>
</body>
</html>
`;
  await writeFile(path.join(PREVIEW_DIR, "index.html"), html, "utf8");
  console.log("preview: business-card-preview.{svg,png,pdf} + index.html");
}

async function writeManifest(meta) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    connectUrl: CONNECT.url,
    recommendedBack: RECOMMENDED,
    dimensions: {
      finishedIn: BUSINESS_CARD.finishedIn,
      fullBleedIn: BUSINESS_CARD.fullBleedIn,
      bleedIn: BLEED_IN,
      safeInsetFromTrimIn: SAFE_FROM_TRIM_IN,
      dpi: DPI,
      designPx: { width: CARD_W, height: CARD_H },
      bleedPx: BLEED,
      safePx: SAFE,
      pdfPoints: { width: FULL_W_IN * 72, height: FULL_H_IN * 72 },
    },
    qr: {
      targetIn: BUSINESS_CARD.qrTargetIn,
      minIn: BUSINESS_CARD.qrMinIn,
      targetPx: QR_TARGET_PX,
      encoded: CONNECT.url,
      errorCorrectionLevel: "M",
      quietZoneModules: 4,
    },
    files: {
      source: [
        "source/front.svg",
        "source/back-final.svg",
        "source/back-variant-a.svg",
        "source/back-variant-b.svg",
        "source/back-variant-c.svg",
      ],
      exports: [
        "exports/niall-tech-business-card-front.pdf",
        "exports/niall-tech-business-card-back.pdf",
        "exports/niall-tech-business-card-front.svg",
        "exports/niall-tech-business-card-back.svg",
        "exports/niall-tech-business-card-front.png",
        "exports/niall-tech-business-card-back.png",
      ],
      qr: ["qr/niall-tech-connect-qr.svg", "qr/niall-tech-connect-qr.png"],
      preview: [
        "preview/business-card-preview.pdf",
        "preview/business-card-preview.png",
        "preview/business-card-preview.svg",
        "preview/index.html",
      ],
      vcard: "public/contact/paul-dent.vcf",
      collateral: [
        "public/brand/collateral/business-card-front.svg",
        "public/brand/collateral/business-card-front.png",
        "public/brand/collateral/business-card-front.pdf",
        "public/brand/collateral/business-card-back.svg",
        "public/brand/collateral/business-card-back.png",
        "public/brand/collateral/business-card-back.pdf",
      ],
    },
    layout: meta,
  };
  await writeFile(
    path.join(CARD_DIR, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}

async function writeReadme() {
  const readme = `# Niall Tech Business Card (VistaPrint)

Production business-card artwork for standard US cards via VistaPrint.

## Source of truth

Editable SVG sources (do not hand-edit binary PDFs):

| File | Role |
|------|------|
| \`source/front.svg\` | Card front |
| \`source/back-final.svg\` | Approved/recommended back (Variant ${RECOMMENDED}) |
| \`source/back-variant-a.svg\` | Concept A — centered logo + QR + CTA |
| \`source/back-variant-b.svg\` | Concept B — corner mark + QR primary |
| \`source/back-variant-c.svg\` | Concept C — split logo / QR |

Logo geometry is embedded from \`public/brand/svg/\` masters. Do **not** recreate or alter the N mark (including the intentional gap in the left side of the N).

Contact data comes from \`src/data/brand-contact.mjs\` — never duplicate phone/email elsewhere.

## Recommended back

**Variant ${RECOMMENDED}** — centered stacked wordmark, large scannable QR, and a quiet “${CONNECT.qrCta}” label. It balances brand recognition with whitespace and scan reliability without repeating contact details.

Variants A–C remain under \`concepts/\` until final approval.

## Print specifications

| Spec | Value |
|------|-------|
| Finished / trim | ${TRIM_W_IN}" × ${TRIM_H_IN}" |
| Bleed | ${BLEED_IN}" each side |
| Full artwork (upload size) | ${FULL_W_IN}" × ${FULL_H_IN}" |
| Safe zone | ≥ ${SAFE_FROM_TRIM_IN}" inside trim |
| Design DPI | ${DPI} |
| PDF page size | ${FULL_W_IN * 72} × ${FULL_H_IN * 72} pt |
| QR printed size | ~${BUSINESS_CARD.qrTargetIn}" square (min ${BUSINESS_CARD.qrMinIn}") |
| QR destination | \`${CONNECT.url}\` |
| QR quiet zone | 4 modules (included in QR asset) |
| Error correction | M |

Guide colors on the preview sheet: amber = bleed, red = trim, green = safe.

## VistaPrint upload files

Upload these print-ready PDFs (full bleed included):

1. **Front:** \`exports/niall-tech-business-card-front.pdf\`
2. **Back:** \`exports/niall-tech-business-card-back.pdf\`

Identical copies are synced to \`public/brand/collateral/business-card-front.pdf\` and \`business-card-back.pdf\` for the brand hub.

## QR code

- Standalone vector: \`qr/niall-tech-connect-qr.svg\`
- PNG fallback (1024px): \`qr/niall-tech-connect-qr.png\`
- Encoded value (exact): \`${CONNECT.url}\`
- Dark navy modules on white; no logo inside the code; no distortion

Validate:

\`\`\`bash
npm run branding:validate
\`\`\`

## Digital card + vCard

- Page: \`${CONNECT.url}\` (\`src/app/connect/page.tsx\`)
- vCard: \`public${CONNECT.vcardPath}\`

## Regenerate exports

\`\`\`bash
npm run branding:build      # cards + QR + vCard + preview
npm run branding:validate   # dimensions, QR decode, vCard, files
\`\`\`

\`npm run brand:collateral\` also regenerates these cards (via the shared builder) along with other stationery.

PDFs are produced from SVG → high-DPI PNG (fonts via Inter TTFs in \`scripts/fonts/\`) → \`pdf-lib\` page sized to ${FULL_W_IN}" × ${FULL_H_IN}". Do not rename \`.svg\` to \`.pdf\`.

## Actual-size print test

1. Open \`preview/business-card-preview.pdf\`
2. Print at **100% / actual size** (disable “fit to page”)
3. Confirm trim measures ${TRIM_W_IN}" × ${TRIM_H_IN}" after accounting for bleed marks
4. Scan the QR from the printed sheet with a phone camera
5. Confirm Save Contact on \`/connect\` installs the vCard on iPhone and Android

A physical 100%-scale print test is still required before placing a VistaPrint order.

## Do not manually edit

- \`exports/*.pdf\` / \`exports/*.png\`
- \`public/brand/collateral/business-card-*.pdf\` (generated)
- \`qr/*.png\` (generated)
- Binary previews

Edit via \`scripts/build-business-card.mjs\` + \`src/data/brand-contact.mjs\`, then regenerate.
`;

  await writeFile(path.join(CARD_DIR, "README.md"), readme, "utf8");

  const conceptsReadme = `# Business card back concepts

Three restrained back variants sharing the same front.

| Variant | Idea | File |
|---------|------|------|
| A | Centered stacked logo, QR beneath, “${CONNECT.qrCta}” | \`back-variant-a.svg\` |
| B | Small mark in corner, QR as primary element | \`back-variant-b.svg\` |
| C | Split: logo left, QR right, generous whitespace | \`back-variant-c.svg\` |

**Recommended for production:** Variant **${RECOMMENDED}**.

\`source/back-final.svg\` and \`exports/niall-tech-business-card-back.*\` always mirror the recommended variant until approval changes \`BUSINESS_CARD.recommendedBack\` in \`src/data/brand-contact.mjs\`.
`;
  await writeFile(path.join(CONCEPTS_DIR, "README.md"), conceptsReadme, "utf8");
}

export async function buildBusinessCard() {
  for (const f of FONT_FILES) {
    if (!(await exists(f))) {
      throw new Error(`Missing font ${f}. Run npm run brand:build first.`);
    }
  }

  for (const dir of [
    SOURCE_DIR,
    EXPORTS_DIR,
    QR_DIR,
    PREVIEW_DIR,
    CONCEPTS_DIR,
    COLLATERAL_DIR,
    CONTACT_DIR,
  ]) {
    await mkdir(dir, { recursive: true });
  }

  const qr = await buildQrAssets();
  await writeVcard();

  const front = await buildFront();
  const backA = await buildBackA(qr);
  const backB = await buildBackB(qr);
  const backC = await buildBackC(qr);
  const variants = { A: backA, B: backB, C: backC };
  const finalBack = variants[RECOMMENDED];

  // Source SVGs
  await writeFile(path.join(SOURCE_DIR, "front.svg"), front.svg, "utf8");
  await writeFile(path.join(SOURCE_DIR, "back-final.svg"), finalBack.svg, "utf8");
  await writeFile(path.join(SOURCE_DIR, "back-variant-a.svg"), backA.svg, "utf8");
  await writeFile(path.join(SOURCE_DIR, "back-variant-b.svg"), backB.svg, "utf8");
  await writeFile(path.join(SOURCE_DIR, "back-variant-c.svg"), backC.svg, "utf8");

  // Concepts folder (labeled + PNG previews)
  await writeFile(path.join(CONCEPTS_DIR, "back-variant-a.svg"), backA.svg, "utf8");
  await writeFile(path.join(CONCEPTS_DIR, "back-variant-b.svg"), backB.svg, "utf8");
  await writeFile(path.join(CONCEPTS_DIR, "back-variant-c.svg"), backC.svg, "utf8");
  await writeFile(
    path.join(CONCEPTS_DIR, "back-variant-a.png"),
    rasterize(backA.svg, CARD_W),
  );
  await writeFile(
    path.join(CONCEPTS_DIR, "back-variant-b.png"),
    rasterize(backB.svg, CARD_W),
  );
  await writeFile(
    path.join(CONCEPTS_DIR, "back-variant-c.png"),
    rasterize(backC.svg, CARD_W),
  );

  // Named exports
  await emitCardFiles("niall-tech-business-card-front", front.svg, [EXPORTS_DIR]);
  await emitCardFiles("niall-tech-business-card-back", finalBack.svg, [EXPORTS_DIR]);

  // Sync production copies into existing collateral paths (brand hub)
  await emitCardFiles("business-card-front", front.svg, [COLLATERAL_DIR]);
  await emitCardFiles("business-card-back", finalBack.svg, [COLLATERAL_DIR]);

  await buildPreviewSheet({
    frontSvg: front.svg,
    variants,
  });

  await writeManifest({
    front: front.meta,
    backFinal: finalBack.meta,
    variants: {
      A: backA.meta,
      B: backB.meta,
      C: backC.meta,
    },
  });
  await writeReadme();

  console.log(
    `business-card: front + back (variant ${RECOMMENDED}) → ${path.relative(ROOT, CARD_DIR)}`,
  );
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  buildBusinessCard().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
