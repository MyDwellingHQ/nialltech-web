import Image from "next/image";
import { cn } from "@/lib/utils";
import { founderPhoto } from "@/lib/brand";
import { isFounderPhotoAvailable } from "@/lib/founder-photo-available";

type FounderPhotoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Compact avatar-style presentation for sidebars */
  compact?: boolean;
};

export function FounderPhoto({
  className,
  priority = false,
  sizes = "(max-width: 768px) 280px, 360px",
  compact = false,
}: FounderPhotoProps) {
  const hasPhoto = isFounderPhotoAvailable();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[linear-gradient(160deg,var(--brand-navy),var(--brand-blue))] shadow-soft",
        compact ? "aspect-square" : "aspect-[4/5] w-full",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={founderPhoto.path}
          alt={founderPhoto.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-[center_18%]"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-center text-[var(--brand-reversed)]",
            compact ? "gap-0 p-2" : "gap-3 px-6",
          )}
          role="img"
          aria-label={`${founderPhoto.alt} (photo pending)`}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full border border-white/25 bg-white/10 font-display font-semibold tracking-tight",
              compact ? "h-10 w-10 text-sm" : "h-20 w-20 text-2xl",
            )}
            aria-hidden
          >
            PD
          </span>
          {!compact ? (
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                {founderPhoto.name}
              </p>
              <p className="mt-1 text-sm text-slate-200">{founderPhoto.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Approved headshot pending — add{" "}
                <span className="font-medium text-white">
                  public/images/paul-dent.jpg
                </span>
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
