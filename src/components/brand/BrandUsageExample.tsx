import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

type BrandUsageExampleProps = {
  title: string;
  description: string;
  variant: "ok-light" | "ok-dark" | "incorrect";
  incorrectId?: string;
};

export function BrandUsageExample({
  title,
  description,
  variant,
  incorrectId,
}: BrandUsageExampleProps) {
  const isDark = variant === "ok-dark";
  const isIncorrect = variant === "incorrect";

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={cn(
          "relative flex h-36 items-center justify-center px-6",
          isDark ? "bg-[#0B1320]" : "bg-white dark:bg-slate-100",
          isIncorrect && "bg-[#f8fafc] dark:bg-slate-200",
        )}
      >
        {isIncorrect ? (
          <IncorrectPreview id={incorrectId || "stretch"} />
        ) : (
          <BrandLogo
            variant="horizontal"
            theme={isDark ? "light" : "dark"}
            size="md"
            className="max-w-[85%]"
          />
        )}
        {isIncorrect ? (
          <span
            className="absolute right-3 top-3 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            aria-hidden
          >
            Avoid
          </span>
        ) : (
          <span
            className={cn(
              "absolute right-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              isDark
                ? "bg-white/15 text-white"
                : "bg-emerald-600 text-white",
            )}
            aria-hidden
          >
            Approved
          </span>
        )}
      </div>
      <figcaption className="space-y-1 p-4">
        <p className="font-display text-sm font-semibold tracking-tight">
          {title}
        </p>
        <p className="text-sm text-muted">{description}</p>
      </figcaption>
    </figure>
  );
}

function IncorrectPreview({ id }: { id: string }) {
  if (id === "stretch") {
    return (
      <BrandLogo
        variant="horizontal"
        theme="dark"
        size="md"
        className="max-w-[90%] scale-y-150"
        alt=""
      />
    );
  }
  if (id === "rotate") {
    return (
      <BrandLogo
        variant="icon"
        theme="dark"
        size="lg"
        className="rotate-12"
        alt=""
      />
    );
  }
  if (id === "recolor") {
    return (
      <div className="opacity-90 [filter:hue-rotate(90deg)_saturate(1.4)]">
        <BrandLogo variant="horizontal" theme="dark" size="md" alt="" />
      </div>
    );
  }
  if (id === "shadow") {
    return (
      <BrandLogo
        variant="horizontal"
        theme="dark"
        size="md"
        className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
        alt=""
      />
    );
  }
  if (id === "contrast") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1a2333]">
        <BrandLogo variant="horizontal" theme="dark" size="md" alt="" />
      </div>
    );
  }
  // spacing
  return (
    <div className="flex items-center gap-0">
      <BrandLogo variant="icon" theme="dark" size="md" alt="" />
      <BrandLogo variant="wordmark" theme="dark" size="sm" className="-ml-2" alt="" />
    </div>
  );
}
