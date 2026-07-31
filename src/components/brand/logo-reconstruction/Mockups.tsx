import { ReconstructedBrandMark } from "./ReconstructedBrandMark";
import {
  ReconstructedHorizontalLockup,
  ReconstructedStackedLockup,
} from "./ReconstructedLockups";
import { ReconstructedWordmark } from "./ReconstructedWordmark";

function Frame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex min-h-48 items-center justify-center overflow-hidden">{children}</div>
      <figcaption className="border-t border-border p-3 text-xs font-medium text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

/** Website header simulation — browser chrome + nav bar. */
export function WebsiteHeaderMockup() {
  return (
    <Frame label="Website header">
      <div className="w-full">
        <div className="flex items-center gap-1.5 bg-[#0B1320] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
            nialltech.com
          </span>
        </div>
        <div className="flex items-center justify-between bg-white px-5 py-3">
          <ReconstructedHorizontalLockup theme="light" className="h-8 w-auto" />
          <nav className="hidden items-center gap-5 text-xs font-medium text-[#0B1320] sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
            <span className="rounded-md bg-[#146BFF] px-3 py-1.5 text-white">Get started</span>
          </nav>
        </div>
      </div>
    </Frame>
  );
}

/** Vehicle door simulation — dark panel with reverse lockup + accent stripe. */
export function VehicleDoorMockup() {
  return (
    <Frame label="Vehicle door">
      <div className="relative flex min-h-56 w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#131c2b] to-[#0B1320] px-8">
        <div className="absolute right-0 top-1/2 h-24 w-2/3 -translate-y-1/2 -skew-y-6 bg-[#146BFF]/15" />
        <div className="absolute bottom-6 right-8 h-1.5 w-40 skew-y-[-6deg] bg-[#146BFF]" />
        <div className="relative flex flex-col items-center gap-3">
          <ReconstructedHorizontalLockup theme="dark" className="h-14 w-auto" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
            Modern IT. Local Expertise.
          </p>
        </div>
      </div>
    </Frame>
  );
}

/** Building sign simulation — dimensional letters on a facade. */
export function BuildingSignMockup() {
  return (
    <Frame label="Building signage">
      <div className="relative flex min-h-56 w-full items-center justify-center overflow-hidden bg-[#1b2431] px-8">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 26px)",
          }}
          aria-hidden
        />
        <div className="relative drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]">
          <ReconstructedHorizontalLockup theme="dark" className="h-16 w-auto" />
        </div>
      </div>
    </Frame>
  );
}

/** Business card simulation — front (light) + back (navy). */
export function BusinessCardMockup() {
  return (
    <Frame label="Business cards">
      <div className="flex min-h-56 w-full flex-wrap items-center justify-center gap-4 bg-surface/50 p-6">
        <div className="flex aspect-[1.75/1] w-56 flex-col justify-between rounded-lg bg-white p-4 shadow-soft">
          <ReconstructedBrandMark theme="light" size={34} title="Niall Tech" />
          <div>
            <p className="text-[11px] font-semibold text-[#0B1320]">Paul Dent</p>
            <p className="text-[9px] uppercase tracking-wide text-[#475569]">Managing Partner</p>
            <p className="mt-1 text-[8px] text-[#475569]">paul@nialltech.com · (206) 555-0198</p>
          </div>
        </div>
        <div className="flex aspect-[1.75/1] w-56 items-center justify-center rounded-lg bg-[#0B1320] p-4 shadow-soft">
          <ReconstructedStackedLockup theme="dark" className="h-24 w-auto" />
        </div>
      </div>
    </Frame>
  );
}

/** One-color vinyl simulation — single ink, both polarities. */
export function OneColorVinylMockup() {
  return (
    <Frame label="One-color vinyl">
      <div className="grid min-h-56 w-full grid-cols-2">
        <div className="flex items-center justify-center bg-white text-[#0B1320]">
          <ReconstructedBrandMark theme="monochrome" size={90} title="One color (navy on white)" />
        </div>
        <div className="flex items-center justify-center bg-[#0B1320] text-white">
          <ReconstructedBrandMark theme="monochrome" size={90} title="One color (white on navy)" />
        </div>
      </div>
    </Frame>
  );
}

/** Embroidery simulation — simplified stitch-friendly mark on fabric. */
export function EmbroideryMockup() {
  return (
    <Frame label="Embroidery">
      <div
        className="flex min-h-56 w-full items-center justify-center"
        style={{
          backgroundColor: "#0e1726",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      >
        <div className="flex flex-col items-center gap-3 rounded-xl bg-[#0B1320] px-8 py-6 ring-1 ring-white/10">
          <ReconstructedBrandMark theme="dark" size={64} title="Embroidery mark" />
          <ReconstructedWordmark variant="clean" theme="dark" className="scale-[0.55]" />
        </div>
      </div>
    </Frame>
  );
}

export function MockupGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <WebsiteHeaderMockup />
      <VehicleDoorMockup />
      <BuildingSignMockup />
      <BusinessCardMockup />
      <OneColorVinylMockup />
      <EmbroideryMockup />
    </div>
  );
}
