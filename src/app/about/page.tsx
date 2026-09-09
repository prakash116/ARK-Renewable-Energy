import type { Metadata } from "next";
import { capabilities, certifications, partners, timeline, values } from "@/data/company";
import { team } from "@/data/team";
import { trustStats } from "@/data/stats";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { Stats } from "@/components/sections/Stats";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "About ARK Renewable Energy",
  description:
    "ARK Renewable Energy is a renewable-energy engineering company delivering solar water pumping, rooftop solar, power plants and street lighting across India. Our story, mission, values and capabilities.",
  path: "/about",
});

export default function AboutPage() {
  const leaders = team.slice(0, 3);
  const timelineHasPlaceholder = timeline.some((t) => t.isPlaceholder);
  return (
    <>
      <InnerHero
        eyebrow="About ARK"
        title="A renewable-energy engineering company built for the long term."
        description={`${siteConfig.name} designs, builds and maintains solar systems that keep performing years after handover, for farmers, homeowners, businesses and institutions.`}
        crumbs={[{ name: "About", path: "/about" }]}
        visual={{ alt: "", visual: "field", tone: "forest" }}
        size="large"
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <Button href="/team" variant="lime" icon="arrow">
            Meet the leadership
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </InnerHero>

      <Stats stats={trustStats} />

      {/* Who we are */}
      <Section ariaLabelledby="who-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading
                  id="who-title"
                  eyebrow="Who we are"
                  title="Engineers first. Energy partners for decades."
                  description="ARK brings together system design, procurement, construction and service under one team. That integration is what lets us take responsibility for performance, not just installation."
                />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                  <p>
                    We work across four solution lines: solar water pumping for agriculture and water supply, rooftop solar
                    for homes and businesses, ground-mounted power plants delivered as EPC, and solar street lighting for
                    public and private infrastructure.
                  </p>
                  <p>
                    Every project starts with measurement: water levels, load profiles, roof structures, solar resource.
                    Systems are sized from that data, built from qualified components, and supported by a service network
                    that stays involved after commissioning.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal y={28} scale={0.98}>
                <MediaFrame image={{ alt: "Solar plant with rows of modules", visual: "plant", tone: "forest" }} aspect="4/3" />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Story / timeline */}
      <Section tone="muted" ariaLabelledby="story-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="story-title"
              eyebrow="Our story"
              title="From a single pump to integrated clean-energy engineering."
              description="Milestones that shaped how we work today."
            />
          </Reveal>
          <ProcessTimeline
            steps={timeline.map((t) => ({ title: t.title, description: t.description, label: t.year }))}
          />
          {timelineHasPlaceholder && (
            <p className="mt-2 text-xs text-fg-soft">Timeline entries are placeholders pending verified milestones and dates.</p>
          )}
        </Container>
      </Section>

      {/* Mission / Vision */}
      <Section tone="dark" ariaLabelledby="mission-title" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-40" />
        <Container className="relative">
          <h2 id="mission-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal className="rounded-[var(--radius-media)] border border-line bg-white/[0.03] p-7 sm:p-10">
              <p className="eyebrow text-lime">Mission</p>
              <p className="text-h3 mt-4 text-white">
                To make reliable clean energy accessible to every farm, home and business we serve, through engineering
                that performs for decades.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[var(--radius-media)] border border-line bg-white/[0.03] p-7 sm:p-10">
              <p className="eyebrow text-lime">Vision</p>
              <p className="text-h3 mt-4 text-white">
                A resilient energy future in which communities generate the power they need, sustainably and on their own
                terms.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section ariaLabelledby="values-title">
        <Container>
          <Reveal>
            <SectionHeading id="values-title" eyebrow="Values" title="What we hold ourselves to." />
          </Reveal>
          <FeatureGrid features={values} variant="rows" columns={3} numbered className="mt-10" />
        </Container>
      </Section>

      {/* Leadership */}
      <Section tone="muted" ariaLabelledby="leaders-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="leaders-title"
              eyebrow="Leadership"
              title="The people accountable for delivery."
              actions={
                <Button href="/team" variant="outline" icon="arrow">
                  Full leadership team
                </Button>
              }
            />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-8 xs:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {leaders.map((m) => (
              <StaggerItem key={m.id} as="li">
                <TeamCard member={m} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section ariaLabelledby="cap-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="cap-title"
              eyebrow="Capabilities"
              title="Everything between the survey and the service call."
            />
          </Reveal>
          <FeatureGrid features={capabilities} variant="tiles" columns={3} className="mt-10" />
        </Container>
      </Section>

      {/* Certifications & partners (honest empty states) */}
      <Section tone="muted" ariaLabelledby="cert-title">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal className="rounded-[var(--radius-media)] border border-line bg-card p-6 sm:p-8">
              <p className="eyebrow text-fg-soft">Certifications</p>
              <h2 id="cert-title" className="text-h3 mt-3">
                Quality and compliance
              </h2>
              {certifications.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {certifications.map((c) => (
                    <li key={c.name}>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-fg-muted">{c.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  Certifications, empanelments and quality accreditations will be listed here once verified documents are
                  available. We do not publish claims we cannot evidence.
                </p>
              )}
            </Reveal>
            <Reveal delay={0.08} className="rounded-[var(--radius-media)] border border-line bg-card p-6 sm:p-8">
              <p className="eyebrow text-fg-soft">Partners</p>
              <h3 className="text-h3 mt-3">Technology and channel partners</h3>
              {partners.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {partners.map((p) => (
                    <li key={p.name} className="rounded-full border border-line px-3 py-1.5 text-sm">
                      {p.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  Component manufacturers, financing partners and dealers we work with will be listed here with their
                  permission.
                </p>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCta
        title="Work with an engineering-led energy partner."
        description="Whether you are a farmer, a facilities head or an EPC developer, we start with your requirement and end with a system that performs."
      />
    </>
  );
}
