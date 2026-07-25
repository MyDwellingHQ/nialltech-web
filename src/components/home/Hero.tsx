import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="noise absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 60% 40%, black 10%, transparent 70%)",
        }}
      />

      <Container className="relative flex min-h-[calc(100svh-4.25rem)] flex-col justify-center py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Niall Tech
            </p>
            <h1 className="animate-fade-up animation-delay-100 mt-5 max-w-xl text-2xl font-medium leading-snug tracking-tight text-slate-100 sm:text-3xl">
              Practical IT expertise for Kitsap County organizations.
            </h1>
            <p className="animate-fade-up animation-delay-200 mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Founder-led Microsoft cloud, cybersecurity, and infrastructure
              consulting from Bremerton—clear guidance, reliable delivery, and
              direct access to the engineer doing the work.
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
          </div>

          <div
            className="animate-fade-up animation-delay-200 relative hidden min-h-[320px] lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-transparent" />
            <div className="animate-float-soft absolute inset-6 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_40%,rgba(14,165,233,0.18))]" />
              <div className="relative flex h-full flex-col justify-between p-8">
                <div className="flex items-center gap-3 text-sky-100">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-medium tracking-wide">
                    Secure by design
                  </span>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-tight text-white">
                    Identity. Endpoints. Cloud.
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                    Architecture and operations aligned to Microsoft 365, Azure,
                    Entra ID, and Intune.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["M365", "Azure", "Intune"].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-semibold tracking-[0.14em] text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
