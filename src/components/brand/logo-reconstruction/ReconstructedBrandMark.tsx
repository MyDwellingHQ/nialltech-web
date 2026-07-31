import type { CSSProperties } from "react";
import {
  CANVAS_SIZE,
  getGapGeometry,
  getSmallSizeGeometry,
  getThemeColors,
  logoGeometry,
  pointsToSvg,
  type GapOption,
  type LogoTheme,
  type Polygon,
} from "./logo-geometry";

export type ReconstructedBrandMarkProps = {
  /** Rendered size in px (number) or any CSS length (string). */
  size?: number | string;
  theme?: LogoTheme;
  gap?: GapOption;
  title?: string;
  /** When true, the mark is treated as decorative (aria-hidden, no title). */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Inner glyph (defs + polygons) for the reconstructed mark, without an <svg>
 * wrapper — suitable for embedding inside a parent SVG (lockups). Renders on
 * the canonical 0 0 120 120 coordinate space.
 */
export function MarkGlyph({
  theme = "light",
  gap = "medium",
  small = false,
  idSuffix = "",
}: {
  theme?: LogoTheme;
  gap?: GapOption;
  small?: boolean;
  idSuffix?: string;
}) {
  const { primary, accent } = getThemeColors(theme);

  const sm = small ? getSmallSizeGeometry(gap) : null;
  const leftStem: Polygon = sm ? sm.leftStem : logoGeometry.leftStem;
  const rightStem: Polygon = sm ? sm.rightStem : logoGeometry.rightStem;
  const diagonal: Polygon = sm ? sm.diagonal : logoGeometry.diagonal;
  const gapPolygon: Polygon = sm ? sm.gap : getGapGeometry(gap);

  const maskId = `nt-recon-gap-${gap}${small ? "-sm" : ""}${idSuffix}`;

  return (
    <>
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
        >
          <rect x="0" y="0" width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#fff" />
          {/* Black cutout carves the intentional upper-left gap out of the navy strokes. */}
          <polygon points={pointsToSvg(gapPolygon)} fill="#000" />
        </mask>
      </defs>

      {/* Layer 1: electric-blue right stem / pillar (never masked). */}
      <polygon points={pointsToSvg(rightStem)} fill={accent} />

      {/* Layers 2 + 3: navy left stem and diagonal, with the gap carved out. */}
      <g mask={`url(#${maskId})`}>
        <polygon points={pointsToSvg(leftStem)} fill={primary} />
        <polygon points={pointsToSvg(diagonal)} fill={primary} />
      </g>
    </>
  );
}

/**
 * Master reconstructed Niall Tech mark.
 *
 * Pure inline SVG generated from the shared canonical geometry — no <img>,
 * no CSS-faked shapes, no external files. Geometry is identical across themes;
 * only fills change. Sizes below 32px use the documented optical corrections.
 */
export function ReconstructedBrandMark({
  size = 120,
  theme = "light",
  gap = "medium",
  title = "Niall Tech",
  decorative = false,
  className,
  style,
}: ReconstructedBrandMarkProps) {
  const numericSize = typeof size === "number" ? size : null;
  const isSmall = numericSize !== null && numericSize < 32;
  const dimension = typeof size === "number" ? `${size}px` : size;

  const a11y = decorative
    ? { "aria-hidden": true as const, role: "presentation" as const }
    : { role: "img" as const, "aria-label": title };

  return (
    <svg
      viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
      width={dimension}
      height={dimension}
      className={className}
      style={style}
      shapeRendering="geometricPrecision"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
    >
      {!decorative ? <title>{title}</title> : null}
      <MarkGlyph theme={theme} gap={gap} small={isSmall} />
    </svg>
  );
}
