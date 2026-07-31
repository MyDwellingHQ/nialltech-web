import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand/BrandLogo";
import { COMPANY } from "@/data/brand-contact";

/* -------------------------------------------------------------------------- */
/*  Shared frame                                                              */
/* -------------------------------------------------------------------------- */

type MockupCardProps = {
  title: string;
  caption: string;
  children: ReactNode;
  /** Tailwind background utility for the "studio" surface behind the product. */
  surface?: string;
};

function MockupCard({ title, caption, children, surface = "bg-[#EEF2F7]" }: MockupCardProps) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-border bg-card">
      <div className={`relative flex h-56 items-center justify-center overflow-hidden ${surface}`}>
        {children}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 border-t border-border px-4 py-3">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground text-right">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Wordmark helper (inline, canonical mark + Inter wordmark)                 */
/* -------------------------------------------------------------------------- */

function InlineLockup({
  markTheme = "color",
  textClass = "text-[#0B1320]",
  accentClass = "text-[#146BFF]",
  size = "text-base",
  markClass = "h-6 w-6",
}: {
  markTheme?: "color" | "white";
  textClass?: string;
  accentClass?: string;
  size?: string;
  markClass?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <BrandMark theme={markTheme} className={markClass} />
      <span className={`font-semibold tracking-[0.12em] ${size} ${textClass}`}>
        NIALL<span className={accentClass}>TECH</span>
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Apparel — polos                                                           */
/* -------------------------------------------------------------------------- */

function Polo({ fabric, markTheme, thread }: { fabric: string; markTheme: "color" | "white"; thread: string }) {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-auto drop-shadow-md" role="img" aria-label="Polo shirt mockup">
      {/* body */}
      <path
        d="M60 44 L92 30 Q120 46 148 30 L180 44 L204 74 L182 92 L176 176 Q120 188 64 176 L58 92 L36 74 Z"
        fill={fabric}
        stroke="rgba(0,0,0,0.08)"
      />
      {/* sleeves shading */}
      <path d="M60 44 L36 74 L58 92 L66 66 Z" fill="rgba(0,0,0,0.06)" />
      <path d="M180 44 L204 74 L182 92 L174 66 Z" fill="rgba(0,0,0,0.06)" />
      {/* collar */}
      <path d="M92 30 Q120 46 148 30 L138 40 Q120 52 102 40 Z" fill={thread} opacity="0.9" />
      <path d="M112 34 L120 52 L128 34 Z" fill={fabric} stroke="rgba(0,0,0,0.12)" />
      {/* placket */}
      <line x1="120" y1="52" x2="120" y2="78" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      {/* left-chest embroidered mark */}
      <g transform="translate(146 78) scale(0.26)">
        <BrandMark theme={markTheme} className="h-full w-full" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Drinkware                                                                 */
/* -------------------------------------------------------------------------- */

function Mug() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-auto drop-shadow-md" role="img" aria-label="Coffee mug mockup">
      <rect x="52" y="40" width="112" height="104" rx="12" fill="#FFFFFF" stroke="rgba(0,0,0,0.1)" />
      <rect x="52" y="40" width="112" height="104" rx="12" fill="url(#mugShade)" />
      <path d="M164 62 h20 a22 22 0 0 1 0 44 h-20" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="10" />
      <g transform="translate(76 74) scale(0.6)">
        <BrandMark theme="color" className="h-full w-full" />
      </g>
      <defs>
        <linearGradient id="mugShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.06" />
          <stop offset="0.15" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Bottle() {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-auto drop-shadow-md" role="img" aria-label="Water bottle mockup">
      <rect x="46" y="8" width="28" height="20" rx="4" fill="#0B1320" />
      <rect x="40" y="26" width="40" height="14" rx="4" fill="#1B2637" />
      <rect x="34" y="40" width="52" height="168" rx="26" fill="#0B1320" />
      <rect x="34" y="40" width="52" height="168" rx="26" fill="url(#bottleShine)" />
      <g transform="translate(44 96) scale(0.32)">
        <BrandMark theme="white" className="h-full w-full" />
      </g>
      <defs>
        <linearGradient id="bottleShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sticker                                                                   */
/* -------------------------------------------------------------------------- */

function Sticker() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        <div className="rounded-xl border-2 border-dashed border-black/10 p-3">
          <BrandMark theme="color" className="h-16 w-16" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Vehicle door graphics                                                     */
/* -------------------------------------------------------------------------- */

function VehicleDoor() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-auto drop-shadow-md" role="img" aria-label="Vehicle door graphics mockup">
      {/* door panel */}
      <rect x="20" y="24" width="260" height="152" rx="16" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" />
      <rect x="20" y="24" width="260" height="152" rx="16" fill="url(#doorShade)" />
      {/* handle */}
      <rect x="150" y="58" width="70" height="12" rx="6" fill="rgba(0,0,0,0.14)" />
      {/* graphics */}
      <g transform="translate(40 92)">
        <g transform="scale(0.5)">
          <BrandMark theme="color" className="h-full w-full" />
        </g>
      </g>
      <text x="88" y="112" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="700" fill="#0B1320" letterSpacing="1">
        NIALL<tspan fill="#146BFF">TECH</tspan>
      </text>
      <text x="88" y="134" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="#475569" letterSpacing="0.5">
        {COMPANY.tagline}
      </text>
      <text x="88" y="152" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#146BFF">
        {COMPANY.website}
      </text>
      <defs>
        <linearGradient id="doorShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Building signage                                                          */
/* -------------------------------------------------------------------------- */

function BuildingSignage() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-[#1a2740] to-[#0B1320]">
      {/* facade */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:26px_26px]" />
      {/* illuminated sign box */}
      <div className="relative z-10 flex items-center gap-3 rounded-lg bg-white/95 px-6 py-4 shadow-[0_0_40px_rgba(34,193,255,0.35)] ring-1 ring-white/40">
        <InlineLockup size="text-xl" markClass="h-8 w-8" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tradeshow backdrop                                                        */
/* -------------------------------------------------------------------------- */

function TradeshowBackdrop() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0B1320] px-6 text-center">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(20,107,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,107,255,0.2)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute -right-10 top-0 h-full w-1/2 -skew-x-12 bg-[#146BFF]/10" />
      <BrandMark theme="white" className="relative z-10 mb-3 h-12 w-12" />
      <p className="relative z-10 text-lg font-bold leading-tight text-white text-balance">
        Secure IT. Modern Cloud.
        <br />
        <span className="text-[#22C1FF]">Local Expertise.</span>
      </p>
      <p className="relative z-10 mt-2 text-xs font-medium tracking-wide text-[#B8C4D9]">
        {COMPANY.website}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Yard sign                                                                 */
/* -------------------------------------------------------------------------- */

function YardSign() {
  return (
    <div className="relative flex h-full items-end justify-center pb-2">
      <div className="flex flex-col items-center gap-2 rounded-md bg-white px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
        <InlineLockup size="text-lg" markClass="h-7 w-7" />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#146BFF]">
          Managed IT &amp; Security
        </p>
        <p className="text-[11px] font-medium text-[#475569]">{COMPANY.website}</p>
      </div>
      {/* stakes */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-16">
        <span className="h-6 w-1 bg-[#94a3b8]" />
        <span className="h-6 w-1 bg-[#94a3b8]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mouse pad                                                                 */
/* -------------------------------------------------------------------------- */

function MousePad() {
  return (
    <div className="flex h-32 w-56 items-center justify-center rounded-xl bg-[#0B1320] shadow-[0_10px_24px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
      <div className="[perspective:600px]">
        <div className="[transform:rotateX(18deg)]">
          <InlineLockup
            markTheme="white"
            textClass="text-white"
            accentClass="text-[#22C1FF]"
            size="text-base"
            markClass="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Notebook                                                                  */
/* -------------------------------------------------------------------------- */

function Notebook() {
  return (
    <div className="relative h-44 w-36 rounded-r-md rounded-l-sm bg-[#0B1320] shadow-[0_14px_30px_rgba(0,0,0,0.3)]">
      {/* spine */}
      <div className="absolute left-0 top-0 h-full w-3 rounded-l-sm bg-[#146BFF]" />
      {/* elastic band */}
      <div className="absolute right-6 top-0 h-full w-1.5 bg-black/40" />
      <div className="flex h-full flex-col items-center justify-center gap-2 pl-3">
        <BrandMark theme="white" className="h-9 w-9" />
        <span className="text-xs font-semibold tracking-[0.14em] text-white">
          NIALL<span className="text-[#22C1FF]">TECH</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Grid                                                                      */
/* -------------------------------------------------------------------------- */

export function MerchandiseMockups() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <MockupCard title="Black polo" caption="Left-chest embroidery · white thread">
        <Polo fabric="#111827" markTheme="white" thread="#1f2937" />
      </MockupCard>

      <MockupCard title="White polo" caption="Left-chest embroidery · full color">
        <Polo fabric="#F5F7FA" markTheme="color" thread="#E2E8F0" />
      </MockupCard>

      <MockupCard title="Coffee mug" caption="Ceramic · full-color wrap">
        <Mug />
      </MockupCard>

      <MockupCard title="Water bottle" caption="Navy stainless · white mark">
        <Bottle />
      </MockupCard>

      <MockupCard title="Laptop sticker" caption="Die-cut · gloss vinyl">
        <Sticker />
      </MockupCard>

      <MockupCard title="Vehicle door graphics" caption="Cut vinyl · full lockup">
        <VehicleDoor />
      </MockupCard>

      <MockupCard title="Building signage" caption="Illuminated fascia sign" surface="bg-[#0B1320]">
        <BuildingSignage />
      </MockupCard>

      <MockupCard title="Tradeshow backdrop" caption="Tension fabric · 8ft" surface="bg-[#0B1320]">
        <TradeshowBackdrop />
      </MockupCard>

      <MockupCard title="Yard sign" caption="Coroplast · double-sided">
        <YardSign />
      </MockupCard>

      <MockupCard title="Mouse pad" caption="Navy cloth · anti-slip base">
        <MousePad />
      </MockupCard>

      <MockupCard title="Notebook" caption="Hardcover · foil + spine">
        <Notebook />
      </MockupCard>
    </div>
  );
}
