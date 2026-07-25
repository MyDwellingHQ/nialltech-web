import { cn } from "@/lib/utils";
import { NiallTechMarkIcon } from "@/components/brand/niall-tech-mark-icon";

export type SiteLogoVariant = "horizontal" | "stacked" | "mark";
export type SiteLogoTheme = "default" | "reversed" | "monochrome";

type SiteLogoProps = {
  variant?: SiteLogoVariant;
  theme?: SiteLogoTheme;
  /** Mark height in pixels for horizontal/mark; stacked uses this for the mark only */
  size?: number;
  className?: string;
  /** Reserved for Image-based variants; accepted for API compatibility */
  priority?: boolean;
  /**
   * When true, the mark is decorative and the visible wordmark (or adjacent
   * accessible name on a parent link) provides the business name.
   */
  decorative?: boolean;
  showWordmark?: boolean;
};

const themeClass: Record<SiteLogoTheme, string> = {
  default: "text-[var(--brand-navy)] dark:text-[var(--brand-reversed)]",
  reversed: "text-[var(--brand-reversed)]",
  monochrome: "text-current",
};

export function SiteLogo({
  variant = "horizontal",
  theme = "default",
  size = 36,
  className,
  decorative,
  showWordmark,
}: SiteLogoProps) {
  // `priority` is accepted for API compatibility with Image-based call sites.
  const isMarkOnly = variant === "mark";
  const includeWordmark = showWordmark ?? !isMarkOnly;
  const markIsDecorative = decorative ?? includeWordmark;

  const mark = (
    <NiallTechMarkIcon
      decorative={markIsDecorative}
      title="Niall Tech"
      className="h-full w-full"
    />
  );

  if (variant === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-center gap-2",
          themeClass[theme],
          className,
        )}
      >
        <span
          className="block shrink-0"
          style={{ width: size, height: size }}
        >
          {mark}
        </span>
        {includeWordmark ? (
          <span className="text-center font-display text-[0.95em] font-semibold leading-tight tracking-tight">
            <span className="block">Niall</span>
            <span className="block">Tech</span>
          </span>
        ) : null}
      </span>
    );
  }

  if (isMarkOnly) {
    return (
      <span
        className={cn("inline-flex shrink-0", themeClass[theme], className)}
        style={{ width: size, height: size }}
      >
        {mark}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        themeClass[theme],
        className,
      )}
    >
      <span className="block shrink-0" style={{ width: size, height: size }}>
        {mark}
      </span>
      {includeWordmark ? (
        <span
          className="font-display font-semibold tracking-tight"
          style={{ fontSize: Math.max(14, Math.round(size * 0.5)) }}
        >
          Niall Tech
        </span>
      ) : null}
    </span>
  );
}
