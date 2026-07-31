"use client";

import { useState } from "react";
import {
  BOUNDING_BOX,
  CLEAR_SPACE,
  COLORS,
  getThemeColors,
  MARK_VERTICES,
  NEGATIVE_SPACE,
  OPTICAL_CENTER,
  NIALL_MARK_PATHS,
  type MarkShapeId,
  type MarkTheme,
} from "@/brand/niall-mark-geometry";

const SHAPE_META: { key: MarkShapeId; label: string }[] = [
  { key: "main", label: "Main folded beam" },
  { key: "lowerLeft", label: "Lower-left pillar" },
  { key: "bluePillar", label: "Blue upper-right pillar" },
];

export function ConstructionViewer({ theme = "light" }: { theme?: MarkTheme }) {
  const [showGrid, setShowGrid] = useState(true);
  const [showVertices, setShowVertices] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showGuides, setShowGuides] = useState(true);

  const colors = getThemeColors(theme);
  const pad = 28;
  const vb = `${-pad} ${-pad} ${120 + pad * 2} ${120 + pad * 2}`;
  const bg = theme === "dark" ? "#0B1320" : "#ffffff";
  const gridColor = theme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(11,19,32,0.10)";
  const guideColor = COLORS.electricBlue;
  const labelColor = theme === "dark" ? "#e5e7eb" : "#0B1320";

  const gridLines: number[] = [];
  for (let i = 0; i <= 120; i += 10) gridLines.push(i);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
      <div
        className="flex items-center justify-center rounded-2xl border border-border p-4"
        style={{ backgroundColor: bg }}
      >
        <svg
          viewBox={vb}
          className="h-auto w-full max-w-md"
          role="img"
          aria-label="Construction grid for the reconstructed Niall Tech mark"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Reconstructed mark construction grid</title>

          {showGrid ? (
            <g>
              {gridLines.map((i) => (
                <line
                  key={`v${i}`}
                  x1={i}
                  y1={0}
                  x2={i}
                  y2={120}
                  stroke={gridColor}
                  strokeWidth={i % 60 === 0 ? 0.6 : 0.3}
                />
              ))}
              {gridLines.map((i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={i}
                  x2={120}
                  y2={i}
                  stroke={gridColor}
                  strokeWidth={i % 60 === 0 ? 0.6 : 0.3}
                />
              ))}
            </g>
          ) : null}

          {/* The actual mark — three flat canonical paths, no mask or transform */}
          <path d={NIALL_MARK_PATHS.main} fill={colors.primary} />
          <path d={NIALL_MARK_PATHS.lowerLeft} fill={colors.primary} />
          <path d={NIALL_MARK_PATHS.bluePillar} fill={colors.blue} />

          {showGuides ? (
            <g fill="none">
              {/* Clear-space boundary */}
              <rect
                x={BOUNDING_BOX.minX - CLEAR_SPACE}
                y={BOUNDING_BOX.minY - CLEAR_SPACE}
                width={BOUNDING_BOX.maxX - BOUNDING_BOX.minX + CLEAR_SPACE * 2}
                height={BOUNDING_BOX.maxY - BOUNDING_BOX.minY + CLEAR_SPACE * 2}
                stroke={guideColor}
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.7}
              />
              {/* Bounding box */}
              <rect
                x={BOUNDING_BOX.minX}
                y={BOUNDING_BOX.minY}
                width={BOUNDING_BOX.maxX - BOUNDING_BOX.minX}
                height={BOUNDING_BOX.maxY - BOUNDING_BOX.minY}
                stroke={guideColor}
                strokeWidth={0.6}
                strokeDasharray="2 2"
              />
              {/* Optical center cross */}
              <line
                x1={OPTICAL_CENTER.x - 5}
                y1={OPTICAL_CENTER.y}
                x2={OPTICAL_CENTER.x + 5}
                y2={OPTICAL_CENTER.y}
                stroke="#ef4444"
                strokeWidth={0.8}
              />
              <line
                x1={OPTICAL_CENTER.x}
                y1={OPTICAL_CENTER.y - 5}
                x2={OPTICAL_CENTER.x}
                y2={OPTICAL_CENTER.y + 5}
                stroke="#ef4444"
                strokeWidth={0.8}
              />
              {/* Negative-space channel markers */}
              <line x1={8} y1={38} x2={8} y2={49} stroke="#ef4444" strokeWidth={0.9} />
              <line x1={88} y1={34} x2={88} y2={46} stroke="#ef4444" strokeWidth={0.9} />
            </g>
          ) : null}

          {showVertices
            ? SHAPE_META.map((meta) =>
                MARK_VERTICES[meta.key].map((pt, idx) => (
                  <g key={`${meta.key}-${idx}`}>
                    <circle cx={pt[0]} cy={pt[1]} r={1.4} fill={guideColor} />
                    {showLabels ? (
                      <text
                        x={pt[0] + 1.8}
                        y={pt[1] - 1.6}
                        fontSize={3}
                        fill={labelColor}
                        fontFamily="var(--font-inter-recon), Inter, sans-serif"
                      >
                        {pt[0]},{pt[1]}
                      </text>
                    ) : null}
                  </g>
                )),
              )
            : null}

          {showGuides ? (
            <>
              <text
                x={2}
                y={45}
                fontSize={3.2}
                fill="#ef4444"
                fontFamily="var(--font-inter-recon), Inter, sans-serif"
              >
                {NEGATIVE_SPACE.leftChannel.verticalUnits}u
              </text>
              <text
                x={90}
                y={42}
                fontSize={3.2}
                fill="#ef4444"
                fontFamily="var(--font-inter-recon), Inter, sans-serif"
              >
                {NEGATIVE_SPACE.blueChannel.verticalUnits}u
              </text>
            </>
          ) : null}
        </svg>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/40 p-4 text-sm">
        <p className="font-semibold text-foreground">Geometry overlay</p>
        <Toggle label="120 x 120 grid" checked={showGrid} onChange={setShowGrid} />
        <Toggle label="Polygon vertices" checked={showVertices} onChange={setShowVertices} />
        <Toggle label="Point labels" checked={showLabels} onChange={setShowLabels} />
        <Toggle
          label="Guides (bbox, center, clear space, channels)"
          checked={showGuides}
          onChange={setShowGuides}
        />
        <dl className="mt-2 space-y-1 border-t border-border pt-3 text-xs text-muted">
          <Row k="Canvas" v="120 x 120" />
          <Row
            k="Bounding box"
            v={`${BOUNDING_BOX.minX},${BOUNDING_BOX.minY} -> ${BOUNDING_BOX.maxX},${BOUNDING_BOX.maxY}`}
          />
          <Row k="Optical center" v={`${OPTICAL_CENTER.x}, ${OPTICAL_CENTER.y}`} />
          <Row k="Clear space" v={`${CLEAR_SPACE} units`} />
          <Row k="Left channel" v={`${NEGATIVE_SPACE.leftChannel.verticalUnits}u vertical`} />
          <Row k="Blue channel" v={`${NEGATIVE_SPACE.blueChannel.verticalUnits}u vertical`} />
        </dl>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-9 items-center gap-2.5 text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#146BFF]"
      />
      <span>{label}</span>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt>{k}</dt>
      <dd className="font-mono text-foreground">{v}</dd>
    </div>
  );
}
