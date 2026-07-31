/**
 * Niall Tech — Office templates generator.
 * Produces a branded PowerPoint deck (.pptx) and a Word template (.docx)
 * from the single source of truth (regenerated logo PNGs + shared contact data).
 *
 *   node scripts/build-brand-office.mjs
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Header,
  Footer,
  AlignmentType,
  BorderStyle,
} from "docx";
import { COMPANY, PERSON } from "../src/data/brand-contact.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "public/brand/office");

const NAVY = "0B1320";
const BLUE = "146BFF";
const CYAN = "22C1FF";
const SLATE = "475569";
const LIGHT = "E5E7EB";
const WHITE = "FFFFFF";

const P = (rel) => resolve(ROOT, rel);

async function png(rel) {
  return readFile(P(rel));
}

/* -------------------------------------------------------------------------- */
/*  PowerPoint                                                                */
/* -------------------------------------------------------------------------- */

async function buildPptx() {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "NT16x9", width: 13.333, height: 7.5 });
  pptx.layout = "NT16x9";
  pptx.author = COMPANY.legalName;
  pptx.company = COMPANY.legalName;
  pptx.title = `${COMPANY.name} — Presentation Template`;

  const logoReverse = await png("public/brand/png/reverse/niall-tech-horizontal-white-1000.png");
  const logoHoriz = await png("public/brand/png/horizontal/niall-tech-horizontal-1000.png");
  const iconWhite = await png("public/brand/png/reverse/niall-tech-stacked-white-1000.png");

  // ---- Title slide ----
  const title = pptx.addSlide();
  title.background = { color: NAVY };
  title.addImage({ data: `image/png;base64,${logoReverse.toString("base64")}`, x: 0.9, y: 0.9, w: 3.6, h: 3.6 * (280 / 1000) });
  title.addShape(pptx.ShapeType.rect, { x: 0.9, y: 3.5, w: 1.2, h: 0.09, fill: { color: BLUE } });
  title.addText("Modern IT. Local Expertise.", { x: 0.9, y: 3.7, w: 11, h: 0.5, fontFace: "Inter", fontSize: 16, color: CYAN, charSpacing: 3 });
  title.addText("Presentation Title Goes Here", { x: 0.9, y: 4.2, w: 11.5, h: 1.4, fontFace: "Inter", fontSize: 44, bold: true, color: WHITE });
  title.addText(
    [
      { text: `${PERSON.name}`, options: { bold: true, color: WHITE } },
      { text: `  ·  ${PERSON.title}  ·  ${COMPANY.website}`, options: { color: LIGHT } },
    ],
    { x: 0.9, y: 6.5, w: 11.5, h: 0.5, fontFace: "Inter", fontSize: 13 },
  );

  // ---- Section divider ----
  const divider = pptx.addSlide();
  divider.background = { color: BLUE };
  divider.addImage({ data: `image/png;base64,${iconWhite.toString("base64")}`, x: 0.9, y: 0.8, w: 1.6, h: 1.6 * (760 / 1000) });
  divider.addText("01", { x: 0.9, y: 2.7, w: 3, h: 1, fontFace: "Inter", fontSize: 60, bold: true, color: "8CB8FF" });
  divider.addText("Section Title", { x: 0.9, y: 3.8, w: 11.5, h: 1, fontFace: "Inter", fontSize: 40, bold: true, color: WHITE });
  divider.addText("A short supporting sentence describing this section of the deck.", { x: 0.9, y: 4.8, w: 10, h: 0.6, fontFace: "Inter", fontSize: 16, color: "DCE8FF" });

  // ---- Content slide ----
  const content = pptx.addSlide();
  content.background = { color: WHITE };
  content.addImage({ data: `image/png;base64,${logoHoriz.toString("base64")}`, x: 0.9, y: 0.5, w: 2.4, h: 2.4 * (280 / 1000) });
  content.addShape(pptx.ShapeType.line, { x: 0.9, y: 1.35, w: 11.5, h: 0, line: { color: LIGHT, width: 1 } });
  content.addText("Content Slide Title", { x: 0.9, y: 1.6, w: 11.5, h: 0.8, fontFace: "Inter", fontSize: 30, bold: true, color: NAVY });
  const bullets = [
    "Managed Microsoft 365 administration and security hardening",
    "Proactive cybersecurity monitoring and endpoint protection",
    "Reliable networking and scalable cloud infrastructure",
    "Day-to-day IT support with genuine local expertise",
  ];
  content.addText(
    bullets.map((t) => ({ text: t, options: { bullet: { characterCode: "2022", indent: 18 }, color: SLATE, fontSize: 16, fontFace: "Inter", paraSpaceAfter: 10 } })),
    { x: 0.9, y: 2.5, w: 7.4, h: 3.6, valign: "top" },
  );
  content.addShape(pptx.ShapeType.roundRect, { x: 8.7, y: 2.5, w: 3.7, h: 3.4, rectRadius: 0.12, fill: { color: NAVY } });
  content.addText("Why Niall Tech", { x: 8.95, y: 2.7, w: 3.3, h: 0.5, fontFace: "Inter", fontSize: 16, bold: true, color: CYAN });
  content.addText(
    "Secure, reliable and scalable IT for small businesses and organizations — so you can focus on what's next.",
    { x: 8.95, y: 3.2, w: 3.3, h: 2.4, fontFace: "Inter", fontSize: 14, color: LIGHT, valign: "top" },
  );
  content.addText(`${COMPANY.website}`, { x: 0.9, y: 6.9, w: 11.5, h: 0.4, fontFace: "Inter", fontSize: 11, color: SLATE });

  // ---- Thank you slide ----
  const thanks = pptx.addSlide();
  thanks.background = { color: NAVY };
  thanks.addImage({ data: `image/png;base64,${logoReverse.toString("base64")}`, x: 0.9, y: 0.9, w: 3.2, h: 3.2 * (280 / 1000) });
  thanks.addText("Thank you.", { x: 0.9, y: 3.4, w: 11, h: 1.2, fontFace: "Inter", fontSize: 52, bold: true, color: WHITE });
  thanks.addText(
    [
      { text: `${PERSON.phone}`, options: { color: LIGHT } },
      { text: "     ", options: {} },
      { text: `${PERSON.email}`, options: { color: LIGHT } },
      { text: "     ", options: {} },
      { text: `${COMPANY.website}`, options: { color: CYAN } },
    ],
    { x: 0.9, y: 4.8, w: 11.5, h: 0.5, fontFace: "Inter", fontSize: 15 },
  );
  thanks.addShape(pptx.ShapeType.rect, { x: 0.9, y: 4.6, w: 1.2, h: 0.07, fill: { color: BLUE } });

  const buf = await pptx.write("nodebuffer");
  await writeFile(resolve(OUT, "niall-tech-presentation-template.pptx"), buf);
  console.log("  ✓ niall-tech-presentation-template.pptx (4 slides)");
}

