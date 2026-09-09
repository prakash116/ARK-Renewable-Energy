import { Calendar, MapPin, Zap } from "lucide-react";
import type { Project } from "@/types/content";
import { categoryLabel, projects } from "@/data/projects";
import { getSolution } from "@/data/solutions";
import { pad2 } from "@/lib/utils";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecTable } from "@/components/ui/SpecTable";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "./ProjectCard";

function Meta({ icon: IconEl, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <IconEl aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
      <div>
        <p className="text-xs text-fg-soft">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

/** Case-study template used by every project page. */
export function ProjectDetail({ project }: { project: Project }) {
  const solution = getSolution(project.solution);
  const related = projects.filter((p) => p.slug !== project.slug && p.solution === project.solution).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <InnerHero
        eyebrow={categoryLabel[project.category]}
        title={project.title}
        description={project.summary}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
        visual={project.image}
        aside={
          <Reveal y={24} scale={0.98}>
            <MediaFrame image={project.image} aspect="4/3" className="border border-line" priority />
          </Reveal>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <Badge key={c} variant="outline" className="border-line-strong text-fg">
              {categoryLabel[c]}
            </Badge>
          ))}
          {project.isPlaceholder && <PlaceholderBadge />}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          <Meta icon={MapPin} label="Location" value={`${project.location}, ${project.state}`} />
          <Meta icon={Zap} label="Capacity" value={project.capacity} />
          <Meta icon={Calendar} label="Year" value={project.year} />
        </div>
      </InnerHero>

      {project.isPlaceholder && (
        <div className="border-b border-solar/40 bg-solar/10">
          <Container className="py-3 text-sm text-[#7a5410]">
            This is an illustrative sample case study. Replace with verified project data before publishing.
          </Container>
        </div>
      )}

      {/* Overview */}
      <Section ariaLabelledby="pd-overview">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading id="pd-overview" eyebrow="Project overview" title="What we delivered." />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                  {project.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <div className="rounded-[var(--radius-media)] border border-line bg-card p-6">
                  <p className="eyebrow text-fg-soft">Technology</p>
                  <SpecTable specs={project.technology} columns={1} className="mt-2" />
                  {solution && (
                    <Button href={`/solutions/${solution.slug}`} variant="outline" icon="arrow" block className="mt-6">
                      About {solution.shortTitle}
                    </Button>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Challenge / Solution */}
      <Section tone="muted" ariaLabelledby="pd-challenge">
        <Container>
          <h2 id="pd-challenge" className="sr-only">
            Challenge and solution
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal className="rounded-[var(--radius-media)] border border-line bg-card p-6 sm:p-8">
              <p className="eyebrow text-fg-soft">Challenge</p>
              <ul className="mt-5 space-y-3">
                {project.challenge.map((c, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-0.5 font-mono text-xs text-fg-soft tabular-nums">{pad2(i)}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="theme-dark rounded-[var(--radius-media)] bg-ink p-6 text-fg sm:p-8">
              <p className="eyebrow text-fg-soft">Solution</p>
              <ul className="mt-5 space-y-3">
                {project.solutionApproach.map((c, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-0.5 font-mono text-xs text-lime tabular-nums">{pad2(i)}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Execution + Results */}
      <Section ariaLabelledby="pd-execution">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading id="pd-execution" eyebrow="Execution" title="How the work ran." />
              </Reveal>
              <StaggerGroup as="ol" className="mt-8 space-y-6" stagger={0.08}>
                {project.execution.map((s, i) => (
                  <StaggerItem key={s.title} as="li" className="flex gap-4">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs tabular-nums">
                      {pad2(i)}
                    </span>
                    <div>
                      <h3 className="text-h4">{s.title}</h3>
                      <p className="mt-1 text-[15px] text-fg-muted">{s.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading eyebrow="Results" title="Outcomes." as="h3" />
              </Reveal>
              <StaggerGroup as="ul" className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-3" stagger={0.1}>
                {project.results.map((r) => (
                  <StaggerItem key={r.label} as="li" className="rounded-[var(--radius-card)] border border-line bg-card p-5">
                    <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{r.value}</p>
                    <p className="mt-1 text-sm text-fg-muted">{r.label}</p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <Section tone="muted" ariaLabelledby="pd-gallery">
          <Container>
            <Reveal>
              <SectionHeading id="pd-gallery" eyebrow="Gallery" title="On site." />
            </Reveal>
            <StaggerGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {project.gallery.map((g, i) => (
                <StaggerItem key={i} as="li" className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                  <MediaFrame image={g} aspect={i === 0 ? "wide" : "4/3"} rounded="card" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      )}

      {/* Related */}
      <Section ariaLabelledby="pd-related">
        <Container>
          <Reveal>
            <SectionHeading
              id="pd-related"
              eyebrow="More projects"
              title="Related work."
              actions={
                <Button href="/projects" variant="outline" icon="arrow">
                  All projects
                </Button>
              }
            />
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {fallbackRelated.map((p) => (
              <StaggerItem key={p.slug}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <FinalCta
        title="Planning something similar?"
        description="Tell us about your site and requirement. We will share relevant references and a clear proposal."
        primary={{ label: "Start a Project", href: `/contact?intent=project&solution=${project.solution}` }}
        visual={project.image.visual}
      />
    </>
  );
}
