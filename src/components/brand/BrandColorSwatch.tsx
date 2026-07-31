"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandColorSwatchProps = {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
};

export function BrandColorSwatch({
  name,
  hex,
  rgb,
  usage,
}: BrandColorSwatchProps) {
  const [copied, setCopied] = useState<"hex" | "rgb" | null>(null);

  async function copy(value: string, kind: "hex" | "rgb") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div
        className={cn(
          "h-28 sm:h-32",
          (hex.toUpperCase() === "#FFFFFF" || hex.toUpperCase() === "#E5E7EB") &&
            "border-b border-border",
        )}
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={`${name} color swatch ${hex}`}
      />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight">
            {name}
          </h3>
          <p className="mt-1 text-sm text-muted">{usage}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyChip
            label={hex}
            ariaLabel={`Copy ${name} HEX ${hex}`}
            onClick={() => copy(hex, "hex")}
            active={copied === "hex"}
          />
          <CopyChip
            label={`RGB ${rgb}`}
            ariaLabel={`Copy ${name} RGB ${rgb}`}
            onClick={() => copy(rgb, "rgb")}
            active={copied === "rgb"}
          />
        </div>
      </div>
    </article>
  );
}

function CopyChip({
  label,
  ariaLabel,
  onClick,
  active,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {active ? (
        <Check className="h-3.5 w-3.5 text-success" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted" aria-hidden />
      )}
      <span>{active ? "Copied" : label}</span>
    </button>
  );
}