/* -------------------------------------------------------------------------- */
/*  Word                                                                      */
/* -------------------------------------------------------------------------- */

async function buildDocx() {
  const logoHoriz = await png("public/brand/png/horizontal/niall-tech-horizontal-1000.png");
  // horizontal master is 1000x280 → keep ratio
  const headerLogo = new ImageRun({
    type: "png",
    data: logoHoriz,
    transformation: { width: 150, height: 42 },
  });

  const rule = new Paragraph({
    border: { bottom: { color: BLUE, space: 6, style: BorderStyle.SINGLE, size: 12 } },
    spacing: { after: 120 },
  });

  const doc = new Document({
    creator: COMPANY.legalName,
    title: `${COMPANY.name} — Word Template`,
    description: "Branded Word template for Niall Tech documents.",
    styles: {
      default: {
        document: { run: { font: "Inter", size: 22, color: "1F2937" } },
      },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", run: { size: 56, bold: true, color: NAVY, font: "Inter" }, paragraph: { spacing: { after: 120 } } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", run: { size: 30, bold: true, color: NAVY, font: "Inter" }, paragraph: { spacing: { before: 240, after: 120 } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", run: { size: 24, bold: true, color: BLUE, font: "Inter" }, paragraph: { spacing: { before: 200, after: 80 } } },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
        headers: {
          default: new Header({
            children: [new Paragraph({ children: [headerLogo] }), rule],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: { top: { color: LIGHT, space: 6, style: BorderStyle.SINGLE, size: 6 } },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `${COMPANY.legalName}`, bold: true, color: NAVY, size: 16 }),
                  new TextRun({ text: `   ·   ${COMPANY.website}   ·   ${COMPANY.email}   ·   ${COMPANY.phone}`, color: SLATE, size: 16 }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({ style: "Title", text: "Document Title" }),
          new Paragraph({
            children: [new TextRun({ text: COMPANY.tagline.toUpperCase(), color: BLUE, bold: true, size: 18, characterSpacing: 40 })],
            spacing: { after: 240 },
          }),
          new Paragraph({ style: "Heading1", text: "Section Heading" }),
          new Paragraph({
            text: "This is the branded Niall Tech Word template. Body text uses the Inter typeface with the brand's navy and blue palette applied to titles and headings. Replace this content with your document copy — the header logo and footer contact details are already in place on every page.",
            spacing: { after: 160 },
          }),
          new Paragraph({ style: "Heading2", text: "Subsection" }),
          new Paragraph({
            text: "Use Heading 1 and Heading 2 styles for structure. The footer carries the company name and contact information so printed and exported documents stay on-brand.",
          }),
        ],
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  await writeFile(resolve(OUT, "niall-tech-word-template.docx"), buf);
  console.log("  ✓ niall-tech-word-template.docx");
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log("Building Office templates…");
  await buildPptx();
  await buildDocx();
  console.log("Office templates complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
