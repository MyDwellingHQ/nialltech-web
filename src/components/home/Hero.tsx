import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InfrastructureVisual } from "@/components/home/InfrastructureVisual";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-28 pt-4 sm:pb-32 sm:pt-6">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="noise absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 70% 40%, black 15%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#146BFF]/20 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-20 h-56 w-56 rounded-full bg-[#22C1FF]/12 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div className="max-w-xl">
            <p className="animate-fade-up text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#22C1FF] sm:text-xs">
              Microsoft · Security · Infrastructure
            </p>
            <h1 className="animate-fade-up animation-delay-100 mt-4 font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-on-hero sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              Modern IT, built around your business.
            </h1>
            <p className="animate-fade-up animation-delay-200 mt-5 max-w-lg text-base leading-relaxed text-on-hero-muted sm:text-lg">
              Niall Tech helps small organizations modernize Microsoft 365,
              identity, endpoints, security, networking, and cloud infrastructure
              with clear guidance and reliable delivery.
            </p>
            <div className="animate-fade-up animation-delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </div>
            <p className="animate-fade-up animation-delay-400 mt-6 text-sm leading-relaxed text-on-hero-subtle">
              Serving Bremerton, Kitsap County, and organizations across the
              Pacific Northwest.
            </p>
          </div>

          <div className="animate-fade-up animation-delay-200 relative">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#146BFF]/25 via-transparent to-[#22C1FF]/10 blur-sm"
              aria-hidden
            />
            <InfrastructureVisual className="relative border border-on-hero-border bg-[#0B1320]/35 shadow-soft backdrop-blur-[2px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
