import { COLORS, getThemeColors, type MarkTheme } from "@/brand/niall-mark-geometry";

export type WordmarkVariant = "clean" | "reference";

const FONT_STACK =
  "var(--font-inter-recon), var(--font-sans), Inter, system-ui, sans-serif";

/**
 * NIALL / TECH wordmark as a self-contained, scalable SVG using live Inter text
 * (no outlining at render time, no images). Typography follows spec §12:
 *   NIALL  font-size 35, weight 600, tracking 8
 *   TECH   font-size 19, weight 600, tracking 6, electric blue
 * The "reference" variant adds the restrained blue horizontal rules around TECH
 * (rule thickness 2, length 22, gap 8 to the TECH text). "clean" is the
 * primary recommendation.
 */
export function ReconstructedWordmark({
  variant = "clean",
  theme = "light",
  title = "Niall Tech",
  className,
}: {
  variant?: WordmarkVariant;
  theme?: MarkTheme;
  title?: string;
  className?: string;
}) {
  const { primary } = getThemeColors(theme);
  const blue = theme === "monochrome" ? "currentColor" : COLORS.electricBlue;

  const centerX = 130;
  const techHalfWidth = 34; // approximate half-width of "TECH" at fs19 / ls6
  const ruleLength = 22;
  const ruleGap = 8;
  const ruleY = 83;

  return (
    <svg
      viewBox="0 0 260 116"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={FONT_STACK}
    >
      <title>{title}</title>
      <text
        x={centerX}
        y={52}
        textAnchor="middle"
        fontSize={35}
        fontWeight={600}
        letterSpacing={8}
        fill={primary}
      >
        NIALL
      </text>
      <text
        x={centerX}
        y={92}
        textAnchor="middle"
        fontSize={19}
        fontWeight={600}
        letterSpacing={6}
        fill={blue}
      >
        TECH
      </text>
      {variant === "reference" ? (
        <>
          <rect
            x={centerX - techHalfWidth - ruleGap - ruleLength}
            y={ruleY}
            width={ruleLength}
            height={2}
            fill={blue}
          />
          <rect
            x={centerX + techHalfWidth + ruleGap}
            y={ruleY}
            width={ruleLength}
            height={2}
            fill={blue}
          />
        </>
      ) : null}
    </svg>
  );
}

export default ReconstructedWordmark;
