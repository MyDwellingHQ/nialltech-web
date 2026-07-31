import type { BrandAsset } from "@/data/brand-assets";
import { DownloadButton } from "@/components/brand/DownloadButton";
import { cn } from "@/lib/utils";

const backgroundLabels: Record<BrandAsset["background"], string> = {
  light: "Best on light",
  dark: "Best on dark",
  transparent: "Transparent",
  any: "Any background",
};

type BrandAssetCardProps = {
  asset: BrandAsset;
};

export function BrandAssetCard({ asset }: BrandAssetCardProps) {
  const previewBg =
    asset.background === "dark"
      ? "bg-[#0B1320]"
      : asset.background === "transparent"
        ? "bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[length:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] dark:bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] dark:bg-[length:16px_16px]"
        : "bg-white dark:bg-slate-100";

  const previewSrc = asset.preview || asset.path;
  const isRasterPreview =
    previewSrc.endsWith(".png") ||
    previewSrc.endsWith(".jpg") ||
    previewSrc.endsWith(".ico");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div
        className={cn(
          "flex h-36 items-center justify-center px-6 py-5 sm:h-40",
          previewBg,
        )}
      >
        {asset.format === "ZIP" || asset.format === "PDF" || asset.format === "ICO" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt=""
            className="max-h-24 max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt={`Preview of ${asset.name}`}
            className={cn(
              "max-h-24 max-w-full object-contain",
              asset.category === "social" && "max-h-28 w-full object-cover",
            )}
            loading={isRasterPreview ? "lazy" : "eager"}
            decoding="async"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
            {asset.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {asset.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted/70">
              Format
            </dt>
            <dd className="mt-0.5 text-foreground">{asset.format}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-muted/70">
              Size
            </dt>
            <dd className="mt-0.5 text-foreground">
              {asset.dimensions || "—"}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold uppercase tracking-wide text-muted/70">
              Background
            </dt>
            <dd className="mt-0.5 text-foreground">
              {backgroundLabels[asset.background]}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold uppercase tracking-wide text-muted/70">
              Recommended
            </dt>
            <dd className="mt-0.5 text-foreground">{asset.recommendedUse}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-1">
          <DownloadButton
            href={asset.path}
            label={`Download ${asset.name}`}
            filename={asset.path.split("/").pop()}
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
