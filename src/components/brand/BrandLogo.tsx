import { cn } from "@/lib/utils";
import {
  CSS_VARS,
  NIALL_MARK_PATHS,
  NIALL_MARK_VIEWBOX,
} from "@/brand/niall-mark-geometry";

export type BrandLogoVariant = "icon" | "horizontal" | "stacked" | "wordmark";
/** Logo fill theme: dark = navy lockup for light surfaces; light = reverse for dark surfaces. */
export type BrandLogoTheme = "light" | "dark" | "monochrome" | "auto";
export type BrandLogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<
  BrandLogoSize,
  { icon: string; horizontal: string; stacked: string; wordmark: string }
> = {
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

const intrinsicSize: Record<
  BrandLogoVariant,
  { width: number; height: number }
> = {
  icon: { width: 100, height: 100 },
  horizontal: { width: 420, height: 100 },
  stacked: { width: 280, height: 160 },
  wordmark: { width: 420, height: 100 },
};

function resolveSrc(
  variant: BrandLogoVariant,
  theme: Exclude<BrandLogoTheme, "auto">,
  showTagline: boolean,
): string {
  if (variant === "icon") {
    if (theme === "light") return "/brand/svg/niall-tech-icon-light.svg";
    if (theme === "monochrome") return "/brand/svg/niall-tech-embroidery.svg";
    return "/brand/svg/niall-tech-icon-dark.svg";
  }

  if (variant === "wordmark") {
    return "/brand/svg/niall-tech-wordmark.svg";
  }

  if (variant === "stacked") {
    if (theme === "light") return "/brand/svg/niall-tech-stacked-light.svg";
    if (theme === "monochrome") return "/brand/svg/niall-tech-one-color-black.svg";
    return "/brand/svg/niall-tech-stacked-dark.svg";
  }

  // horizontal — primary digital lockup (headers, docs)
  if (showTagline) return "/brand/svg/niall-tech-horizontal-tagline.svg";
  if (theme === "light") return "/brand/svg/niall-tech-horizontal-light.svg";
  if (theme === "monochrome") return "/brand/svg/niall-tech-one-color-black.svg";
  return "/brand/svg/niall-tech-horizontal-dark.svg";
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

function LogoImage({
  src,
  alt,
  variant,
  sizeClass,
  className,
  priority,
}: {
  src: string;
  alt: string;
  variant: BrandLogoVariant;
  sizeClass: string;
  className?: string;
  priority?: boolean;
}) {
  const { width, height } = intrinsicSize[variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVGs need crisp vector rendering without Image optimizer quirks
    <img
      src={src}
      alt={alt}
      className={cn(sizeClass, className)}
      width={width}
      height={height}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

export function BrandLogo({
  variant = "horizontal",
  theme = "dark",
  showTagline = false,
  size = "md",
  className,
  priority = false,
  alt = "Niall Tech",
}: BrandLogoProps) {
  const sizeClass = sizeMap[size][variant];

  if (theme === "auto") {
    const darkOnLight = resolveSrc(variant, "dark", showTagline);
    const lightOnDark = resolveSrc(variant, "light", showTagline);

    return (
      <span className="inline-flex items-center" role="img" aria-label={alt}>
        <LogoImage
          src={darkOnLight}
          alt=""
          variant={variant}
          sizeClass={sizeClass}
          className={cn("dark:hidden", className)}
          priority={priority}
        />
        <LogoImage
          src={lightOnDark}
          alt=""
          variant={variant}
          sizeClass={sizeClass}
          className={cn("hidden dark:block", className)}
          priority={priority}
        />
      </span>
    );
  }

  return (
    <LogoImage
      src={resolveSrc(variant, theme, showTagline)}
      alt={alt}
      variant={variant}
      sizeClass={sizeClass}
      className={className}
      priority={priority}
    />
  );
}

/** Inline SVG mark for chrome — theme="auto" follows site light/dark via CSS vars. */
export function BrandMark({
  className,
  theme = "auto",
}: {
  className?: string;
  theme?: "auto" | "color" | "white";
}) {
  const primary =
    theme === "white"
      ? "#FFFFFF"
      : theme === "color"
        ? "#0B1320"
        : `var(${CSS_VARS.primary})`;
  const accent =
    theme === "white"
      ? "#FFFFFF"
      : theme === "color"
        ? "#146BFF"
        : `var(${CSS_VARS.blue})`;

  return (
    <svg
      viewBox={NIALL_MARK_VIEWBOX}
      className={cn("h-9 w-9 shrink-0", className)}
      role="img"
      aria-label="Niall Tech"
    >
      <path d={NIALL_MARK_PATHS.main} fill={primary} />
      <path d={NIALL_MARK_PATHS.lowerLeft} fill={primary} />
      <path d={NIALL_MARK_PATHS.bluePillar} fill={accent} />
    </svg>
  );
}
