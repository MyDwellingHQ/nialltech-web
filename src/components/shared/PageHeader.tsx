import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden border-b border-border", className)}>
      <div className="absolute inset-0 bg-hero-glow opacity-95" />
      <div className="noise absolute inset-0" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-on-hero-muted">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-on-hero sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-hero-subtle sm:text-lg">
          {description}
        </p>
      </Container>
    </div>
  );
}
