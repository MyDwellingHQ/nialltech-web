import type { ReactNode, Ref } from "react";

/**
 * Non-production logo exploration geometry.
 *
 * Single source of truth for the five Niall Tech logo candidates. Every mark is
 * real, flat SVG vector artwork (paths/shapes only) — no raster, base64,
 * gradients, or filters. Colors are parameterized so each candidate renders in
 * color, reversed, and one-color (mono) modes and composes into icon,
 * horizontal, and stacked lockups.
 *
 * IMPORTANT: This file drives ONLY the /brand/logo-lab review experience.
 * It never touches the approved production BrandLogo / BrandMark.
 */

export const LAB_COLORS = {
  navy: "#0B1320",
  blue: "#146BFF",
  white: "#FFFFFF",
  black: "#111111",
} as const;

export type MarkMode = "color" | "reversed" | "mono" | "mono-reversed";
export type LockupLayout = "icon" | "horizontal" | "stacked" | "wordmark";
export type CandidateId = "a" | "b" | "c" | "d" | "e";

type Palette = { body: string; accent: string; tile: string };

export function paletteFor(mode: MarkMode): Palette {
  switch (mode) {
    case "reversed":
      return { body: LAB_COLORS.white, accent: LAB_COLORS.blue, tile: LAB_COLORS.white };
    case "mono":
      return { body: LAB_COLORS.navy, accent: LAB_COLORS.navy, tile: LAB_COLORS.navy };
    case "mono-reversed":
      return { body: LAB_COLORS.white, accent: LAB_COLORS.white, tile: LAB_COLORS.white };
    case "color":
    default:
      return { body: LAB_COLORS.navy, accent: LAB_COLORS.blue, tile: LAB_COLORS.navy };
  }
}

/* -------------------------------------------------------------------------- */
/*  Icon geometry — each returns inner SVG elements for a 0 0 100 100 canvas   */
/* -------------------------------------------------------------------------- */

function IconA(p: Palette): ReactNode {
  // Reference refined: solid N, blue cap on the upper-right stem.
  return (
    <>
      <rect x="18" y="14" width="15" height="72" rx="4" fill={p.body} />
      <polygon points="33,14 48,14 67,86 52,86" fill={p.body} />
      <rect x="67" y="14" width="15" height="72" rx="4" fill={p.body} />
      <path d="M67 18a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4v26H67Z" fill={p.accent} />
    </>
  );
}

function IconB(p: Palette): ReactNode {
  // Integrated blue pillar: the entire right stem is electric blue and fuses
  // with the navy diagonal at the base so it reads as one structure.
  return (
    <>
      <rect x="18" y="14" width="15" height="72" rx="4" fill={p.body} />
      <polygon points="33,14 48,14 67,86 52,86" fill={p.body} />
      {/* wedge tying the diagonal into the pillar so it is not a floating bar */}
      <polygon points="55,70 74,70 74,86 60,86" fill={p.accent} />
      <rect x="67" y="14" width="15" height="72" rx="4" fill={p.accent} />
    </>
  );
}

function IconC(p: Palette, mode: MarkMode): ReactNode {
  // Negative-space construction: navy tile with the N carved out; right
  // stroke rendered in the accent. Carving uses a mask so it is truly
  // transparent on any background.
  const maskId = `nt-lab-c-${mode}`;
  const rightStroke = mode === "mono" || mode === "mono-reversed" ? p.body : p.accent;
  return (
    <>
      <mask id={maskId}>
        <rect x="0" y="0" width="100" height="100" fill="#fff" />
        {/* carved left stem + diagonal */}
        <rect x="26" y="24" width="12" height="52" rx="2" fill="#000" />
        <polygon points="38,24 50,24 62,76 50,76" fill="#000" />
      </mask>
      <rect x="6" y="6" width="88" height="88" rx="20" fill={p.tile} mask={`url(#${maskId})`} />
      <rect x="62" y="24" width="12" height="52" rx="2" fill={rightStroke} />
    </>
  );
}

function IconD(p: Palette): ReactNode {
  // Architectural monogram: sharp, chamfered, grid-engineered. Blue is a
  // structural diagonal beam.
  return (
    <>
      {/* left stem, chamfered top-left */}
      <polygon points="22,12 32,12 32,88 16,88 16,22" fill={p.body} />
      {/* right stem, chamfered bottom-right */}
      <polygon points="68,12 84,12 84,78 74,88 68,88" fill={p.body} />
      {/* diagonal beam in accent */}
      <polygon points="32,12 48,12 68,88 52,88" fill={p.accent} />
      {/* engineered joint nodes */}
      <rect x="30" y="12" width="8" height="8" fill={p.body} />
      <rect x="62" y="80" width="8" height="8" fill={p.body} />
    </>
  );
}

