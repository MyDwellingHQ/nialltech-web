import { ELECTRIC_BLUE } from "./logo-geometry";

export type WordmarkVariant = "clean" | "reference";

/**
 * Live-text wordmark lockup for the review page.
 *
 * NIALL: weight 650, uppercase, tracking 0.24em.
 * TECH:  weight 500, uppercase, tracking 0.32em, Electric Blue.
 *
 * The "reference" variant adds the restrained horizontal blue rules around
 * TECH shown on the brand board. The "clean" variant is the primary
 * recommendation.
 */
export function ReconstructedWordmark({
  variant = "clean",
  theme = "light",
  className,
}: {
  variant?: WordmarkVariant;
  theme?: "light" | "dark";
  className?: string;
}) {
  const niallColor = theme === "dark" ? "#FFFFFF" : "#0B1320";

  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-inter-recon), Inter, system-ui, sans-serif",
        display: "inline-flex",
        flexDirection: "column",
        lineHeight: 1,
      }}
    >
      <span
        style={{
          fontWeight: 650,
          textTransform: "uppercase",
          letterSpacing: "0.24em",
          color: niallColor,
          fontSize: "2.5rem",
        }}
      >
        Niall
      </span>
      <span
        style={{
          marginTop: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
          alignSelf: variant === "reference" ? "center" : "flex-start",
          gap: variant === "reference" ? "0.5rem" : undefined,
        }}
      >
        {variant === "reference" ? <BlueRule /> : null}
        <span
          style={{
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            color: ELECTRIC_BLUE,
            fontSize: "1.05rem",
          }}
        >
          Tech
        </span>
        {variant === "reference" ? <BlueRule /> : null}
      </span>
    </span>
  );
}

/** Restrained blue rule: thickness 2 units, length 22 units (scaled to em). */
function BlueRule() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: "1.375rem", // ~22 units relative to the TECH cap height
        height: "2px",
        backgroundColor: ELECTRIC_BLUE,
      }}
    />
  );
}
