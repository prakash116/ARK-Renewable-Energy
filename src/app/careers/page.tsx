import type { Metadata } from "next";
import type { Feature } from "@/types/content";
import { jobs } from "@/data/jobs";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { JobBoard } from "@/components/careers/JobBoard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description:
    "Careers at ARK Renewable Energy: engineering, projects, sales, service and corporate roles building solar infrastructure across India.",
  path: "/careers",
});

const whyArk: Feature[] = [
  { title: "Real infrastructure", description: "Your work ends up as pumps, plants and lights that people depend on every day.", icon: "sun" },
  { title: "Engineering culture", description: "Decisions are made on measurement and standards, and engineers are heard.", icon: "drafting" },
  { title: "Field and office", description: "Roles span design desks and remote sites. Many people move between both.", icon: "compass" },
];

const growth: Feature[] = [
  { title: "Structured onboarding", description: "Product, safety and process training in your first weeks.", icon: "graduation-cap" },
  { title: "Certifications", description: "Support for relevant technical and safety certifications.", icon: "award" },
  { title: "Clear progression", description: "Defined paths from technician to lead and from engineer to project head.", icon: "trending-up" },
];

const benefits: Feature[] = [
  { title: "Health cover", description: "Medical insurance for you and your family.", icon: "heart" },
  { title: "Field allowances", description: "Travel, stay and site allowances for field roles.", icon: "map-pin" },
  { title: "Safety first", description: "PPE, training and the authority to stop unsafe work.", icon: "shield-check" },
  { title: "Learning budget", description: "Courses and conferences relevant to your role.", icon: "book-open" },
  { title: "Performance rewards", description: "Recognition tied to delivery and customer outcomes.", icon: "target" },
  { title: "Flexibility", description: "Hybrid arrangements for office roles where the work allows.", icon: "clock" },
];

export default function CareersPage() {
  const hasPlaceholder = jobs.some((j) => j.isPlaceholder);
  return (
    <>
      <InnerHero
        eyebrow="Careers"
        title="Build the energy systems that people run on."
        description="We hire engineers, site leads, sales partners and service technicians who want their work to last decades."
        crumbs={[{ name: "Careers", path: "/careers" }]}
        visual={{ alt: "", visual: "community", tone: "forest" }}
        size="large"
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <Button href="#open-positions" variant="lime" icon="arrow">
            See open positions
          </Button>
          <Button href="/about" variant="outline">
            About ARK
          </Button>
        </div>
      </InnerHero>

      <Section ariaLabelledby="why-c-title">
        <Container>
          <Reveal>
            <SectionHeading id="why-c-title" eyebrow="Why ARK" title="Work that shows up in the real world." />
          </Reveal>
          <FeatureGrid features={whyArk} variant="rows" columns={3} className="mt-10" />
        </Container>
      </Section>

      <Section tone="muted" ariaLabelledby="culture-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal y={28} scale={0.98}>
                <MediaFrame image={{ alt: "ARK site team at a solar installation", visual: "field", tone: "forest" }} aspect="4/3" />
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading
                  id="culture-title"
                  eyebrow="Culture"
                  title="Small teams, clear ownership, honest engineering."
                  description="We keep teams small enough that everyone knows what they own. Site safety is non-negotiable, customer outcomes are the scoreboard, and problems are discussed openly."
                />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-8">
                  <SectionHeading eyebrow="Growth" title="How people progress." size="h3" as="h3" />
                </div>
              </Reveal>
              <FeatureGrid features={growth} variant="rows" columns={3} className="mt-6 lg:grid-cols-1" />
            </div>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledby="benefits-title">
        <Container>
          <Reveal>
            <SectionHeading id="benefits-title" eyebrow="Benefits" title="What we provide." />
          </Reveal>
          <FeatureGrid features={benefits} variant="tiles" columns={3} className="mt-10" />
          <p className="mt-6 text-xs text-fg-soft">
            Benefit details vary by role and location and are confirmed in the offer letter.
          </p>
        </Container>
      </Section>

      <Section id="open-positions" tone="muted" ariaLabelledby="jobs-title" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="jobs-title"
              eyebrow="Open positions"
              title="Current openings."
              description="Filter by department. Each role lists responsibilities, requirements and how to apply."
            />
          </Reveal>
          <div className="mt-10">
            <JobBoard jobs={jobs} />
          </div>
          {hasPlaceholder && (
            <p className="mt-8 text-xs text-fg-soft">
              Positions marked “Sample” are illustrative and will be replaced by live vacancies.
            </p>
          )}
        </Container>
      </Section>

      <FinalCta
        eyebrow="Speculative applications"
        title="Do not see the right role?"
        description="Send your CV and tell us where you would add value. We keep strong profiles on file for upcoming projects."
        primary={{ label: "Send your CV", href: `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Speculative application")}` }}
        secondary={{ label: "Contact us", href: "/contact" }}
        visual="community"
      />
    </>
  );
}