function IconE(p: Palette): ReactNode {
  // Minimal enterprise mark: single monoline N, one blue terminal.
  return (
    <>
      <path
        d="M22 84 V20 L78 84 V20"
        fill="none"
        stroke={p.body}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* blue terminal on the top-right upstroke */}
      <path
        d="M78 52 V20"
        fill="none"
        stroke={p.accent}
        strokeWidth="13"
        strokeLinecap="round"
      />
    </>
  );
}

export function renderIcon(id: CandidateId, mode: MarkMode): ReactNode {
  const p = paletteFor(mode);
  switch (id) {
    case "a":
      return IconA(p);
    case "b":
      return IconB(p);
    case "c":
      return IconC(p, mode);
    case "d":
      return IconD(p);
    case "e":
      return IconE(p);
  }
}

/* -------------------------------------------------------------------------- */
/*  Wordmark                                                                   */
/* -------------------------------------------------------------------------- */

const WORDMARK_FONT =
  "'Inter', 'Inter Fallback', 'Segoe UI', system-ui, -apple-system, sans-serif";

function Wordmark({
  mode,
  x,
  y,
  fontSize,
  anchor = "start",
}: {
  mode: MarkMode;
  x: number;
  y: number;
  fontSize: number;
  anchor?: "start" | "middle";
}): ReactNode {
  const p = paletteFor(mode);
  const niall = p.body;
  const tech = mode === "mono" || mode === "mono-reversed" ? p.body : p.accent;
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={WORDMARK_FONT}
      fontSize={fontSize}
      dominantBaseline="middle"
    >
      <tspan fill={niall} fontWeight={700} letterSpacing={fontSize * 0.02}>
        NIALL
      </tspan>
      <tspan
        fill={tech}
        fontWeight={500}
        letterSpacing={fontSize * 0.06}
        dx={fontSize * 0.34}
      >
        TECH
      </tspan>
    </text>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lockups                                                                    */
/* -------------------------------------------------------------------------- */

type ArtProps = {
  candidate: CandidateId;
  mode?: MarkMode;
  layout?: LockupLayout;
  className?: string;
  title?: string;
  role?: string;
  ref?: Ref<SVGSVGElement>;
};

function viewBoxFor(layout: LockupLayout): string {
  switch (layout) {
    case "icon":
      return "0 0 100 100";
    case "horizontal":
      return "0 0 320 96";
    case "stacked":
      return "0 0 200 180";
    case "wordmark":
      return "0 0 240 64";
  }
}

/**
 * Renders a candidate mark as a complete, self-contained SVG. Used for both the
 * on-screen previews and (serialized) the downloadable master files.
 */
export function LogoArt({
  candidate,
  mode = "color",
  layout = "icon",
  className,
  title,
  role = "img",
  ref,
}: ArtProps): ReactNode {
  const icon = renderIcon(candidate, mode);

  let body: ReactNode;
  if (layout === "icon") {
    body = icon;
  } else if (layout === "wordmark") {
    body = <Wordmark mode={mode} x={12} y={34} fontSize={34} />;
  } else if (layout === "horizontal") {
    body = (
      <>
        <g transform="translate(8 8) scale(0.8)">{icon}</g>
        <Wordmark mode={mode} x={104} y={50} fontSize={34} />
      </>
    );
  } else {
    // stacked
    body = (
      <>
        <g transform="translate(64 6) scale(0.72)">{icon}</g>
        <Wordmark mode={mode} x={100} y={150} fontSize={30} anchor="middle" />
      </>
    );
  }

  return (
    <svg
      ref={ref}
      viewBox={viewBoxFor(layout)}
      className={className}
      role={role}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Candidate metadata + design-system scorecards                             */
/* -------------------------------------------------------------------------- */

export type ScoreKey =
  | "distinctiveness"
  | "enterprise"
  | "smallSize"
  | "opticalBalance"
  | "print"
  | "embroidery"
  | "signage"
  | "digital";

export const scoreLabels: Record<ScoreKey, string> = {
  distinctiveness: "Distinctiveness",
  enterprise: "Enterprise credibility",
  smallSize: "Small-size clarity",
  opticalBalance: "Optical balance",
  print: "Print suitability",
  embroidery: "Embroidery suitability",
  signage: "Vehicle / signage suitability",
  digital: "Digital-interface suitability",
};

export type Candidate = {
  id: CandidateId;
  code: string;
  name: string;
  summary: string;
  construction: string;
  scores: Record<ScoreKey, number>;
};

export const candidates: Candidate[] = [
  {
    id: "a",
    code: "A",
    name: "Reference refined",
    summary:
      "The closest faithful rebuild of the reference — re-derived stroke ratio, a clean blue cap on the right stem, tuned corners, and corrected optical balance.",
    construction:
      "Solid navy N (left stem + diagonal + right stem) with an electric-blue cap on the upper-right stem.",
    scores: {
      distinctiveness: 3,
      enterprise: 5,
      smallSize: 4,
      opticalBalance: 4,
      print: 5,
      embroidery: 4,
      signage: 5,
      digital: 4,
    },
  },
  {
    id: "b",
    code: "B",
    name: "Integrated blue pillar",
    summary:
      "Turns the electric-blue element into the full right stem, fused with the diagonal so it reads as a structural part of the N rather than a separate rectangle.",
    construction:
      "Navy left stem + navy diagonal flowing into a full-height electric-blue right pillar with a joining wedge.",
    scores: {
      distinctiveness: 4,
      enterprise: 5,
      smallSize: 4,
      opticalBalance: 4,
      print: 5,
      embroidery: 4,
      signage: 5,
      digital: 5,
    },
  },
  {
    id: "c",
    code: "C",
    name: "Negative-space construction",
    summary:
      "Encloses the N in a navy tile and carves the letterform from negative space, with the right stroke in blue — a strong containerized app-icon silhouette.",
    construction:
      "Navy rounded tile; left stem + diagonal carved as transparent negative space; blue right stroke.",
    scores: {
      distinctiveness: 5,
      enterprise: 4,
      smallSize: 5,
      opticalBalance: 4,
      print: 4,
      embroidery: 3,
      signage: 4,
      digital: 5,
    },
  },
  {
    id: "d",
    code: "D",
    name: "Architectural monogram",
    summary:
      "Grid-based, chamfered, sharp-cornered construction with the blue as a diagonal beam — the most infrastructure and engineering-forward direction.",
    construction:
      "Sharp navy stems with 45° chamfers and joint nodes; electric-blue diagonal structural beam.",
    scores: {
      distinctiveness: 4,
      enterprise: 5,
      smallSize: 3,
      opticalBalance: 3,
      print: 5,
      embroidery: 3,
      signage: 5,
      digital: 4,
    },
  },
  {
    id: "e",
    code: "E",
    name: "Minimal enterprise mark",
    summary:
      "A single monoline N with one blue terminal — the fewest possible elements while staying legible as both an N and a proprietary technology mark.",
    construction:
      "Single-weight monoline N with round caps; the top-right upstroke terminates in electric blue.",
    scores: {
      distinctiveness: 4,
      enterprise: 4,
      smallSize: 4,
      opticalBalance: 5,
      print: 4,
      embroidery: 5,
      signage: 4,
      digital: 5,
    },
  },
];

export function getCandidate(id: CandidateId): Candidate {
  return candidates.find((c) => c.id === id) ?? candidates[0];
}

/* -------------------------------------------------------------------------- */
/*  Downloadable SVG file matrix                                               */
/* -------------------------------------------------------------------------- */

export type DownloadSpec = {
  key: string;
  label: string;
  layout: LockupLayout;
  mode: MarkMode;
  filename: (id: CandidateId) => string;
};

export const downloadMatrix: DownloadSpec[] = [
  {
    key: "icon-color",
    label: "Icon — color",
    layout: "icon",
    mode: "color",
    filename: (id) => `niall-tech-${id}-icon.svg`,
  },
  {
    key: "icon-reversed",
    label: "Icon — reversed",
    layout: "icon",
    mode: "reversed",
    filename: (id) => `niall-tech-${id}-icon-reversed.svg`,
  },
  {
    key: "icon-mono",
    label: "Icon — one-color",
    layout: "icon",
    mode: "mono",
    filename: (id) => `niall-tech-${id}-icon-mono.svg`,
  },
  {
    key: "horizontal-color",
    label: "Horizontal lockup",
    layout: "horizontal",
    mode: "color",
    filename: (id) => `niall-tech-${id}-horizontal.svg`,
  },
  {
    key: "stacked-color",
    label: "Stacked lockup",
    layout: "stacked",
    mode: "color",
    filename: (id) => `niall-tech-${id}-stacked.svg`,
  },
  {
    key: "horizontal-reversed",
    label: "Horizontal — reversed",
    layout: "horizontal",
    mode: "reversed",
    filename: (id) => `niall-tech-${id}-horizontal-reversed.svg`,
  },
  {
    key: "horizontal-mono",
    label: "Horizontal — one-color",
    layout: "horizontal",
    mode: "mono",
    filename: (id) => `niall-tech-${id}-horizontal-mono.svg`,
  },
];
