"use client";

import { useRef, useState } from "react";
import { Download, Minus, Plus, Moon, Sun } from "lucide-react";
import {
  LogoArt,
  candidates,
  downloadMatrix,
  type CandidateId,
  type LockupLayout,
} from "@/lib/logo-lab";
import { downloadSvgElement } from "./download-svg";
import { cn } from "@/lib/utils";

type Bg = "light" | "dark";

const layoutOptions: { value: LockupLayout; label: string }[] = [
  { value: "icon", label: "Icon" },
  { value: "horizontal", label: "Horizontal" },
  { value: "stacked", label: "Stacked" },
];

export function LogoLabExplorer() {
  const [active, setActive] = useState<CandidateId>("a");
  const [bg, setBg] = useState<Bg>("light");
  const [layout, setLayout] = useState<LockupLayout>("icon");
  const [zoom, setZoom] = useState(160);
  const focusRef = useRef<SVGSVGElement | null>(null);

  const mode = bg === "dark" ? "reversed" : "color";
  const surface =
    bg === "dark" ? "bg-[#0B1320] text-white" : "bg-white text-[#0B1320]";

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Candidate
          </span>
          {candidates.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={active === c.id}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === c.id
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-muted hover:text-foreground",
              )}
            >
              <span className="font-display font-semibold">{c.code}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Layout */}
          <div className="inline-flex rounded-lg border border-border bg-surface p-1">
            {layoutOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLayout(opt.value)}
                aria-pressed={layout === opt.value}
                className={cn(
                  "min-h-9 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  layout === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Background toggle */}
          <button
            type="button"
            onClick={() => setBg((b) => (b === "light" ? "dark" : "light"))}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {bg === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            {bg === "light" ? "Light background" : "Dark background"}
          </button>

          {/* Zoom */}
          <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-1.5 py-1">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(64, z - 32))}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-foreground"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-12 text-center text-xs tabular-nums text-muted">{zoom}px</span>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(320, z + 32))}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Download focused mark */}
          <button
            type="button"
            onClick={() =>
              downloadSvgElement(
                focusRef.current,
                `niall-tech-${active}-${layout}-${mode}.svg`,
              )
            }
            className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-3.5 w-3.5" />
            Download this view
          </button>
        </div>
      </div>

      {/* Focused stage */}
      <div className={cn("flex items-center justify-center overflow-auto p-8 transition-colors", surface)}>
        <div
          className="max-w-full"
          style={{
            width:
              layout === "icon"
                ? zoom
                : layout === "horizontal"
                  ? Math.round(zoom * 2.6)
                  : Math.round(zoom * 1.15),
          }}
        >
          <LogoArt
            ref={focusRef}
            candidate={active}
            layout={layout}
            mode={mode}
            title={`Candidate ${active.toUpperCase()} ${layout}`}
            className="block h-auto w-full"
          />
        </div>
      </div>

      {/* All candidates at the same size */}
      <div className="border-t border-border p-5 sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
          All candidates · same size · {bg} background
        </p>
        <div className={cn("grid grid-cols-2 gap-3 rounded-xl p-4 sm:grid-cols-5", surface)}>
          {candidates.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg p-3 transition-all",
                active === c.id ? "ring-2 ring-primary" : "hover:opacity-80",
              )}
            >
              <LogoArt candidate={c.id} layout="icon" mode={mode} className="h-16 w-16" />
              <span className="text-xs font-medium opacity-80">{c.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Favicon + monochrome comparison */}
      <div className="grid gap-5 border-t border-border p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Favicon rendering · 16 / 24 / 32px
          </p>
          <div className="space-y-2">
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-lg border border-border bg-white px-3 py-2">
                <span className="w-4 font-display text-xs font-semibold text-[#0B1320]">{c.code}</span>
                <LogoArt candidate={c.id} layout="icon" mode="color" className="h-4 w-4" />
                <LogoArt candidate={c.id} layout="icon" mode="color" className="h-6 w-6" />
                <LogoArt candidate={c.id} layout="icon" mode="color" className="h-8 w-8" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Monochrome rendering
          </p>
          <div className="space-y-2">
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-lg border border-border bg-white px-3 py-2">
                <span className="w-4 font-display text-xs font-semibold text-[#0B1320]">{c.code}</span>
                <LogoArt candidate={c.id} layout="icon" mode="mono" className="h-9 w-9" />
                <LogoArt candidate={c.id} layout="horizontal" mode="mono" className="h-6 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download full set for active candidate */}
      <ExplorerDownloads candidate={active} />
    </div>
  );
}

function ExplorerDownloads({ candidate }: { candidate: CandidateId }) {
  const refs = useRef<Record<string, SVGSVGElement | null>>({});
  return (
    <div className="border-t border-border p-5 sm:p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Download candidate {candidate.toUpperCase()} · SVG masters
      </p>
      <div className="flex flex-wrap gap-2">
        {downloadMatrix.map((spec) => (
          <button
            key={spec.key}
            type="button"
            onClick={() => downloadSvgElement(refs.current[spec.key], spec.filename(candidate))}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-3.5 w-3.5" />
            {spec.label}
          </button>
        ))}
      </div>
      <div className="sr-only" aria-hidden>
        {downloadMatrix.map((spec) => (
          <LogoArt
            key={spec.key}
            candidate={candidate}
            layout={spec.layout}
            mode={spec.mode}
            ref={(el: SVGSVGElement | null) => {
              refs.current[spec.key] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
