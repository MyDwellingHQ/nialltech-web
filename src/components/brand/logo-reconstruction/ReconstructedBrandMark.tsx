import type { CSSProperties } from "react";
import {
  CSS_VARS,
  getThemeColors,
  MARK_SHAPES,
  NIALL_MARK_VIEWBOX,
  type MarkTheme,
} from "@/brand/niall-mark-geometry";

export type ReconstructedBrandMarkProps = {
  /** Rendered size in px (number) or any CSS length (string). */
  size?: number | string;
  theme?: MarkTheme;
  title?: string;
  /** When true, the mark is treated as decorative (aria-hidden, no title). */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Inner glyph: the three flat canonical paths painted in order
 * (main -> lowerLeft -> bluePillar). No mask, stroke, transform, or skew — the
 * negative-space channels are the structural gaps between the shapes.
 * Fills bind to CSS variables so this can be embedded inside a themed parent
 * SVG (e.g. lockups).
 */
export function MarkGlyph() {
  return (
    <>
      {MARK_SHAPES.map((shape) => (
        <path
          key={shape.id}
          d={shape.d}
          fill={shape.fillVar === "blue" ? `var(${CSS_VARS.blue})` : `var(${CSS_VARS.primary})`}
        />
      ))}
    </>
  );
}

/**
 * Master reconstructed Niall Tech mark.
 *
 * Pure inline SVG generated from the shared canonical geometry — no <img>,
 * no CSS-faked shapes, no external files. Geometry is identical across themes;
 * only the two fill colors change (bound through CSS variables).
 */
export function ReconstructedBrandMark({
  size = 120,
  theme = "light",
  title = "Niall Tech",
  decorative = false,
  className,
  style,
}: ReconstructedBrandMarkProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  const colors = getThemeColors(theme);

  const themedStyle = {
    ...style,
    [CSS_VARS.primary]: colors.primary,
    [CSS_VARS.blue]: colors.blue,
  } as CSSProperties;

  const a11y = decorative
    ? { "aria-hidden": true as const, role: "presentation" as const }
    : { role: "img" as const, "aria-label": title };

  return (
    <svg
      viewBox={NIALL_MARK_VIEWBOX}
      width={dimension}
      height={dimension}
      className={className}
      style={themedStyle}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
    >
      {!decorative ? <title>{title}</title> : null}
      <MarkGlyph />
    </svg>
  );
}

export default ReconstructedBrandMark;
