"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import { LogoArt, downloadMatrix, type CandidateId } from "@/lib/logo-lab";
import { downloadSvgElement } from "./download-svg";

export function CandidateDownloads({ candidate }: { candidate: CandidateId }) {
  const refs = useRef<Record<string, SVGSVGElement | null>>({});

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {downloadMatrix.map((spec) => (
          <button
            key={spec.key}
            type="button"
            onClick={() =>
              downloadSvgElement(refs.current[spec.key], spec.filename(candidate))
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            {spec.label}
          </button>
        ))}
      </div>

      {/* Hidden master sources — serialized on download */}
      <div className="sr-only" aria-hidden>
        {downloadMatrix.map((spec) => (
          <LogoArt
            key={spec.key}
            candidate={candidate}
            layout={spec.layout}
            mode={spec.mode}
            title={`Niall Tech ${candidate.toUpperCase()} ${spec.label}`}
            ref={(el: SVGSVGElement | null) => {
              refs.current[spec.key] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
