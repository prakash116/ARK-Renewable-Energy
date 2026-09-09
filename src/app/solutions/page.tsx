import type { Metadata } from "next";
import { Check } from "lucide-react";
import { solutions } from "@/data/solutions";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Solar & Renewable Energy Solutions",
  description:
    "Solar water pumping, rooftop solar, solar power plants (EPC) and solar street lighting from ARK Renewable Energy, engineered for agriculture, homes, businesses and infrastructure.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Solutions"
        title="Renewable Energy Solutions, Designed to Perform."
        description="Four solution lines that cover the full spectrum of distributed and utility-scale solar, each engineered for the site it serves."
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        size="large"
      >
        <ul className="flex flex-wrap gap-2">
          {solutions.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/5"
              >
                <span className="font-mono text-xs text-fg-soft">{s.number}</span>
                {s.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </InnerHero>

      <Section padding="none" className="py-6 sm:py-10">
        <Container>
          <ol className="divide-y divide-line">
            {solutions.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-24 py-12 sm:py-16 lg:py-24">
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
                    <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                      <Reveal>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm text-fg-soft tabular-nums">{s.number}</span>
                          <span className="h-px flex-1 bg-line" />
                          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                            <Icon name={s.icon} className="size-5" />
                          </span>
                        </div>
                        <h2 className="text-h2 mt-6">{s.title}</h2>
                        <p className="text-lead mt-3 text-fg">{s.tagline}</p>
                        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted sm:text-base">{s.description}</p>
                      </Reveal>
                      <Reveal delay={0.08}>
                        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          {s.benefits.slice(0, 4).map((b) => (
                            <li key={b.title} className="flex items-start gap-2.5 text-[15px]">
                              <Check aria-hidden className="mt-1 size-4 shrink-0 text-lime-deep" />
                              <span>{b.title}</span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                      <Reveal delay={0.12}>
                        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                          <Button href={`/solutions/${s.slug}`} variant="primary" icon="arrow">
                            Explore {s.shortTitle}
                          </Button>
                          <Button href={`/contact?intent=quote&solution=${s.slug}`} variant="outline">
                            Get a Quote
                          </Button>
                        </div>
                      </Reveal>
                    </div>
                    <div className={cn("lg:col-span-6", flip && "lg:order-1")}>
                      <Reveal y={28} scale={0.98}>
                        <MediaFrame image={s.heroImage} aspect="4/3" />
                      </Reveal>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Process tone="muted" />
      <FinalCta />
    </>
  );
}
