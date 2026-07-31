import type { BrandAsset } from "@/data/brand-assets";
import { BrandAssetCard } from "@/components/brand/BrandAssetCard";

type BrandAssetGridProps = {
  assets: BrandAsset[];
  columns?: 2 | 3;
};

export function BrandAssetGrid({ assets, columns = 3 }: BrandAssetGridProps) {
  return (
    <div
      className={
        columns === 2
          ? "grid gap-5 sm:grid-cols-2"
          : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {assets.map((asset) => (
        <BrandAssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
