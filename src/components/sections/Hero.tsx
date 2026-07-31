import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandLogo";
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="animate-fade-up flex items-center gap-3">
              <BrandMark theme="white" className="h-10 w-10 sm:h-12 sm:w-12" />
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Niall Tech
              </p>
            </div>
            <h1 className="animate-fade-up animation-delay-100 mt-6 max-w-xl text-2xl font-medium leading-snug tracking-tight text-slate-100 sm:text-3xl">
              Microsoft IT consulting that keeps your business productive and
              secure.
            </h1>
            <p className="animate-fade-up animation-delay-200 mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              We help owners and operators reduce risk, cut downtime, and get
              more from Microsoft 365, Azure, identity, and endpoints—without
              the jargon.
            </p>
            <div className="animate-fade-up animation-delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Book a consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                View services
              </Button>
            </div>
            <p className="animate-fade-up animation-delay-400 mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Modern IT. Local expertise.
            </p>
          </div>

          <div
            className="animate-fade-up animation-delay-200 relative hidden min-h-[300px] lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#146BFF]/25 via-transparent to-[#22C1FF]/10" />
            <div className="absolute inset-6 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 backdrop-blur-sm">
              <div className="relative flex h-full flex-col justify-between p-8">
                <p className="text-sm font-medium tracking-wide text-sky-100">
                  Built for business owners
                </p>
                <div>
                  <p className="font-display text-3xl font-semibold tracking-tight text-white">
                    Less downtime.
                    <br />
                    Less risk.
                    <br />
                    Clearer IT decisions.
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
