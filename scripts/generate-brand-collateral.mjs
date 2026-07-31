import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COLORS, renderIconMarkup } from "./logo-geometry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/brand/collateral");

async function write(rel, content) {
  const full = path.join(OUT, rel);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, content, "utf8");
  console.log("collateral:", path.relative(ROOT, full));
}

const icon = renderIconMarkup("medium", "color");
const iconWhite = renderIconMarkup("medium", "white");

function svg(viewBox, w, h, title, content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  ${content}
</svg>
`;
}

await write(
  "business-cards/niall-tech-business-card-front.svg",
  svg(
    "0 0 1050 600",
    1050,
    600,
    "Niall Tech business card front",
    `
  <rect width="1050" height="600" fill="${COLORS.navy}"/>
  <g transform="translate(80,180) scale(2.2)">${iconWhite}</g>
  <text x="340" y="290" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="4">NIALL</text>
  <text x="560" y="290" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="500" letter-spacing="10">TECH</text>
  <text x="340" y="340" fill="#94A3B8" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500" letter-spacing="4">MODERN IT. LOCAL EXPERTISE.</text>
  <text x="80" y="520" fill="#E2E8F0" font-family="Inter, Arial, sans-serif" font-size="22">hello@nialltech.com</text>
  <text x="80" y="555" fill="#94A3B8" font-family="Inter, Arial, sans-serif" font-size="18">nialltech.com</text>
`,
  ),
);

await write(
  "business-cards/niall-tech-business-card-back.svg",
  svg(
    "0 0 1050 600",
    1050,
    600,
    "Niall Tech business card back",
    `
  <rect width="1050" height="600" fill="#FFFFFF"/>
  <rect x="0" y="0" width="18" height="600" fill="${COLORS.blue}"/>
  <g transform="translate(80,120) scale(1.6)">${icon}</g>
  <text x="80" y="360" fill="${COLORS.navy}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">Microsoft-focused IT consulting</text>
  <text x="80" y="410" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="20">M365 · Azure · Entra ID · Intune · Security</text>
  <text x="80" y="520" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="18">Replace name / title / phone before print.</text>
`,
  ),
);

await write(
  "email/niall-tech-email-signature.svg",
  svg(
    "0 0 640 200",
    640,
    200,
    "Niall Tech email signature artwork",
    `
  <rect width="640" height="200" fill="#FFFFFF"/>
  <g transform="translate(24,40) scale(1.1)">${icon}</g>
  <text x="160" y="78" fill="${COLORS.navy}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">Your Name</text>
  <text x="160" y="108" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="16">Title · Niall Tech</text>
  <text x="160" y="145" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="15">hello@nialltech.com · nialltech.com</text>
  <text x="160" y="172" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="13" letter-spacing="2">MODERN IT. LOCAL EXPERTISE.</text>
`,
  ),
);

await write(
  "email/niall-tech-email-signature.html",
  `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>Niall Tech Email Signature</title></head>
<body style="margin:0;padding:24px;background:#f7f9fc;font-family:Inter,Arial,Helvetica,sans-serif;">
  <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
    <tr>
      <td style="padding-right:16px;vertical-align:middle;">
        <img src="https://nialltech.com/brand/svg/niall-tech-icon.svg" width="56" height="56" alt="Niall Tech" style="display:block;border:0;"/>
      </td>
      <td style="vertical-align:middle;border-left:2px solid #146BFF;padding-left:16px;">
        <div style="font-size:16px;font-weight:700;color:#0B1320;line-height:1.3;">Your Name</div>
        <div style="font-size:13px;color:#475569;margin-top:2px;">Title · Niall Tech</div>
        <div style="font-size:13px;margin-top:8px;">
          <a href="mailto:hello@nialltech.com" style="color:#146BFF;text-decoration:none;">hello@nialltech.com</a>
          <span style="color:#94A3B8;"> · </span>
          <a href="https://nialltech.com" style="color:#146BFF;text-decoration:none;">nialltech.com</a>
        </div>
        <div style="font-size:11px;letter-spacing:0.12em;color:#475569;margin-top:8px;text-transform:uppercase;">Modern IT. Local expertise.</div>
      </td>
    </tr>
  </table>
</body>
</html>
`,
);

await write(
  "letterhead/niall-tech-letterhead.svg",
  svg(
    "0 0 850 1100",
    850,
    1100,
    "Niall Tech letterhead",
    `
  <rect width="850" height="1100" fill="#FFFFFF"/>
  <g transform="translate(64,48) scale(0.7)">${icon}</g>
  <text x="160" y="90" fill="${COLORS.navy}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="3">NIALL</text>
  <text x="280" y="90" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" letter-spacing="7">TECH</text>
  <text x="160" y="118" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="11" letter-spacing="3">MODERN IT. LOCAL EXPERTISE.</text>
  <line x1="64" y1="150" x2="786" y2="150" stroke="${COLORS.lightGray}" stroke-width="2"/>
  <text x="64" y="220" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="14">[Date]</text>
  <text x="64" y="280" fill="${COLORS.navy}" font-family="Inter, Arial, sans-serif" font-size="16">Dear [Name],</text>
  <text x="64" y="330" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="15">Letter body…</text>
  <line x1="64" y1="980" x2="786" y2="980" stroke="${COLORS.lightGray}" stroke-width="2"/>
  <text x="64" y="1020" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="12">hello@nialltech.com · nialltech.com</text>
`,
  ),
);

await write(
  "templates/niall-tech-proposal-cover.svg",
  svg(
    "0 0 1200 1600",
    1200,
    1600,
    "Niall Tech proposal cover",
    `
  <rect width="1200" height="1600" fill="${COLORS.navy}"/>
  <line x1="0" y1="220" x2="1200" y2="120" stroke="${COLORS.blue}" stroke-width="3" opacity="0.35"/>
  <g transform="translate(120,180) scale(2.4)">${iconWhite}</g>
  <text x="120" y="520" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="700">Proposal</text>
  <text x="120" y="600" fill="#94A3B8" font-family="Inter, Arial, sans-serif" font-size="28">[Client name]</text>
  <text x="120" y="680" fill="#CBD5E1" font-family="Inter, Arial, sans-serif" font-size="22">Microsoft 365 · Azure · Security · Infrastructure</text>
  <text x="120" y="1400" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="3">NIALL</text>
  <text x="270" y="1400" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500" letter-spacing="8">TECH</text>
  <text x="120" y="1450" fill="#64748B" font-family="Inter, Arial, sans-serif" font-size="16">Confidential</text>
`,
  ),
);

await write(
  "templates/niall-tech-powerpoint-title.svg",
  svg(
    "0 0 1920 1080",
    1920,
    1080,
    "Niall Tech PowerPoint title slide",
    `
  <rect width="1920" height="1080" fill="${COLORS.navy}"/>
  <line x1="0" y1="180" x2="1920" y2="80" stroke="${COLORS.cyan}" stroke-width="2" opacity="0.25"/>
  <g transform="translate(160,200) scale(2.8)">${iconWhite}</g>
  <text x="160" y="620" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="700">[Presentation title]</text>
  <text x="160" y="700" fill="#94A3B8" font-family="Inter, Arial, sans-serif" font-size="28">Niall Tech · Microsoft IT Consulting</text>
  <text x="160" y="960" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="3">NIALL</text>
  <text x="300" y="960" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" letter-spacing="8">TECH</text>
`,
  ),
);

await write(
  "templates/niall-tech-word-header.svg",
  svg(
    "0 0 1200 220",
    1200,
    220,
    "Niall Tech Word header",
    `
  <rect width="1200" height="220" fill="#FFFFFF"/>
  <g transform="translate(40,40) scale(1.2)">${icon}</g>
  <text x="200" y="100" fill="${COLORS.navy}" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="700" letter-spacing="3">NIALL</text>
  <text x="360" y="100" fill="${COLORS.blue}" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="500" letter-spacing="8">TECH</text>
  <text x="200" y="140" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="14" letter-spacing="3">MODERN IT. LOCAL EXPERTISE.</text>
  <line x1="40" y1="190" x2="1160" y2="190" stroke="${COLORS.lightGray}" stroke-width="3"/>
`,
  ),
);

await write(
  "templates/niall-tech-apparel-placement.svg",
  svg(
    "0 0 800 800",
    800,
    800,
    "Niall Tech apparel embroidery placement",
    `
  <rect width="800" height="800" fill="#F8FAFC"/>
  <rect x="200" y="120" width="400" height="520" rx="24" fill="#0B1320"/>
  <text x="400" y="100" text-anchor="middle" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="18">Left chest placement guide</text>
  <g transform="translate(330,200) scale(1.4)">${iconWhite}</g>
  <text x="400" y="420" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700">NIALL TECH</text>
  <text x="400" y="700" text-anchor="middle" fill="${COLORS.slate}" font-family="Inter, Arial, sans-serif" font-size="14">Use embroidery mark · keep clear space · one-color navy or white</text>
`,
  ),
);

console.log("Brand collateral generated.");
