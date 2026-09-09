import type { Metadata } from "next";
import { Check } from "lucide-react";
import { csrFocusAreas, csrStats } from "@/data/csr";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { Impact } from "@/components/sections/Impact";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "CSR & Impact",
  description:
    "ARK Renewable Energy corporate social responsibility: clean energy access, rural development, agriculture, community initiatives and environmental responsibility.",
  path: "/csr",
});

export default function CsrPage() {
  return (
    <>
      <InnerHero
        eyebrow="CSR & impact"
        title="Energy that improves lives, not just balance sheets."
        description="Our business is clean energy. Our responsibility is to make sure its benefits reach the communities where we work."
        crumbs={[{ name: "CSR", path: "/csr" }]}
        visual={{ alt: "", visual: "community", tone: "forest" }}
        size="large"
      >
        <ul className="flex flex-wrap gap-2">
          {csrFocusAreas.map((a) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/5"
              >
                {a.icon && <Icon name={a.icon} className="size-4 text-lime" />}
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </InnerHero>

      <Section ariaLabelledby="csr-intro">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              id="csr-intro"
              eyebrow="Our impact"
              title="Where our work and our responsibility meet."
              description="Solar pumping keeps farms productive without diesel. Street lighting makes village roads safer. Rooftop and utility plants cut emissions at scale. Our CSR programmes extend that impact to the people around each project."
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" padding="none" className="py-4 sm:py-8">
        <Container>
          <ol className="divide-y divide-line">
            {csrFocusAreas.map((a, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={a.id} id={a.id} className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
                    <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                      <Reveal>
                        <div className="flex items-center gap-3">
                          {a.icon && (
                            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                              <Icon name={a.icon} className="size-5" />
                            </span>
                          )}
                          <span className="font-mono text-xs text-fg-soft tabular-nums">0{i + 1}</span>
                        </div>
                        <h2 className="text-h2 mt-5">{a.title}</h2>
                        <p className="text-lead mt-3 text-fg-muted">{a.description}</p>
                      </Reveal>
                      <Reveal delay={0.08}>
                        <ul className="mt-6 space-y-2.5">
                          {a.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-[15px]">
                              <Check aria-hidden className="mt-1 size-4 shrink-0 text-lime-deep" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </div>
                    <div className={cn("lg:col-span-6", flip && "lg:order-1")}>
                      <Reveal y={28} scale={0.98}>
                        <MediaFrame image={a.image} aspect="4/3" />
                      </Reveal>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="pb-6 text-xs text-fg-soft">
            Programme descriptions are indicative. Publish only activities that are underway or completed.
          </p>
        </Container>
      </Section>

      <Impact
        stats={csrStats}
        eyebrow="Impact metrics"
        title="Outcomes we track."
        description="Programme reach measured across villages, community installations, farmers and trained technicians."
      />

      <FinalCta
        eyebrow="Partner with us"
        title="Working on a community energy programme?"
        description="We partner with panchayats, NGOs, institutions and CSR foundations on clean-energy projects with measurable outcomes."
        primary={{ label: "Discuss a programme", href: "/contact?intent=general" }}
        secondary={{ label: "About ARK", href: "/about" }}
        visual="community"
      />
    </>
  );
}
