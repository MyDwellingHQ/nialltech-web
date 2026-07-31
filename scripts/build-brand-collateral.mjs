/**
 * Niall Tech — print & digital collateral generator.
 * ----------------------------------------------------------------------------
 * Every piece is designed as a print-dimensioned SVG that embeds the approved
 * logo masters from public/brand/svg (the single source of truth), then is
 * emitted three ways:
 *   • .svg  — editable vector source
 *   • .png  — 300dpi (cards) / 200dpi (letter docs) flattened raster
 *   • .pdf  — print-ready, correctly sized page wrapping the raster
 * Also emits responsive + Outlook-safe email signatures and social banners.
 *
 * Run after build-brand-assets.mjs (needs the regenerated logo masters).
 */

import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import { COMPANY, PERSON, BRAND } from "../src/data/brand-contact.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BRAND_DIR = path.join(ROOT, "public/brand");
const OUT = path.join(BRAND_DIR, "collateral");
const EMAIL_OUT = path.join(BRAND_DIR, "email");
const SOCIAL_OUT = path.join(BRAND_DIR, "social");
const FONTS_DIR = path.join(__dirname, "fonts");

const FONT_FILES = [
  path.join(FONTS_DIR, "Inter-Bold.ttf"),
  path.join(FONTS_DIR, "Inter-SemiBold.ttf"),
  path.join(FONTS_DIR, "Inter-Medium.ttf"),
  path.join(FONTS_DIR, "Inter-Regular.ttf"),
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** Strip xml/svg/title wrapper, returning inner markup + original viewBox. */
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

/** Place a logo master as a positioned, scaled nested <svg>. */
async function placeLogo(relPath, { x, y, width, align = "xMinYMid" }) {
  const { inner, viewBox } = await logoInner(relPath);
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);
  const height = (width * vh) / vw;
  return {
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

/** A small stroked contact icon at (x,y) top-left, `s` px box. */
function icon(name, x, y, s, color) {
  const scale = s / 24;
  const g = (paths) =>
    `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`;
  if (name === "phone") return g(`<path d="${ICONS.phone}"/>`);
  if (name === "mail")
    return g(`<path d="${ICONS.mail}"/><path d="${ICONS.mailLine}"/>`);
  return g(`<path d="${ICONS.globe}"/><path d="${ICONS.globeLines}"/>`);
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svgDoc(w, h, content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Inter, Arial, sans-serif">
${content}
</svg>`;
}

function rasterize(svgString, pxWidth) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: pxWidth },
    font: { fontFiles: FONT_FILES, loadSystemFonts: true, defaultFontFamily: "Inter" },
  });
  return resvg.render().asPng();
}

async function writeSvg(name, svgString) {
  await writeFile(path.join(OUT, `${name}.svg`), svgString, "utf8");
}

async function writePng(name, svgString, pxWidth) {
  const png = rasterize(svgString, pxWidth);
  await writeFile(path.join(OUT, `${name}.png`), png);
  return png;
}

/** Wrap a raster into a correctly-sized PDF page (points = inches*72). */
async function writePdf(name, pngBytes, widthIn, heightIn) {
  const pdf = await PDFDocument.create();
  const img = await pdf.embedPng(pngBytes);
  const page = pdf.addPage([widthIn * 72, heightIn * 72]);
  page.drawImage(img, { x: 0, y: 0, width: widthIn * 72, height: heightIn * 72 });
  const bytes = await pdf.save();
  await writeFile(path.join(OUT, `${name}.pdf`), bytes);
}

/** Emit svg + png + pdf for one print piece. */
async function emitPiece(name, { svg, widthIn, heightIn, dpi = 300 }) {
  await writeSvg(name, svg);
  const pxWidth = Math.round(widthIn * dpi);
  const png = await writePng(name, svg, pxWidth);
  await writePdf(name, png, widthIn, heightIn);
  console.log(`piece: ${name} (${widthIn}"x${heightIn}" @ ${dpi}dpi)`);
}

// ---------------------------------------------------------------------------
// Business card (3.5 x 2 in + 0.125" bleed => 3.75 x 2.25 in; 300dpi = 1125x675)
// ---------------------------------------------------------------------------
const CARD_W = 1125;
const CARD_H = 675;
const BLEED = 37.5; // 0.125"
const SAFE = BLEED + 60; // trim + inner padding

async function cardFront() {
  const logo = await placeLogo("svg/niall-tech-horizontal-light.svg", {
    x: SAFE,
    y: SAFE - 8,
    width: 360,
  });
  const cy = CARD_H - SAFE; // bottom baseline region
  const contactX = CARD_W - SAFE - 300;
  const line = (i) => cy - 96 + i * 40;
  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  <rect x="0" y="0" width="10" height="${CARD_H}" fill="${BRAND.blue}"/>
  ${logo.markup}
  <text x="${SAFE}" y="${cy - 44}" fill="${BRAND.white}" font-size="46" font-weight="700" letter-spacing="0.5">${esc(PERSON.name)}</text>
  <text x="${SAFE}" y="${cy - 8}" fill="${BRAND.cyan}" font-size="24" font-weight="500" letter-spacing="1.5">${esc(PERSON.title)}</text>
  <g font-size="23" font-weight="400">
    ${icon("phone", contactX, line(0) - 18, 22, BRAND.blue)}
    <text x="${contactX + 36}" y="${line(0)}" fill="${BRAND.lightGray}">${esc(PERSON.phone)}</text>
    ${icon("mail", contactX, line(1) - 18, 22, BRAND.blue)}
    <text x="${contactX + 36}" y="${line(1)}" fill="${BRAND.lightGray}">${esc(PERSON.email)}</text>
    ${icon("globe", contactX, line(2) - 18, 22, BRAND.blue)}
    <text x="${contactX + 36}" y="${line(2)}" fill="${BRAND.lightGray}">${esc(COMPANY.website)}</text>
  </g>`;
  await emitPiece("business-card-front", {
    svg: svgDoc(CARD_W, CARD_H, content),
    widthIn: 3.75,
    heightIn: 2.25,
  });
}

async function cardBack() {
  const logo = await placeLogo("svg/niall-tech-stacked-light.svg", {
    x: CARD_W / 2 - 210,
    y: 150,
    width: 420,
    align: "xMidYMid",
  });
  // QR to website — navy modules on white panel so it scans on the navy card.
  const qr = await QRCode.toString(COMPANY.websiteUrl, {
    type: "svg",
    margin: 0,
    color: { dark: BRAND.navy, light: "#0000" },
    errorCorrectionLevel: "M",
  });
  const qrInner = qr.replace(/<\?xml[^>]*>/, "").replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const qrVb = qr.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 25 25";
  const qrSize = 150;
  const qrX = CARD_W - SAFE - qrSize;
  const qrY = CARD_H - SAFE - qrSize;
  const taglineY = 470;
  const content = `
  <rect width="${CARD_W}" height="${CARD_H}" fill="${BRAND.navy}"/>
  ${logo.markup}
  <g font-size="26" font-weight="500" letter-spacing="3" text-anchor="middle" fill="${BRAND.lightGray}">
    <text x="${CARD_W / 2}" y="${taglineY}">${esc(COMPANY.taglineStack[0])} &#160; ${esc(COMPANY.taglineStack[1])} &#160; ${esc(COMPANY.taglineStack[2])}</text>
  </g>
  <rect x="${qrX - 16}" y="${qrY - 16}" width="${qrSize + 32}" height="${qrSize + 32}" rx="16" fill="${BRAND.white}"/>
  <svg x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}" viewBox="${qrVb}" preserveAspectRatio="xMidYMid meet">${qrInner}</svg>
  <text x="${SAFE}" y="${CARD_H - SAFE - 4}" fill="${BRAND.slate}" font-size="22" font-weight="500" letter-spacing="1">${esc(COMPANY.website)}</text>`;
  await emitPiece("business-card-back", {
    svg: svgDoc(CARD_W, CARD_H, content),
    widthIn: 3.75,
    heightIn: 2.25,
  });
}

// ---------------------------------------------------------------------------
// Letter-size documents (8.5 x 11 in). 200dpi => 1700 x 2200
// ---------------------------------------------------------------------------
const PAGE_W = 1700;
const PAGE_H = 2200;
const M = 150; // margin

async function letterhead() {
  const logo = await placeLogo("svg/niall-tech-horizontal.svg", { x: M, y: M, width: 430 });
  const footerY = PAGE_H - M;
  const footer = `${COMPANY.website}  ·  ${COMPANY.email}  ·  ${COMPANY.phone}`;
  const content = `
  <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BRAND.white}"/>
  ${logo.markup}
  <line x1="${M}" y1="${M + 150}" x2="${PAGE_W - M}" y2="${M + 150}" stroke="${BRAND.lightGray}" stroke-width="2"/>
  <line x1="${M}" y1="${footerY - 46}" x2="${PAGE_W - M}" y2="${footerY - 46}" stroke="${BRAND.lightGray}" stroke-width="2"/>
  <text x="${PAGE_W / 2}" y="${footerY}" text-anchor="middle" fill="${BRAND.slate}" font-size="26" font-weight="500" letter-spacing="1.5">${esc(footer)}</text>
  <rect x="0" y="0" width="${PAGE_W}" height="14" fill="${BRAND.navy}"/>
  <rect x="0" y="0" width="${PAGE_W * 0.34}" height="14" fill="${BRAND.blue}"/>`;
  await emitPiece("letterhead", {
    svg: svgDoc(PAGE_W, PAGE_H, content),
    widthIn: 8.5,
    heightIn: 11,
    dpi: 200,
  });
}

async function invoice() {
  const logo = await placeLogo("svg/niall-tech-horizontal.svg", { x: M, y: M, width: 360 });
  const rightX = PAGE_W - M;
  const rows = [
    ["Microsoft 365 tenant setup & Entra ID hardening", "8", "185.00", "1,480.00"],
    ["Intune endpoint enrollment & compliance policies", "6", "185.00", "1,110.00"],
    ["Network assessment & firewall configuration", "5", "175.00", "875.00"],
    ["Managed backup & disaster-recovery onboarding", "4", "175.00", "700.00"],
  ];
  const subtotal = "4,165.00";
  const tax = "0.00";
  const total = "4,165.00";
  const tableTop = 760;
  const rowH = 74;
  const cols = { desc: M, qty: 1040, rate: 1230, amt: rightX };
  const headerRow = `
    <rect x="${M}" y="${tableTop}" width="${PAGE_W - 2 * M}" height="56" fill="${BRAND.navy}"/>
    <text x="${cols.desc + 20}" y="${tableTop + 38}" fill="${BRAND.white}" font-size="24" font-weight="600">Description</text>
    <text x="${cols.qty}" y="${tableTop + 38}" fill="${BRAND.white}" font-size="24" font-weight="600" text-anchor="end">Hrs</text>
    <text x="${cols.rate}" y="${tableTop + 38}" fill="${BRAND.white}" font-size="24" font-weight="600" text-anchor="end">Rate</text>
    <text x="${cols.amt}" y="${tableTop + 38}" fill="${BRAND.white}" font-size="24" font-weight="600" text-anchor="end">Amount</text>`;
  const bodyRows = rows
    .map((r, i) => {
      const y = tableTop + 56 + i * rowH;
      return `
    ${i % 2 ? `<rect x="${M}" y="${y}" width="${PAGE_W - 2 * M}" height="${rowH}" fill="${BRAND.offWhite}"/>` : ""}
    <text x="${cols.desc + 20}" y="${y + 46}" fill="${BRAND.navy}" font-size="23">${esc(r[0])}</text>
    <text x="${cols.qty}" y="${y + 46}" fill="${BRAND.navy}" font-size="23" text-anchor="end">${r[1]}</text>
    <text x="${cols.rate}" y="${y + 46}" fill="${BRAND.navy}" font-size="23" text-anchor="end">$${r[2]}</text>
    <text x="${cols.amt}" y="${y + 46}" fill="${BRAND.navy}" font-size="23" text-anchor="end">$${r[3]}</text>`;
    })
    .join("");
  const totalsTop = tableTop + 56 + rows.length * rowH + 30;
  const totals = [
    ["Subtotal", subtotal],
    ["Tax (0%)", tax],
    ["Total Due", total],
  ]
    .map(([label, val], i) => {
      const y = totalsTop + i * 50;
      const bold = i === 2;
      return `
    <text x="${cols.rate}" y="${y}" fill="${bold ? BRAND.navy : BRAND.slate}" font-size="${bold ? 28 : 24}" font-weight="${bold ? 700 : 500}" text-anchor="end">${label}</text>
    <text x="${cols.amt}" y="${y}" fill="${bold ? BRAND.blue : BRAND.navy}" font-size="${bold ? 28 : 24}" font-weight="${bold ? 700 : 500}" text-anchor="end">$${val}</text>`;
    })
    .join("");
  const content = `
  <rect width="${PAGE_W}" height="${PAGE_H}" fill="${BRAND.white}"/>
  <rect x="0" y="0" width="${PAGE_W}" height="14" fill="${BRAND.navy}"/>
  <rect x="0" y="0" width="${PAGE_W * 0.34}" height="14" fill="${BRAND.blue}"/>
  ${logo.markup}
  <text x="${rightX}" y="${M + 40}" text-anchor="end" fill="${BRAND.navy}" font-size="64" font-weight="700" letter-spacing="2">INVOICE</text>
  <text x="${rightX}" y="${M + 84}" text-anchor="end" fill="${BRAND.slate}" font-size="24">Invoice #NT-1042 · Net 15</text>
  <g font-size="24">
    <text x="${M}" y="${M + 250}" fill="${BRAND.slate}" font-weight="600">BILL TO</text>
    <text x="${M}" y="${M + 292}" fill="${BRAND.navy}">Client organization</text>
    <text x="${M}" y="${M + 328}" fill="${BRAND.navy}">Accounts payable</text>
    <text x="${rightX}" y="${M + 250}" text-anchor="end" fill="${BRAND.slate}" font-weight="600">DETAILS</text>
    <text x="${rightX}" y="${M + 292}" text-anchor="end" fill="${BRAND.navy}">Issue date: on generation</text>
    <text x="${rightX}" y="${M + 328}" text-anchor="end" fill="${BRAND.navy}">From: ${esc(COMPANY.name)}</text>
  </g>
  ${headerRow}
  ${bodyRows}
  ${totals}
  <text x="${M}" y="${PAGE_H - M}" fill="${BRAND.slate}" font-size="22">Payment: ${esc(COMPANY.email)} · ${esc(COMPANY.website)} · ${esc(COMPANY.phone)}</text>`;
  await emitPiece("invoice", {
    svg: svgDoc(PAGE_W, PAGE_H, content),
    widthIn: 8.5,
    heightIn: 11,
    dpi: 200,
  });
}

async function coverPage(name, kicker, title) {
  const logo = await placeLogo("svg/niall-tech-horizontal-light.svg", { x: M, y: M, width: 430 });
  const content = `
  <defs>
    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.navy}"/>
      <stop offset="55%" stop-color="${BRAND.navyDeep}"/>
      <stop offset="100%" stop-color="${BRAND.navyMid}"/>
    </linearGradient>
  </defs>
  <rect width="${PAGE_W}" height="${PAGE_H}" fill="url(#cg)"/>
  <g opacity="0.16" stroke="${BRAND.blue}" stroke-width="2">
    <line x1="0" y1="${PAGE_H * 0.34}" x2="${PAGE_W}" y2="${PAGE_H * 0.24}"/>
    <line x1="0" y1="${PAGE_H * 0.7}" x2="${PAGE_W}" y2="${PAGE_H * 0.6}" stroke="${BRAND.cyan}"/>
  </g>
  ${logo.markup}
  <rect x="${M}" y="${PAGE_H * 0.52}" width="120" height="10" fill="${BRAND.blue}"/>
  <text x="${M}" y="${PAGE_H * 0.52 + 70}" fill="${BRAND.cyan}" font-size="30" font-weight="600" letter-spacing="6">${esc(kicker)}</text>
  ${title
    .split("\n")
    .map(
      (t, i) =>
        `<text x="${M}" y="${PAGE_H * 0.52 + 190 + i * 130}" fill="${BRAND.white}" font-size="118" font-weight="700" letter-spacing="1">${esc(t)}</text>`,
    )
    .join("\n  ")}
  <text x="${M}" y="${PAGE_H * 0.52 + 190 + title.split("\n").length * 130 + 60}" fill="${BRAND.lightGray}" font-size="34" font-weight="500" letter-spacing="2">${esc(COMPANY.tagline)}</text>
  <text x="${M}" y="${PAGE_H - M}" fill="${BRAND.lightGray}" font-size="26" font-weight="500">${esc(COMPANY.name)} · ${esc(COMPANY.website)} · ${esc(COMPANY.email)}</text>`;
  await emitPiece(name, {
    svg: svgDoc(PAGE_W, PAGE_H, content),
    widthIn: 8.5,
    heightIn: 11,
    dpi: 200,
  });
}

// ---------------------------------------------------------------------------
// Social banners
// ---------------------------------------------------------------------------
async function banner(name, w, h, { logoWidth, headline = true }) {
  const logo = await placeLogo("svg/niall-tech-horizontal-light.svg", {
    x: Math.round(w * 0.06),
    y: Math.round(h / 2 - (logoWidth * 100) / 420 / 2),
    width: logoWidth,
  });
  const hx = Math.round(w * 0.06);
  const hlTop = Math.round(h * 0.5) - 70;
  const headlineBlock = headline
    ? `<g font-weight="700" font-size="${Math.round(h * 0.12)}" fill="${BRAND.white}" letter-spacing="1">
        <text x="${w - hx}" y="${hlTop}" text-anchor="end">${esc(COMPANY.headline[0])}</text>
        <text x="${w - hx}" y="${hlTop + Math.round(h * 0.14)}" text-anchor="end">${esc(COMPANY.headline[1])}</text>
        <text x="${w - hx}" y="${hlTop + Math.round(h * 0.28)}" text-anchor="end" fill="${BRAND.cyan}">${esc(COMPANY.headline[2])}</text>
      </g>`
    : "";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Inter, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.navy}"/>
      <stop offset="55%" stop-color="${BRAND.navyDeep}"/>
      <stop offset="100%" stop-color="${BRAND.navyMid}"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="${BRAND.blue}" stroke-width="1" opacity="0.10"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <g opacity="0.18" stroke="${BRAND.cyan}" stroke-width="2">
    <line x1="0" y1="${h * 0.8}" x2="${w}" y2="${h * 0.62}"/>
  </g>
  ${logo.markup}
  ${headlineBlock}
</svg>`;
  const png = rasterize(svg, w);
  await writeFile(path.join(SOCIAL_OUT, `${name}.png`), png);
  await writeFile(path.join(SOCIAL_OUT, `${name}.svg`), svg, "utf8");
  console.log(`banner: ${name} (${w}x${h})`);
}

// ---------------------------------------------------------------------------
// Email signatures
// ---------------------------------------------------------------------------
function signatureHtml({ outlookSafe }) {
  const logoUrl = `${COMPANY.websiteUrl}/brand/png/horizontal/niall-tech-horizontal-500.png`;
  const services = COMPANY.services.join("&nbsp;&nbsp;·&nbsp;&nbsp;");
  const nameBlock = `
        <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#0B1320;padding-bottom:2px;">${PERSON.name}</td></tr>
        <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#146BFF;font-weight:bold;padding-bottom:8px;">${PERSON.shortTitle}, ${COMPANY.name}</td></tr>
        <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;line-height:20px;">
          <a href="tel:${PERSON.phoneHref}" style="color:#475569;text-decoration:none;">${PERSON.phone}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="mailto:${PERSON.email}" style="color:#475569;text-decoration:none;">${PERSON.email}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="${COMPANY.websiteUrl}" style="color:#146BFF;text-decoration:none;font-weight:bold;">${COMPANY.website}</a>
        </td></tr>
        <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#94A3B8;letter-spacing:0.5px;padding-top:8px;">${services}</td></tr>`;
  const logoCell = `<td style="padding-right:22px;border-right:3px solid #146BFF;vertical-align:top;">
        <img src="${logoUrl}" width="150" height="36" alt="${COMPANY.name}" style="display:block;border:0;outline:none;"/>
      </td>`;
  const spacer = `<td style="width:22px;">&nbsp;</td>`;
  const body = `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
    <tr>
      ${logoCell}
      ${spacer}
      <td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" role="presentation">${nameBlock}</table></td>
    </tr>
  </table>`;

  if (outlookSafe) {
    return `<!-- Niall Tech email signature — Outlook-safe (paste into Outlook > Signatures) -->
<!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
${body}
<!--[if mso]></td></tr></table><![endif]-->
`;
  }
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${COMPANY.name} — Email Signature (${PERSON.name})</title></head>
<body style="margin:0;padding:24px;background:#f7f9fc;">
  <!-- Responsive HTML signature. Copy everything inside the wrapper into your mail client. -->
  <div style="max-width:520px;">
${body}
  </div>
</body>
</html>
`;
}

async function buildSignatures() {
  await mkdir(EMAIL_OUT, { recursive: true });
  await writeFile(path.join(EMAIL_OUT, "signature-responsive.html"), signatureHtml({ outlookSafe: false }), "utf8");
  await writeFile(path.join(EMAIL_OUT, "signature-outlook.html"), signatureHtml({ outlookSafe: true }), "utf8");
  console.log("email: signature-responsive.html, signature-outlook.html");
}

async function main() {
  for (const dir of [OUT, EMAIL_OUT, SOCIAL_OUT]) await mkdir(dir, { recursive: true });
  for (const f of FONT_FILES) {
    if (!(await exists(f))) throw new Error(`Missing font ${f}. Run brand:build first.`);
  }

  await cardFront();
  await cardBack();
  await letterhead();
  await invoice();
  await coverPage("proposal-cover", "PROPOSAL", "Technology\nProposal");
  await coverPage("sow-cover", "STATEMENT OF WORK", "Statement\nof Work");

  await banner("linkedin-banner-1584x396", 1584, 396, { logoWidth: 360 });
  await banner("x-banner-1500x500", 1500, 500, { logoWidth: 360 });
  await banner("github-org-banner-1280x640", 1280, 640, { logoWidth: 380 });

  await buildSignatures();
  console.log("\nCollateral build complete.");
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { main as buildCollateral };
