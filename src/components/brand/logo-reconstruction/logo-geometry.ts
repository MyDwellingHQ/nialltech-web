/**
 * Typed access to the canonical logo geometry.
 *
 * The coordinate data and pure helpers live ONCE in `logo-geometry.mjs`
 * (framework-free so the Node build/test scripts share the exact same source).
 * This module layers TypeScript types on top and re-exports everything for the
 * React components. No coordinates are declared here.
 */

import * as raw from "./logo-geometry.mjs";

export type Point = readonly [number, number];
export type Polygon = readonly Point[];

export type GapOption = "hairline" | "medium" | "chamfered";
export type LogoTheme = "light" | "dark" | "monochrome";

export type LogoGeometry = {
  readonly canvas: number;
  readonly topY: number;
  readonly bottomY: number;
  readonly strokeWidth: number;
  readonly forwardLean: number;
  readonly leftStem: Polygon;
  readonly rightStem: Polygon;
  readonly diagonal: Polygon;
  readonly gaps: Readonly<Record<GapOption, Polygon>>;
};

export type ThemeColors = { primary: string; accent: string };

export type SmallSizeGeometry = {
  leftStem: Polygon;
  rightStem: Polygon;
  diagonal: Polygon;
  gap: Polygon;
};

/* -------------------------------------------------------------------------- */
/*  Re-exports (typed)                                                         */
/* -------------------------------------------------------------------------- */

export const CANVAS_SIZE: number = raw.CANVAS_SIZE;
export const TOP_Y: number = raw.TOP_Y;
export const BOTTOM_Y: number = raw.BOTTOM_Y;
export const STROKE_WIDTH: number = raw.STROKE_WIDTH;
export const FORWARD_LEAN: number = raw.FORWARD_LEAN;

export const NAVY: string = raw.NAVY;
export const ELECTRIC_BLUE: string = raw.ELECTRIC_BLUE;
export const WHITE: string = raw.WHITE;
export const SLATE: string = raw.SLATE;

export const OPTICAL_CENTER: { x: number; y: number } = raw.OPTICAL_CENTER;
export const BOUNDING_BOX: { minX: number; minY: number; maxX: number; maxY: number } =
  raw.BOUNDING_BOX;
export const CLEAR_SPACE: number = raw.CLEAR_SPACE;

// The .mjs source infers coordinates as number[][]; the runtime shape is
// guaranteed to be [x, y] tuples by the geometry test suite. Route the single
// structural cast through `unknown` so the tuple-based types apply cleanly.
export const logoGeometry: LogoGeometry = raw.logoGeometry as unknown as LogoGeometry;
export const MASTER_GAP: GapOption = raw.MASTER_GAP as GapOption;
export const GAP_OPTIONS: readonly GapOption[] = raw.GAP_OPTIONS as GapOption[];

export function pointsToSvg(polygon: Polygon): string {
  return raw.pointsToSvg(polygon);
}

export function getGapGeometry(option: GapOption): Polygon {
  return raw.getGapGeometry(option) as Polygon;
}

export function getThemeColors(theme: LogoTheme): ThemeColors {
  return raw.getThemeColors(theme) as ThemeColors;
}

export function getSmallSizeGeometry(gapOption: GapOption = MASTER_GAP): SmallSizeGeometry {
  return raw.getSmallSizeGeometry(gapOption) as SmallSizeGeometry;
}

export function round2(n: number): number {
  return raw.round2(n);
}
