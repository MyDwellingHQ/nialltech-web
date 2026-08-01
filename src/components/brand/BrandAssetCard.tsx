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
  const isBusinessCard = asset.category === "business-card";
  const previewBg = isBusinessCard
    ? // Mid-tone well so full-bleed navy card art stays edge-visible.
      "bg-[#cbd5e1] dark:bg-[#334155]"
    : asset.background === "dark"
      ? "bg-[#0B1320]"
      : asset.background === "transparent"
        ? "bg-[linear-gradient(45deg,var(--border)_25%,transparent_25%),linear-gradient(-45deg,var(--border)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,var(--border)_75%),linear-gradient(-45deg,transparent_75%,var(--border)_75%)] bg-[length:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0]"
        : "bg-preview-light";

  const previewSrc = asset.preview || asset.path;
  const isRasterPreview =
    previewSrc.split("?")[0].endsWith(".png") ||
    previewSrc.split("?")[0].endsWith(".jpg") ||
    previewSrc.split("?")[0].endsWith(".ico");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div
        className={cn(
          "flex items-center justify-center px-6 py-5",
          isBusinessCard ? "h-44 sm:h-48" : "h-36 sm:h-40",
          previewBg,
        )}
      >
        {asset.format === "ZIP" || asset.format === "PDF" || asset.format === "ICO" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt=""
            className={cn(
              "max-w-full object-contain",
              isBusinessCard ? "max-h-36 w-auto shadow-sm" : "max-h-24",
            )}
            loading="lazy"
            decoding="async"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt={`Preview of ${asset.name}`}
            className={cn(
              "max-w-full object-contain",
              isBusinessCard
                ? "max-h-36 w-auto shadow-sm"
                : "max-h-24",
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
