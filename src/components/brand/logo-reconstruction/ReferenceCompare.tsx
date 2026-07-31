"use client";

import Image from "next/image";
import { useState } from "react";
import { ReconstructedBrandMark } from "./ReconstructedBrandMark";

const REFERENCE_BOARD = "/brand/logo-reconstruction/reference/reference-board.jpeg";
const REFERENCE_ICON = "/brand/logo-reconstruction/reference/reference-horizontal.jpeg";

/**
 * Visual-only comparison of the uploaded brand board against the reconstructed
 * vector. Includes an overlay with independent opacity, scale, and offset
 * controls. This performs NO automatic tracing — the vector is governed solely
 * by the explicit canonical geometry.
 */
export function ReferenceCompare() {
  const [refOpacity, setRefOpacity] = useState(60);
  const [vecOpacity, setVecOpacity] = useState(100);
  const [scale, setScale] = useState(100);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  function reset() {
    setRefOpacity(60);
    setVecOpacity(100);
    setScale(100);
    setOffsetX(0);
    setOffsetY(0);
  }

  return (
    <div className="grid gap-6">
      {/* Side by side */}
      <div className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={REFERENCE_BOARD}
              alt="Uploaded Niall Tech brand board reference"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <figcaption className="border-t border-border p-3 text-xs text-muted">
            Uploaded reference brand board (visual target)
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="flex aspect-[16/10] w-full items-center justify-center p-8">
            <ReconstructedBrandMark theme="light" size={200} title="Reconstructed mark" />
          </div>
          <figcaption className="border-t border-border p-3 text-xs text-muted">
            Reconstructed vector (canonical three-shape geometry)
          </figcaption>
        </figure>
      </div>

      {/* Overlay */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#f4f6fa] p-6">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={REFERENCE_ICON}
              alt="Reference horizontal lockup crop"
              fill
              className="object-contain"
              style={{ opacity: refOpacity / 100 }}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ opacity: vecOpacity / 100 }}
            >
              <div
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale / 100})`,
                }}
              >
                <ReconstructedBrandMark
                  theme="light"
                  size={180}
                  decorative
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/40 p-4 text-sm">
          <p className="font-semibold text-foreground">Overlay controls</p>
          <Slider label="Reference opacity" value={refOpacity} min={0} max={100} onChange={setRefOpacity} suffix="%" />
          <Slider label="Vector opacity" value={vecOpacity} min={0} max={100} onChange={setVecOpacity} suffix="%" />
          <Slider label="Scale" value={scale} min={40} max={200} onChange={setScale} suffix="%" />
          <Slider label="Horizontal offset" value={offsetX} min={-120} max={120} onChange={setOffsetX} suffix="px" />
          <Slider label="Vertical offset" value={offsetY} min={-120} max={120} onChange={setOffsetY} suffix="px" />
          <button
            type="button"
            onClick={reset}
            className="mt-1 min-h-9 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Reset (offsets 0)
          </button>
          <p className="text-xs leading-relaxed text-muted">
            Visual evaluation only. The vector is defined entirely by the explicit
            geometry constants — the reference image is never auto-traced.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-foreground">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer accent-[#146BFF]"
      />
    </label>
  );
}
