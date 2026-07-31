import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-soft",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
