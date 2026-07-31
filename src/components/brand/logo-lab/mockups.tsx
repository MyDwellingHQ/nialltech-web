import { LogoArt, type CandidateId } from "@/lib/logo-lab";
import { siteConfig } from "@/lib/site";

const websiteHost = siteConfig.url.replace(/^https?:\/\//, "");

/* --------------------------------- Favicon -------------------------------- */

export function FaviconTests({ candidate }: { candidate: CandidateId }) {
  const sizes = [16, 24, 32, 64] as const;
  return (
    <div className="flex flex-wrap items-end gap-5">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center rounded-md border border-border bg-white"
            style={{ width: size + 16, height: size + 16 }}
          >
            <LogoArt
              candidate={candidate}
              layout="icon"
              mode="color"
              title={`${size}px favicon test`}
              className="block"
            />
          </div>
          <span className="text-xs font-medium text-muted">{size}px</span>
        </div>
      ))}
      {/* Browser tab simulation at 16px */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-t-lg border border-border bg-surface-elevated px-2.5 py-1.5">
          <span className="block h-4 w-4">
            <LogoArt candidate={candidate} layout="icon" mode="color" className="h-4 w-4" />
          </span>
          <span className="max-w-24 truncate text-xs text-foreground">Niall Tech</span>
        </div>
        <span className="text-xs font-medium text-muted">Browser tab</span>
      </div>
    </div>
  );
}

/* ------------------------------- Site headers ----------------------------- */

export function HeaderPreviews({ candidate }: { candidate: CandidateId }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      {/* Desktop header */}
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="flex items-center justify-between gap-4 bg-background/90 px-5 py-3 backdrop-blur">
          <div className="flex items-center">
            <LogoArt
              candidate={candidate}
              layout="horizontal"
              mode="color"
              title="Header logo"
              className="h-7 w-auto dark:hidden"
            />
            <LogoArt
              candidate={candidate}
              layout="horizontal"
              mode="reversed"
              className="hidden h-7 w-auto dark:block"
            />
          </div>
          <div className="hidden items-center gap-4 text-xs font-medium text-muted sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
            <span className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground">
              Book a consultation
            </span>
          </div>
        </div>
        <div className="h-16 bg-surface/40" />
        <p className="border-t border-border px-5 py-2 text-xs text-muted">Desktop header</p>
      </div>

      {/* Mobile header */}
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="flex items-center justify-between gap-2 bg-background/90 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="block h-7 w-7">
              <LogoArt candidate={candidate} layout="icon" mode="color" className="h-7 w-7 dark:hidden" />
              <LogoArt candidate={candidate} layout="icon" mode="reversed" className="hidden h-7 w-7 dark:block" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">
              Niall Tech
            </span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted">
            <span className="block h-0.5 w-4 bg-current shadow-[0_5px_0_currentColor,0_-5px_0_currentColor]" />
          </span>
        </div>
        <div className="h-12 bg-surface/40" />
        <p className="border-t border-border px-3 py-2 text-xs text-muted">Mobile header</p>
      </div>
    </div>
  );
}

/* ------------------------------ Business card ----------------------------- */

export function BusinessCard({ candidate }: { candidate: CandidateId }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Front — dark */}
      <div className="flex aspect-[1.75/1] flex-col justify-between rounded-xl bg-[#0B1320] p-5 shadow-soft">
        <LogoArt candidate={candidate} layout="horizontal" mode="reversed" title="Card logo" className="h-7 w-auto" />
        <div className="text-[0.65rem] leading-relaxed text-slate-300">
          <p className="font-semibold text-white">{siteConfig.tagline}</p>
        </div>
      </div>
      {/* Back — light */}
      <div className="flex aspect-[1.75/1] flex-col justify-between rounded-xl border border-border bg-white p-5 shadow-soft">
        <LogoArt candidate={candidate} layout="icon" mode="color" className="h-9 w-9" />
        <div className="text-[0.65rem] leading-relaxed text-slate-600">
          <p className="text-sm font-semibold text-[#0B1320]">Niall Tech</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <p>{websiteHost}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Truck door ------------------------------ */

export function TruckDoor({ candidate }: { candidate: CandidateId }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-slate-100 to-slate-200 p-6 dark:from-slate-200 dark:to-slate-300">
      {/* door seams */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-400/40" />
        <div className="absolute right-6 top-1/2 h-10 w-2 -translate-y-1/2 rounded bg-slate-400/50" />
      </div>
      <div className="relative flex flex-col items-center gap-3 rounded-lg bg-[#0B1320] px-6 py-6 text-center">
        <LogoArt candidate={candidate} layout="horizontal" mode="reversed" title="Vehicle logo" className="h-10 w-auto" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-200/90">
          Modern IT. Local expertise.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-200">
          <span>{siteConfig.phone}</span>
          <span aria-hidden>•</span>
          <span>{websiteHost}</span>
        </div>
      </div>
      <p className="relative mt-3 text-center text-xs text-slate-600">Truck-door panel</p>
    </div>
  );
}

/* ---------------------------- Polo embroidery ----------------------------- */

export function PoloEmbroidery({ candidate }: { candidate: CandidateId }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[
        { label: "On navy polo", fabric: "#132038", thread: "reversed" as const },
        { label: "On light polo", fabric: "#e7ebf2", thread: "color" as const },
      ].map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-3 rounded-xl border border-border p-6"
          style={{ backgroundColor: item.fabric }}
        >
          {/* stitched patch */}
          <div className="drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
            <span className="block h-16 w-16 [filter:contrast(1.05)]">
              <LogoArt
                candidate={candidate}
                layout="icon"
                mode={item.thread}
                title="Embroidery simulation"
                className="h-16 w-16"
              />
            </span>
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: item.thread === "reversed" ? "#cdd7e6" : "#3a475c" }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- One-color signage ---------------------------- */

export function SignageOneColor({ candidate }: { candidate: CandidateId }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-8">
        <LogoArt candidate={candidate} layout="horizontal" mode="mono" title="One-color vinyl" className="h-9 w-auto" />
        <span className="text-xs font-medium text-slate-500">Navy vinyl on white</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-[#0B1320] p-8">
        <LogoArt candidate={candidate} layout="horizontal" mode="mono-reversed" className="h-9 w-auto" />
        <span className="text-xs font-medium text-slate-400">White vinyl on navy</span>
      </div>
    </div>
  );
}
