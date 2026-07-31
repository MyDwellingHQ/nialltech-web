import { ReconstructedBrandMark } from "./ReconstructedBrandMark";
import {
  ELECTRIC_BLUE,
  logoGeometry,
  NAVY,
  pointsToSvg,
  type GapOption,
  type Polygon,
} from "./logo-geometry";

const STROKES: { key: "rightStem" | "leftStem" | "diagonal"; label: string; fill: string; note: string }[] =
  [
    { key: "leftStem", label: "Left stem", fill: NAVY, note: "Navy · forward lean" },
    { key: "diagonal", label: "Diagonal", fill: NAVY, note: "Navy · upper-left → lower-right" },
    { key: "rightStem", label: "Right pillar", fill: ELECTRIC_BLUE, note: "Electric blue · defining stem" },
  ];

/** Explicit polygon coordinates for every stroke + gap option. */
export function PolygonCoordinates() {
  const gapKeys: GapOption[] = ["hairline", "medium", "chamfered"];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {STROKES.map((s) => (
        <CoordCard
          key={s.key}
          title={s.label}
          note={s.note}
          swatch={s.fill}
          polygon={logoGeometry[s.key] as Polygon}
        />
      ))}
      {gapKeys.map((k) => (
        <CoordCard
          key={k}
          title={`Gap · ${k}`}
          note="Negative-space cutout (mask)"
          swatch="transparent"
          polygon={logoGeometry.gaps[k] as Polygon}
        />
      ))}
    </div>
  );
}

function CoordCard({
  title,
  note,
  swatch,
  polygon,
}: {
  title: string;
  note: string;
  swatch: string;
  polygon: Polygon;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span
          className="h-4 w-4 rounded-sm border border-border"
          style={{ backgroundColor: swatch }}
          aria-hidden
        />
        <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-1 text-xs text-muted">{note}</p>
      <ol className="mt-3 space-y-0.5 font-mono text-xs text-foreground">
        {polygon.map((p, i) => (
          <li key={i}>
            <span className="text-muted">{i}:</span> {p[0]}, {p[1]}
          </li>
        ))}
      </ol>
      <p className="mt-3 break-all rounded bg-surface/60 p-2 font-mono text-[10px] text-muted">
        points=&quot;{pointsToSvg(polygon)}&quot;
      </p>
    </div>
  );
}

/** Layer stacking order, top to bottom of the render tree. */
export function LayerOrder() {
  const layers = [
    { n: 1, label: "Electric-blue right stem / pillar", color: ELECTRIC_BLUE },
    { n: 2, label: "Navy left stem", color: NAVY },
    { n: 3, label: "Navy diagonal", color: NAVY },
    { n: 4, label: "Negative-space gap mask (carves layers 2–3)", color: "transparent" },
  ];
  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {layers.map((l) => (
        <li
          key={l.n}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-xs font-semibold text-foreground">
            {l.n}
          </span>
          <span
            className="h-4 w-4 rounded-sm border border-border"
            style={{ backgroundColor: l.color }}
            aria-hidden
          />
          <span className="text-foreground">{l.label}</span>
        </li>
      ))}
    </ol>
  );
}

/** The three gap options rendered on identical geometry. */
export function GapComparison() {
  const gaps: { key: GapOption; label: string; width: string }[] = [
    { key: "hairline", label: "Option A · Hairline", width: "2u" },
    { key: "medium", label: "Option B · Medium (master)", width: "4u" },
    { key: "chamfered", label: "Option C · Chamfered", width: "6-pt" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {gaps.map((g) => (
        <figure key={g.key} className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex h-40 items-center justify-center bg-white">
            <ReconstructedBrandMark theme="light" gap={g.key} size={110} title={g.label} />
          </div>
          <figcaption className="border-t border-border p-3">
            <p className="text-sm font-medium text-foreground">{g.label}</p>
            <p className="text-xs text-muted">Gap width {g.width}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Light / dark / monochrome renderings — identical geometry, differing fills. */
export function ThemeRenderings({ gap = "medium" }: { gap?: GapOption }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-white">
          <ReconstructedBrandMark theme="light" gap={gap} size={100} title="Light rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Light (navy + blue)
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-[#0B1320]">
          <ReconstructedBrandMark theme="dark" gap={gap} size={100} title="Dark rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Dark (white + blue)
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-white text-[#0B1320]">
          <ReconstructedBrandMark theme="monochrome" gap={gap} size={100} title="Monochrome rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Monochrome (currentColor)
        </figcaption>
      </figure>
    </div>
  );
}
