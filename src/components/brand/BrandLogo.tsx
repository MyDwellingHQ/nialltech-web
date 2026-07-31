import { cn } from "@/lib/utils";
import {
  NIALL_MARK_PATHS,
  NIALL_MARK_VIEWBOX,
} from "@/brand/niall-mark-geometry";

export type BrandLogoVariant = "icon" | "horizontal" | "stacked" | "wordmark";
export type BrandLogoTheme = "light" | "dark" | "monochrome";
export type BrandLogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<BrandLogoSize, { icon: string; horizontal: string; stacked: string; wordmark: string }> = {
  sm: {
    icon: "h-7 w-7",
    horizontal: "h-6 w-auto",
    stacked: "h-14 w-auto",
    wordmark: "h-5 w-auto",
  },
  md: {
    icon: "h-9 w-9",
    horizontal: "h-8 w-auto",
    stacked: "h-20 w-auto",
    wordmark: "h-6 w-auto",
  },
  lg: {
    icon: "h-12 w-12",
    horizontal: "h-10 w-auto",
    stacked: "h-28 w-auto",
    wordmark: "h-8 w-auto",
  },
  xl: {
    icon: "h-16 w-16",
    horizontal: "h-14 w-auto",
    stacked: "h-36 w-auto",
    wordmark: "h-10 w-auto",
  },
};

function resolveSrc(
  variant: BrandLogoVariant,
  theme: BrandLogoTheme,
  showTagline: boolean,
): string {
  if (variant === "icon") {
    if (theme === "light") return "/brand/svg/niall-tech-icon-light.svg";
    if (theme === "monochrome") return "/brand/svg/niall-tech-embroidery.svg";
    return "/brand/svg/niall-tech-icon.svg";
  }

  if (variant === "wordmark") {
    return "/brand/svg/niall-tech-wordmark.svg";
  }

  if (variant === "stacked") {
    if (theme === "light") return "/brand/svg/niall-tech-stacked-light.svg";
    if (theme === "monochrome") return "/brand/svg/niall-tech-one-color-black.svg";
    return "/brand/svg/niall-tech-stacked.svg";
  }

  // horizontal
  if (showTagline) return "/brand/svg/niall-tech-horizontal-tagline.svg";
  if (theme === "light") return "/brand/svg/niall-tech-horizontal-light.svg";
  if (theme === "monochrome") return "/brand/svg/niall-tech-one-color-black.svg";
  return "/brand/svg/niall-tech-horizontal.svg";
}

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  theme?: BrandLogoTheme;
  showTagline?: boolean;
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function BrandLogo({
  variant = "horizontal",
  theme = "dark",
  showTagline = false,
  size = "md",
  className,
  priority = false,
  alt = "Niall Tech",
}: BrandLogoProps) {
  const src = resolveSrc(variant, theme, showTagline);
  const sizeClass = sizeMap[size][variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVGs need crisp vector rendering without Image optimizer quirks
    <img
      src={src}
      alt={alt}
      className={cn(sizeClass, className)}
      width={variant === "icon" ? 100 : variant === "stacked" ? 280 : 420}
      height={variant === "icon" ? 100 : variant === "stacked" ? 160 : 100}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

/** Inline SVG mark for header/footer — avoids flash and theme mismatch. */
export function BrandMark({
  className,
  theme = "color",
}: {
  className?: string;
  theme?: "color" | "white";
}) {
  const primary = theme === "white" ? "#FFFFFF" : "#0B1320";
  const accent = theme === "white" ? "#FFFFFF" : "#146BFF";

  return (
    <svg
      viewBox={NIALL_MARK_VIEWBOX}
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Niall Tech"
    >
      <path d={NIALL_MARK_PATHS.main} fill={primary} />
      <path d={NIALL_MARK_PATHS.lowerLeft} fill={primary} />
      <path d={NIALL_MARK_PATHS.bluePillar} fill={accent} />
    </svg>
  );
}
