import { ReconstructedBrandMark } from "./ReconstructedBrandMark";
import {
  COLORS,
  MARK_VERTICES,
  NEGATIVE_SPACE,
  NIALL_MARK_PATHS,
  RATIOS,
  type MarkShapeId,
} from "@/brand/niall-mark-geometry";

const SHAPES: { key: MarkShapeId; label: string; fill: string; note: string }[] = [
  {
    key: "main",
    label: "Main folded beam",
    fill: COLORS.navy,
    note: "Navy · upper-left cap + 45° diagonal + lower-right termination (one polygon)",
  },
  {
    key: "lowerLeft",
    label: "Lower-left pillar",
    fill: COLORS.navy,
    note: "Navy · separate pillar with 4u bottom chamfers",
  },
  {
    key: "bluePillar",
    label: "Blue upper-right pillar",
    fill: COLORS.electricBlue,
    note: "Electric blue · tall structural column, 4u top-right chamfer",
  },
];

/** Explicit polygon coordinates + path string for each of the three shapes. */
export function PolygonCoordinates() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {SHAPES.map((s) => (
        <div key={s.key} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-sm border border-border"
              style={{ backgroundColor: s.fill }}
              aria-hidden
            />
            <h3 className="font-display text-sm font-semibold text-foreground">{s.label}</h3>
          </div>
          <p className="mt-1 text-xs text-muted">{s.note}</p>
          <ol className="mt-3 space-y-0.5 font-mono text-xs text-foreground">
            {MARK_VERTICES[s.key].map((p, i) => (
              <li key={i}>
                <span className="text-muted">{i}:</span> {p[0]}, {p[1]}
              </li>
            ))}
          </ol>
          <p className="mt-3 break-all rounded bg-surface/60 p-2 font-mono text-[10px] text-muted">
            d=&quot;{NIALL_MARK_PATHS[s.key]}&quot;
          </p>
        </div>
      ))}
    </div>
  );
}

/** Layer stacking order (paint order, first painted at the bottom). */
export function LayerOrder() {
  const layers = [
    { n: 1, label: "Main folded beam (navy / white)", color: COLORS.navy },
    { n: 2, label: "Lower-left pillar (navy / white)", color: COLORS.navy },
    { n: 3, label: "Blue upper-right pillar (electric blue)", color: COLORS.electricBlue },
  ];
  return (
    <ol className="grid gap-2 sm:grid-cols-3">
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

/** Structural negative-space channels + key proportional ratios. */
export function NegativeSpaceSpec() {
  const channels = [NEGATIVE_SPACE.leftChannel, NEGATIVE_SPACE.blueChannel];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-sm font-semibold text-foreground">Negative-space channels</h3>
        <p className="mt-1 text-xs text-muted">
          Structural gaps between shapes — no mask or cutout. Both edges follow the same 45° line.
        </p>
        <dl className="mt-3 space-y-2 text-xs">
          {channels.map((ch) => (
            <div key={ch.label} className="rounded-lg bg-surface/60 p-2">
              <dt className="font-medium text-foreground">{ch.label}</dt>
              <dd className="mt-0.5 font-mono text-muted">
                {ch.verticalUnits}u vertical · {ch.perpendicularUnits}u perpendicular · measured at
                x={ch.measuredAtX}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-sm font-semibold text-foreground">Proportional ratios</h3>
        <dl className="mt-3 space-y-1 font-mono text-xs">
          <RatioRow k="Width / height" v={`${RATIOS.widthToHeight}`} />
          <RatioRow k="Structural thickness" v={`${RATIOS.structuralThicknessPct}% of width`} />
          <RatioRow k="Blue pillar width" v={`${RATIOS.bluePillarWidthPct}% of width`} />
          <RatioRow k="Left channel" v={`${RATIOS.leftChannelPct}% of height`} />
          <RatioRow k="Blue pillar height" v={`${RATIOS.bluePillarHeightPct}% of height`} />
          <RatioRow k="Lower-left pillar height" v={`${RATIOS.lowerLeftPillarHeightPct}% of height`} />
        </dl>
      </div>
    </div>
  );
}

function RatioRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-foreground">{v}</dd>
    </div>
  );
}

/** Light / dark / monochrome renderings — identical geometry, differing fills. */
export function ThemeRenderings() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-white">
          <ReconstructedBrandMark theme="light" size={100} title="Light rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Light (navy + blue)
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-[#0B1320]">
          <ReconstructedBrandMark theme="dark" size={100} title="Dark rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Dark (white + blue)
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-border">
        <div className="flex h-40 items-center justify-center bg-white text-[#0B1320]">
          <ReconstructedBrandMark theme="monochrome" size={100} title="Monochrome rendering" />
        </div>
        <figcaption className="border-t border-border bg-card p-3 text-sm text-muted">
          Monochrome (currentColor)
        </figcaption>
      </figure>
    </div>
  );
}
