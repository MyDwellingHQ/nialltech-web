/**
 * Niall Tech — CANONICAL MARK GEOMETRY (typed wrapper)
 * ============================================================================
 * Re-exports the single source of truth in `niall-mark-geometry.mjs` with
 * strong types. Never duplicate coordinates here — the .mjs module is
 * authoritative and is also consumed directly by the Node build/test scripts.
 */
import * as raw from "./niall-mark-geometry.mjs";

export type MarkTheme = "light" | "dark" | "monochrome";
export type MarkShapeId = "main" | "lowerLeft" | "bluePillar";
export type Vertex = readonly [number, number];

export interface MarkPaths {
  readonly main: string;
  readonly lowerLeft: string;
  readonly bluePillar: string;
}

export interface ThemeColors {
  readonly primary: string;
  readonly blue: string;
}

export const CANVAS_SIZE: number = raw.CANVAS_SIZE;
export const NIALL_MARK_VIEWBOX: string = raw.NIALL_MARK_VIEWBOX;
export const NIALL_MARK_PATHS: MarkPaths = raw.NIALL_MARK_PATHS as MarkPaths;
export const COLORS = raw.COLORS as {
  readonly navy: string;
  readonly electricBlue: string;
  readonly electricBlueDigital: string;
  readonly white: string;
  readonly slate: string;
};
export const CSS_VARS = raw.CSS_VARS as { readonly primary: string; readonly blue: string };
export const CONSTANTS = raw.CONSTANTS as {
  readonly TOP_Y: number;
  readonly BOTTOM_Y: number;
  readonly STRUCTURAL_THICKNESS: number;
  readonly BLUE_PILLAR_WIDTH: number;
  readonly FORWARD_RHYTHM_DEG: number;
};

export const MARK_VERTICES = raw.MARK_VERTICES as unknown as Record<MarkShapeId, Vertex[]>;
export const BOUNDING_BOX = raw.BOUNDING_BOX as {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
};
export const OPTICAL_CENTER = raw.OPTICAL_CENTER as { readonly x: number; readonly y: number };
export const CLEAR_SPACE: number = raw.CLEAR_SPACE;
export const RATIOS = raw.RATIOS as Record<string, number>;
export const NEGATIVE_SPACE = raw.NEGATIVE_SPACE as unknown as Record<
  "leftChannel" | "blueChannel",
  {
    label: string;
    verticalUnits: number;
    perpendicularUnits: number;
    measuredAtX: number;
  }
>;
export const MIN_SIZES = raw.MIN_SIZES as {
  readonly digitalPx: number;
  readonly faviconPx: number;
  readonly printInches: number;
  readonly embroideryInches: number;
};

export function getThemeColors(theme: MarkTheme): ThemeColors {
  return raw.getThemeColors(theme) as ThemeColors;
}

export function parsePathVertices(d: string): Vertex[] {
  return raw.parsePathVertices(d) as Vertex[];
}

export function getBoundingBox() {
  return raw.getBoundingBox() as {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
}

/** Ordered shape list for rendering (paint order = array order). */
export const MARK_SHAPES: ReadonlyArray<{ id: MarkShapeId; d: string; fillVar: "primary" | "blue" }> = [
  { id: "main", d: NIALL_MARK_PATHS.main, fillVar: "primary" },
  { id: "lowerLeft", d: NIALL_MARK_PATHS.lowerLeft, fillVar: "primary" },
  { id: "bluePillar", d: NIALL_MARK_PATHS.bluePillar, fillVar: "blue" },
];
