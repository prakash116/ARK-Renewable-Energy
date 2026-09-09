import { Container } from "@/components/ui/Container";
import { SolarImage } from "@/components/visuals/SolarImage";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { HeroCopy } from "./HeroCopy";

/**
 * Home hero. Mobile: copy → CTAs → static visual. Desktop: full-bleed
 * WebGL solar field (lazy, capability-gated) behind the copy.
 */
export function Hero() {
  const fallback = (
    <div className="absolute inset-0">
      <SolarImage variant="plant" tone="forest" priority className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/6 to-transparent animate-shimmer"
      />
    </div>
  );

  return (
    <section className="theme-dark relative isolate overflow-hidden bg-ink text-fg" aria-labelledby="hero-title">
      {/* Desktop full-bleed scene */}
      <div className="absolute inset-0 hidden lg:block">
        <HeroCanvas fallback={fallback} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      {/* Mobile ambient background */}
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-50 lg:hidden" />
      <div
        aria-hidden
        className="absolute -top-40 -right-32 size-[28rem] rounded-full bg-lime/10 blur-3xl lg:hidden"
      />

      <Container className="relative pt-28 pb-14 sm:pt-32 lg:flex lg:min-h-svh lg:items-center lg:pt-36 lg:pb-28">
        <div className="w-full lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-6">
            <HeroCopy />
          </div>
        </div>

        {/* Mobile / tablet visual */}
        <div className="mt-10 lg:hidden">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-media)] border border-line xs:aspect-[16/10]">
            {/* Not `priority`: below the fold on phones, where the headline is the LCP element. */}
            <SolarImage
              variant="plant"
              tone="forest"
              alt="Rows of solar panels on a plant site at dusk"
              className="absolute inset-0"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/6 to-transparent animate-shimmer"
            />
            <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="eyebrow text-fg-soft">Solutions</p>
                <p className="mt-0.5 text-sm font-semibold">Solar pumping · Rooftop · EPC · Lighting</p>
              </div>
              <span aria-hidden className="size-2 rounded-full bg-lime animate-pulse-soft" />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll cue (desktop) */}
      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="eyebrow text-fg-soft">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-line">
          <span className="block h-1/2 w-full bg-lime animate-drift" />
        </span>
      </div>
    </section>
  );
}
