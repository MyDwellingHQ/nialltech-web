import { ReconstructedBrandMark } from "./ReconstructedBrandMark";
import type { GapOption } from "./logo-geometry";

const SIZES = [16, 24, 32, 48, 64, 128];

/** Pixel-size test row (16 -> 128). Sizes < 32 use small-size corrections. */
export function SizeTests({ gap = "medium" }: { gap?: GapOption }) {
  return (
    <div className="flex flex-wrap items-end gap-6 rounded-2xl border border-border bg-white p-6">
      {SIZES.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <div className="flex items-end justify-center" style={{ height: 128 }}>
            <ReconstructedBrandMark theme="light" gap={gap} size={s} title={`${s}px mark`} />
          </div>
          <span className="font-mono text-xs text-muted">
            {s}px{s < 32 ? " *" : ""}
          </span>
        </div>
      ))}
      <p className="w-full text-xs text-muted">
        * 16px and 24px use the small-size optical corrections (reduced gap, widened diagonal,
        expanded pillar).
      </p>
    </div>
  );
}

const BACKGROUNDS: { key: string; label: string; bg: string; theme: "light" | "dark" | "monochrome"; text?: string }[] =
  [
    { key: "white", label: "White", bg: "#FFFFFF", theme: "light" },
    { key: "navy", label: "Deep navy", bg: "#0B1320", theme: "dark" },
    { key: "gray", label: "Mid-gray", bg: "#6b7280", theme: "dark" },
    { key: "blue", label: "Electric blue", bg: "#146BFF", theme: "dark" },
  ];

/** Background test matrix incl. a transparent checkerboard. */
export function BackgroundTests({ gap = "medium" }: { gap?: GapOption }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {BACKGROUNDS.map((b) => (
        <figure key={b.key} className="overflow-hidden rounded-2xl border border-border">
          <div
            className="flex h-36 items-center justify-center"
            style={{ backgroundColor: b.bg, color: b.text }}
          >
            <ReconstructedBrandMark theme={b.theme} gap={gap} size={72} title={`${b.label} test`} />
          </div>
          <figcaption className="border-t border-border bg-card p-2 text-center text-xs text-muted">
            {b.label}
          </figcaption>
        </figure>
      ))}
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div
          className="flex h-36 items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #d1d5db 25%, transparent 25%), linear-gradient(-45deg, #d1d5db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d1d5db 75%), linear-gradient(-45deg, transparent 75%, #d1d5db 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
            backgroundColor: "#ffffff",
          }}
        >
          <ReconstructedBrandMark theme="light" gap={gap} size={72} title="Transparent test" />
        </div>
        <figcaption className="border-t border-border bg-card p-2 text-center text-xs text-muted">
          Transparent
        </figcaption>
      </figure>
    </div>
  );
}
