import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Coming soon
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-muted">{description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/contact">Talk to us</Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
