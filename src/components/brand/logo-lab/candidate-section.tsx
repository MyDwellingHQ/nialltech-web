import {
  LogoArt,
  scoreLabels,
  type Candidate,
  type ScoreKey,
} from "@/lib/logo-lab";
import { CandidateDownloads } from "./candidate-downloads";
import {
  BusinessCard,
  FaviconTests,
  HeaderPreviews,
  PoloEmbroidery,
  SignageOneColor,
  TruckDoor,
} from "./mockups";

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Scorecard({ candidate }: { candidate: Candidate }) {
  const keys = Object.keys(scoreLabels) as ScoreKey[];
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          Scorecard
        </h4>
        <span className="text-[0.65rem] text-muted">Design-system estimates — not objective facts</span>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        {keys.map((key) => (
          <div key={key} className="flex items-center gap-3">
            <dt className="w-40 shrink-0 text-xs text-foreground">{scoreLabels[key]}</dt>
            <dd className="flex flex-1 items-center gap-1" aria-label={`${candidate.scores[key]} of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={
                    n <= candidate.scores[key]
                      ? "h-1.5 flex-1 rounded-full bg-primary"
                      : "h-1.5 flex-1 rounded-full bg-border"
                  }
                />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CandidateSection({ candidate }: { candidate: Candidate }) {
  return (
    <article
      id={`candidate-${candidate.id}`}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7"
    >
      <header className="mb-6 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft font-display text-lg font-bold text-primary">
              {candidate.code}
            </span>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {candidate.name}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{candidate.summary}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Construction: </span>
            {candidate.construction}
          </p>
        </div>
      </header>

      {/* Primary previews: icon + lockups on light and dark */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex h-40 items-center justify-center bg-white">
            <LogoArt candidate={candidate.id} layout="icon" mode="color" title={`${candidate.name} icon`} className="h-24 w-24" />
          </div>
          <div className="flex h-40 items-center justify-center bg-[#0B1320]">
            <LogoArt candidate={candidate.id} layout="icon" mode="reversed" className="h-24 w-24" />
          </div>
          <p className="border-t border-border px-4 py-2 text-xs text-muted">Icon — light / dark</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex h-40 items-center justify-center bg-white px-6">
            <LogoArt candidate={candidate.id} layout="horizontal" mode="color" className="h-12 w-auto" />
          </div>
          <div className="flex h-40 items-center justify-center bg-[#0B1320] px-6">
            <LogoArt candidate={candidate.id} layout="horizontal" mode="reversed" className="h-12 w-auto" />
          </div>
          <p className="border-t border-border px-4 py-2 text-xs text-muted">Horizontal lockup</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex h-40 items-center justify-center bg-white px-6">
            <LogoArt candidate={candidate.id} layout="stacked" mode="color" className="h-32 w-auto" />
          </div>
          <div className="flex h-40 items-center justify-center bg-[#0B1320] px-6">
            <LogoArt candidate={candidate.id} layout="stacked" mode="reversed" className="h-32 w-auto" />
          </div>
          <p className="border-t border-border px-4 py-2 text-xs text-muted">Stacked lockup</p>
        </div>
      </div>

      {/* Application mockups */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Panel title="Favicon & small-size tests">
          <FaviconTests candidate={candidate.id} />
        </Panel>
        <Panel title="Website headers">
          <HeaderPreviews candidate={candidate.id} />
        </Panel>
        <Panel title="Business card">
          <BusinessCard candidate={candidate.id} />
        </Panel>
        <Panel title="Truck door">
          <TruckDoor candidate={candidate.id} />
        </Panel>
        <Panel title="Polo embroidery simulation">
          <PoloEmbroidery candidate={candidate.id} />
        </Panel>
        <Panel title="One-color vinyl / signage">
          <SignageOneColor candidate={candidate.id} />
        </Panel>
      </div>

      {/* Scorecard + downloads */}
      <div className="mt-8 grid gap-6">
        <Scorecard candidate={candidate} />
        <Panel title={`Download candidate ${candidate.code} — SVG masters`}>
          <CandidateDownloads candidate={candidate.id} />
        </Panel>
      </div>
    </article>
  );
}
