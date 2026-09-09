import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SolarImage } from "@/components/visuals/SolarImage";
import type { VisualVariant } from "@/types/content";

interface FinalCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: VisualVariant;
}

export function FinalCta({
  eyebrow = "Start a conversation",
  title = "Let’s Build the Next Generation of Energy.",
  description = "Tell us about your site, your load or your water requirement. Our engineers will come back with a clear, itemised proposal.",
  primary = { label: "Start a Project", href: "/contact?intent=project" },
  secondary = { label: "Talk to Our Team", href: "/contact" },
  visual = "plant",
}: FinalCtaProps) {
  return (
    <section className="theme-dark relative isolate overflow-hidden bg-ink text-fg" aria-labelledby="cta-title">
      <div className="absolute inset-0 opacity-70">
        <SolarImage variant={visual} tone="ink" className="absolute inset-0" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink/95" />
      <div
        aria-hidden
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
      />
      <Container className="relative py-20 sm:py-28 lg:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-fg-muted">{eyebrow}</p>
          <h2 id="cta-title" className="text-h1 mt-4 text-white">
            {title}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-2xl text-fg-muted">{description}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 xs:flex-row">
            <Button href={primary.href} variant="lime" size="lg" icon="arrow">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="outline" size="lg">
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
