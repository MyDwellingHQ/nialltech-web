import { MarkGlyph } from "./ReconstructedBrandMark";
import { ELECTRIC_BLUE, SLATE, type GapOption } from "./logo-geometry";

type LockupTheme = "light" | "dark";

const WORDMARK_FONT =
  "var(--font-inter-recon), Inter, system-ui, -apple-system, sans-serif";

function wordmarkColors(theme: LockupTheme) {
  return {
    niall: theme === "dark" ? "#FFFFFF" : "#0B1320",
    tech: ELECTRIC_BLUE,
    divider: theme === "dark" ? "rgba(255,255,255,0.45)" : SLATE,
  };
}

/**
 * Horizontal lockup — canonical 520 x 140 canvas.
 *   Icon:    x=12  y=10  120x120
 *   Divider: x=162 y=24..116  stroke 1.5
 *   NIALL baseline y=66, TECH baseline y=106, wordmark starts x=198
 */
export function ReconstructedHorizontalLockup({
  theme = "light",
  gap = "medium",
  className,
  title = "Niall Tech — modern IT, local expertise",
}: {
  theme?: LockupTheme;
  gap?: GapOption;
  className?: string;
  title?: string;
}) {
  const c = wordmarkColors(theme);
  return (
    <svg
      viewBox="0 0 520 140"
      className={className}
      role="img"
      aria-label={title}
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g transform="translate(12 10)">
        <MarkGlyph theme={theme} gap={gap} idSuffix="-hz" />
      </g>
      <line x1="162" y1="24" x2="162" y2="116" stroke={c.divider} strokeWidth="1.5" />
      <text
        x="198"
        y="66"
        fontFamily={WORDMARK_FONT}
        fontSize="46"
        fontWeight="650"
        letterSpacing="11"
        fill={c.niall}
      >
        NIALL
      </text>
      <text
        x="199"
        y="106"
        fontFamily={WORDMARK_FONT}
        fontSize="21"
        fontWeight="500"
        letterSpacing="6.7"
        fill={c.tech}
      >
        TECH
      </text>
    </svg>
  );
}

/**
 * Stacked lockup — canonical 260 x 330 canvas.
 *   Icon:  x=70 y=20 120x120
 *   NIALL centered cx=130 baseline y=216
 *   TECH  centered cx=130 baseline y=258
 */
export function ReconstructedStackedLockup({
  theme = "light",
  gap = "medium",
  className,
  title = "Niall Tech",
}: {
  theme?: LockupTheme;
  gap?: GapOption;
  className?: string;
  title?: string;
}) {
  const c = wordmarkColors(theme);
  return (
    <svg
      viewBox="0 0 260 330"
      className={className}
      role="img"
      aria-label={title}
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g transform="translate(70 20)">
        <MarkGlyph theme={theme} gap={gap} idSuffix="-st" />
      </g>
      <text
        x="130"
        y="216"
        textAnchor="middle"
        fontFamily={WORDMARK_FONT}
        fontSize="42"
        fontWeight="650"
        letterSpacing="10"
        fill={c.niall}
      >
        NIALL
      </text>
      <text
        x="130"
        y="258"
        textAnchor="middle"
        fontFamily={WORDMARK_FONT}
        fontSize="19"
        fontWeight="500"
        letterSpacing="6.1"
        fill={c.tech}
      >
        TECH
      </text>
    </svg>
  );
}
