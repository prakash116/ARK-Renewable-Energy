import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const HEADLINE = "Engineering a Cleaner Energy Future.";
const proofs = ["Site-engineered systems", "End-to-end delivery", "Service that lasts"];

/**
 * Hero copy with CSS-driven entrance animation. Server-rendered and animated
 * from first paint, so the LCP text never waits for hydration.
 */
export function HeroCopy() {
  const words = HEADLINE.split(" ");
  return (
    <div className="max-w-2xl">
      <div className="animate-hero-fade">
        <Eyebrow className="text-fg-muted">ARK Renewable Energy</Eyebrow>
      </div>

      {/* The headline is the LCP element, so its animation starts immediately
          and each word settles quickly; only later blocks are staggered. */}
      <h1 id="hero-title" className="text-display mt-5 text-fg">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="inline-block animate-hero-rise" style={{ animationDelay: `${i * 40}ms` }}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </h1>

      <p className="text-lead animate-hero-fade mt-6 max-w-xl text-fg-muted" style={{ animationDelay: "260ms" }}>
        Smart solar and renewable-energy solutions built for homes, businesses, agriculture and
        large-scale infrastructure.
      </p>

      <div className="animate-hero-fade mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ animationDelay: "360ms" }}>
        <Button href="/solutions" variant="lime" size="lg" icon="arrow" className="xs:w-auto">
          Explore Solutions
        </Button>
        <Button href="/contact?intent=project" variant="outline" size="lg" className="xs:w-auto">
          Start a Project
        </Button>
      </div>

      <ul className="animate-hero-fade mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted" style={{ animationDelay: "480ms" }}>
        {proofs.map((p) => (
          <li key={p} className="inline-flex items-center gap-2">
            <Check aria-hidden className="size-4 text-lime" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
