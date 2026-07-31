import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type DownloadButtonProps = {
  href: string;
  label: string;
  filename?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
  iconOnly?: boolean;
};

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 focus-visible:ring-primary",
  outline:
    "bg-transparent text-foreground ring-1 ring-border hover:bg-primary-soft focus-visible:ring-primary",
  ghost:
    "bg-transparent text-foreground hover:bg-primary-soft focus-visible:ring-primary",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

export function DownloadButton({
  href,
  label,
  filename,
  variant = "outline",
  size = "sm",
  className,
  iconOnly = false,
}: DownloadButtonProps) {
  return (
    <a
      href={href}
      download={filename || true}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        sizes[size],
        iconOnly && "w-9 px-0",
        className,
      )}
      aria-label={label}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      {!iconOnly ? <span>{label}</span> : null}
    </a>
  );
}
