import { cn } from "@/lib/utils";

type NiallTechMarkIconProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

/**
 * Inline NT monogram. Uses currentColor for theming.
 * Keep geometry in sync with public/brand/niall-tech-mark.svg.
 */
export function NiallTechMarkIcon({
  className,
  title = "Niall Tech mark",
  decorative = false,
}: NiallTechMarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      className={cn("block", className)}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      {!decorative ? <title>{title}</title> : null}
      <rect x="11" y="13" width="10" height="38" rx="2" />
      <path d="M21 13h11l16 26v12H37L21 26V13z" />
      <rect x="42" y="13" width="10" height="38" rx="2" />
      <rect x="36" y="13" width="18" height="10" rx="2" />
    </svg>
  );
}
