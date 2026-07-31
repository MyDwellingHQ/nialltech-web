import type { CSSProperties } from "react";
import { MarkGlyph } from "./ReconstructedBrandMark";
import {
  COLORS,
  CSS_VARS,
  getThemeColors,
  NIALL_MARK_VIEWBOX,
  type MarkTheme,
} from "@/brand/niall-mark-geometry";

const WORDMARK_FONT =
  "var(--font-inter-recon), var(--font-sans), Inter, system-ui, -apple-system, sans-serif";

function wordmarkColors(theme: MarkTheme) {
  const { primary } = getThemeColors(theme);
  return {
    niall: primary,
    tech: theme === "monochrome" ? "currentColor" : COLORS.electricBlue,
    divider: theme === "dark" ? "rgba(255,255,255,0.45)" : COLORS.slate,
  };
}

/** CSS-variable style so the embedded mark paths pick up the theme fills. */
function markThemeStyle(theme: MarkTheme): CSSProperties {
  const colors = getThemeColors(theme);
  return {
    [CSS_VARS.primary]: colors.primary,
    [CSS_VARS.blue]: colors.blue,
  } as CSSProperties;
}

/**
 * Horizontal lockup — canonical 520 x 140 canvas.
 * The canonical mark is embedded via a nested <svg> (no transforms) so the
 * icon geometry is never altered inside the lockup.
 *   Icon:    x=12  y=10  120x120
 *   Divider: x=162 y=24..116  width 1.5
 *   NIALL baseline y=66, TECH baseline y=106, wordmark starts x=198
 */
export function ReconstructedHorizontalLockup({
  theme = "light",
  className,
  title = "Niall Tech — modern IT, local expertise",
}: {
  theme?: MarkTheme;
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
      <svg
        x={12}
        y={10}
        width={120}
        height={120}
        viewBox={NIALL_MARK_VIEWBOX}
        style={markThemeStyle(theme)}
        preserveAspectRatio="xMidYMid meet"
      >
        <MarkGlyph />
      </svg>
      <rect x="161.25" y="24" width="1.5" height="92" fill={c.divider} />
      <text
        x="198"
        y="66"
        fontFamily={WORDMARK_FONT}
        fontSize="46"
        fontWeight="600"
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
        fontWeight="600"
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
  className,
  title = "Niall Tech",
}: {
  theme?: MarkTheme;
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
      <svg
        x={70}
        y={20}
        width={120}
        height={120}
        viewBox={NIALL_MARK_VIEWBOX}
        style={markThemeStyle(theme)}
        preserveAspectRatio="xMidYMid meet"
      >
        <MarkGlyph />
      </svg>
      <text
        x="130"
        y="216"
        textAnchor="middle"
        fontFamily={WORDMARK_FONT}
        fontSize="42"
        fontWeight="600"
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
        fontWeight="600"
        letterSpacing="6.1"
        fill={c.tech}
      >
        TECH
      </text>
    </svg>
  );
}
