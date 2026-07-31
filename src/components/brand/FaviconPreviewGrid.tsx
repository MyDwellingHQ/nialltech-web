import { DownloadButton } from "@/components/brand/DownloadButton";

/**
 * Dedicated favicon / app-icon preview grid for the /brand hub.
 * Renders each icon at its TRUE pixel size plus realistic browser-tab,
 * iPhone home-screen, and Android launcher simulations so partners can see
 * exactly how the mark reads at small sizes and on device.
 * All previews reference the same generated files listed in the registry.
 */

const FAVICON = "/brand/favicon";

type IconSpec = {
  label: string;
  size: number; // rendered px (true size)
  src: string;
  file: string;
  note: string;
};

const trueSizeIcons: IconSpec[] = [
  {
    label: "16px",
    size: 16,
    src: `${FAVICON}/favicon-16x16.png`,
    file: "favicon-16x16.png",
    note: "Browser tab",
  },
  {
    label: "32px",
    size: 32,
    src: `${FAVICON}/favicon-32x32.png`,
    file: "favicon-32x32.png",
    note: "Taskbar / shortcut",
  },
  {
    label: "48px",
    size: 48,
    src: `${FAVICON}/favicon-48x48.png`,
    file: "favicon-48x48.png",
    note: "Windows site tile",
  },
  {
    label: "180px",
    size: 64,
    src: `${FAVICON}/apple-touch-icon.png`,
    file: "apple-touch-icon.png",
    note: "Apple touch icon",
  },
  {
    label: "192px",
    size: 64,
    src: `${FAVICON}/android-chrome-192x192.png`,
    file: "android-chrome-192x192.png",
    note: "Android 192",
  },
  {
    label: "512px",
    size: 64,
    src: `${FAVICON}/android-chrome-512x512.png`,
    file: "android-chrome-512x512.png",
    note: "Android 512 / PWA",
  },
];

export function FaviconPreviewGrid() {
  return (
    <div className="flex flex-col gap-8">
      {/* True-size icon row */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
          Actual pixel sizes
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Each icon rendered at (or near) its true size. The mark stays legible
          down to 16px because the folded beam keeps a single clear counter.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {trueSizeIcons.map((icon) => (
            <li
              key={icon.file}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-4 dark:bg-slate-100"
            >
              <div className="flex h-20 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.src || "/placeholder.svg"}
                  alt={`Niall Tech icon at ${icon.label}`}
                  width={icon.size}
                  height={icon.size}
                  style={{ width: icon.size, height: icon.size }}
                  className="[image-rendering:auto]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="text-center">
                <p className="font-display text-sm font-semibold text-slate-900">
                  {icon.label}
                </p>
                <p className="text-xs text-slate-500">{icon.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Device simulations */}
      <div className="grid gap-6 md:grid-cols-3">
        <BrowserTabSim />
        <IPhoneHomeSim />
        <AndroidLauncherSim />
      </div>

      {/* Quick downloads for the raw icon files */}
      <div className="flex flex-wrap gap-3">
        <DownloadButton
          href={`${FAVICON}/favicon.ico`}
          label="Download favicon.ico"
          filename="favicon.ico"
        />
        <DownloadButton
          href={`${FAVICON}/favicon.svg`}
          label="Download favicon.svg"
          filename="favicon.svg"
        />
        <DownloadButton
          href={`${FAVICON}/site.webmanifest`}
          label="Download site.webmanifest"
          filename="site.webmanifest"
        />
      </div>
    </div>
  );
}

function SimCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
      <p className="border-t border-border px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </p>
    </div>
  );
}

function BrowserTabSim() {
  return (
    <SimCard title="Browser tab">
      <div className="w-full max-w-[260px]">
        {/* window bar */}
        <div className="flex items-center gap-1.5 rounded-t-lg bg-slate-200 px-3 pt-3 pb-0 dark:bg-slate-700">
          {/* active tab */}
          <div className="flex min-w-0 items-center gap-2 rounded-t-md bg-white px-3 py-2 dark:bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon/favicon-16x16.png"
              alt="Niall Tech tab icon"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0"
              loading="lazy"
            />
            <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
              Niall Tech
            </span>
            <span className="ml-1 text-slate-400" aria-hidden="true">
              ×
            </span>
          </div>
          <div className="hidden items-center gap-2 rounded-t-md px-3 py-2 sm:flex">
            <span className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="text-xs text-slate-400">New tab</span>
          </div>
        </div>
        {/* address bar */}
        <div className="rounded-b-lg bg-white px-3 py-2 dark:bg-slate-900">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
            <span className="h-3 w-3 rounded-full border border-slate-400" aria-hidden="true" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              nialltech.com
            </span>
          </div>
        </div>
      </div>
    </SimCard>
  );
}

function IPhoneHomeSim() {
  return (
    <SimCard title="iPhone home screen">
      <div className="flex w-full max-w-[220px] flex-col items-center rounded-[2rem] bg-gradient-to-b from-slate-700 to-slate-900 p-6">
        <div className="flex flex-col items-center gap-2">
          {/* squircle app icon */}
          <div className="overflow-hidden rounded-[22%] shadow-lg ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon/apple-touch-icon.png"
              alt="Niall Tech app icon on iPhone"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
              loading="lazy"
            />
          </div>
          <span className="text-[11px] font-medium text-white/90">
            Niall Tech
          </span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="h-[34px] w-[34px] rounded-[22%] bg-white/10"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </SimCard>
  );
}

function AndroidLauncherSim() {
  return (
    <SimCard title="Android launcher">
      <div className="flex w-full max-w-[220px] flex-col items-center rounded-[2rem] bg-gradient-to-b from-emerald-900 to-slate-900 p-6">
        <div className="flex flex-col items-center gap-2">
          {/* circular masked icon */}
          <div className="overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/favicon/android-chrome-192x192.png"
              alt="Niall Tech app icon on Android"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
              loading="lazy"
            />
          </div>
          <span className="text-[11px] font-medium text-white/90">
            Niall Tech
          </span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="h-[34px] w-[34px] rounded-full bg-white/10"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </SimCard>
  );
}
