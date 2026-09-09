import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types/content";
import { getProjectsBySolution } from "@/data/projects";
import { getResources } from "@/data/resources";
import { solutions } from "@/data/solutions";
import { faqSchema, serviceSchema } from "@/lib/seo";
import { pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionNav } from "@/components/ui/SectionNav";
import { SpecTable } from "@/components/ui/SpecTable";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResourceCard } from "@/components/resources/ResourceCard";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "applications", label: "Applications" },
  { id: "how-it-works", label: "How it works" },
  { id: "capabilities", label: "Capabilities" },
  { id: "components", label: "Components" },
  { id: "process", label: "Process" },
  { id: "use-cases", label: "Use cases" },
  { id: "faqs", label: "FAQs" },
  { id: "resources", label: "Resources" },
];

/** Data-driven template shared by all four solution pages. */
export function SolutionDetail({ solution }: { solution: Solution }) {
  const related = getProjectsBySolution(solution.slug, 3);
  const resources = getResources(solution.resourceIds);
  const others = solutions.filter((s) => s.slug !== solution.slug);
  const quoteHref = `/contact?intent=quote&solution=${solution.slug}`;

  return (
    <>
      <JsonLd data={[serviceSchema(solution), faqSchema(solution.faqs)]} />

      <InnerHero
        eyebrow={`Solution ${solution.number}`}
        title={solution.title}
        description={solution.tagline}
        crumbs={[
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${solution.slug}` },
        ]}
        visual={solution.heroImage}
        aside={
          <Reveal y={24} scale={0.98}>
            <MediaFrame image={solution.heroImage} aspect="4/3" className="border border-line" priority />
          </Reveal>
        }
      >
        <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <Button href={quoteHref} variant="lime" size="lg" icon="arrow">
            Get a Quote
          </Button>
          <Button href="#overview" variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </InnerHero>

      <SectionNav items={NAV} />

      {/* Overview */}
      <Section id="overview" ariaLabelledby="overview-title" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading id="overview-title" eyebrow="Overview" title={solution.description} size="h3" />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                  {solution.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <div className="rounded-[var(--radius-media)] border border-line bg-card p-6 lg:sticky lg:top-36">
                  <p className="eyebrow text-fg-soft">At a glance</p>
                  <SpecTable specs={solution.capabilities.slice(0, 4)} columns={1} className="mt-2" />
                  <Button href={quoteHref} variant="primary" icon="arrow" block className="mt-6">
                    Request a proposal
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section id="benefits" tone="muted" ariaLabelledby="benefits-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading id="benefits-title" eyebrow="Key benefits" title="Why customers choose it." />
          </Reveal>
          <FeatureGrid features={solution.benefits} variant="rows" columns={3} className="mt-10" />
        </Container>
      </Section>

      {/* Applications */}
      <Section id="applications" ariaLabelledby="applications-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading id="applications-title" eyebrow="Applications" title="Where it is used." />
          </Reveal>
          <FeatureGrid features={solution.applications} variant="tiles" columns={3} className="mt-10" />
        </Container>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" tone="dark" ariaLabelledby="hiw-title" className="scroll-mt-28 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-40" />
        <Container className="relative">
          <Reveal>
            <SectionHeading id="hiw-title" eyebrow="How it works" title="From sunlight to output." />
          </Reveal>
          <StaggerGroup as="ol" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {solution.howItWorks.map((s, i) => (
              <StaggerItem key={s.title} as="li" className="relative">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong font-mono text-xs tabular-nums">
                    {pad2(i)}
                  </span>
                  {i < solution.howItWorks.length - 1 && (
                    <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-lime/60 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="text-h4 mt-5">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{s.description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" ariaLabelledby="capabilities-title" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  id="capabilities-title"
                  eyebrow="Technical capabilities"
                  title="Specified for the site, not the brochure."
                  description="Typical ranges are listed below. Every proposal states exact ratings, warranties and compliance for the equipment supplied."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <SpecTable specs={solution.capabilities} columns={1} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Components */}
      <Section id="components" tone="muted" ariaLabelledby="components-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading id="components-title" eyebrow="Components" title="What goes into the system." />
          </Reveal>
          <FeatureGrid features={solution.components} variant="tiles" columns={3} numbered className="mt-10" />
        </Container>
      </Section>

      {/* Process */}
      <Section id="process" ariaLabelledby="process-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading id="process-title" eyebrow="Process" title="How we deliver it." />
          </Reveal>
          <ProcessTimeline steps={solution.process} />
        </Container>
      </Section>

      {/* Use cases */}
      <Section id="use-cases" tone="muted" ariaLabelledby="usecases-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading id="usecases-title" eyebrow="Use cases" title="Typical deployments." />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-4 lg:grid-cols-3" stagger={0.08}>
            {solution.useCases.map((u) => (
              <StaggerItem key={u.title} as="li" className="flex flex-col rounded-[var(--radius-card)] border border-line bg-card p-6">
                <Badge variant="neutral">{u.segment}</Badge>
                <h3 className="text-h4 mt-4">{u.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{u.description}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm">
                  <span className="font-semibold">Outcome: </span>
                  <span className="text-fg-muted">{u.outcome}</span>
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* Related projects */}
      {related.length > 0 && (
        <Section ariaLabelledby="related-title">
          <Container>
            <Reveal>
              <SectionHeading
                id="related-title"
                eyebrow="Projects"
                title={`${solution.shortTitle} in the field.`}
                actions={
                  <Button href="/projects" variant="outline" icon="arrow">
                    All projects
                  </Button>
                }
              />
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProjectCard project={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      )}

      {/* FAQs */}
      <Section id="faqs" tone="muted" ariaLabelledby="faqs-title" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading id="faqs-title" eyebrow="FAQs" title="Common questions." />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-4 text-[15px] text-fg-muted">
                  Not answered here?{" "}
                  <Link href="/contact" className="font-semibold text-fg underline-offset-4 hover:underline">
                    Ask our engineers
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <FaqAccordion faqs={solution.faqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Resources */}
      <Section id="resources" ariaLabelledby="res-title" className="scroll-mt-28">
        <Container>
          <Reveal>
            <SectionHeading
              id="res-title"
              eyebrow="Resources"
              title="Documents for this solution."
              actions={
                <Button href="/resources" variant="outline" icon="arrow">
                  Resource hub
                </Button>
              }
            />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {resources.map((r) => (
              <StaggerItem key={r.id} as="li">
                <ResourceCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Other solutions */}
          <div className="mt-16 border-t border-line pt-10">
            <p className="eyebrow text-fg-soft">Other solutions</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/solutions/${o.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-line bg-card px-4 py-3.5 transition-colors hover:border-line-strong"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon name={o.icon} className="size-4" />
                      </span>
                      <span className="text-[15px] font-semibold">{o.title}</span>
                    </span>
                    <ArrowRight aria-hidden className="size-4 text-fg-soft transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FinalCta
        title={`Ready to plan your ${solution.shortTitle.toLowerCase()} project?`}
        description="Share your site details and requirement. Our engineers will size the system and send an itemised proposal."
        primary={{ label: "Get a Quote", href: quoteHref }}
        secondary={{ label: "Talk to Our Team", href: "/contact" }}
        visual={solution.heroImage.visual}
      />
    </>
  );
}
