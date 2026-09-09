import type { Metadata } from "next";
import { Suspense } from "react";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectGridSkeleton } from "@/components/projects/ProjectGridSkeleton";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Solar water pumping, rooftop, EPC, industrial and agricultural solar projects delivered by ARK Renewable Energy across India.",
  path: "/projects",
});

export default function ProjectsPage() {
  const hasPlaceholder = projects.some((p) => p.isPlaceholder);
  return (
    <>
      <InnerHero
        eyebrow="Projects"
        title="Energy Solutions in Action."
        description="A selection of installations across agriculture, rooftops, industry and infrastructure. Filter by category to find work similar to your requirement."
        crumbs={[{ name: "Projects", path: "/projects" }]}
        visual={{ alt: "", visual: "plant", tone: "ink" }}
      />
      <Section ariaLabelledby="projects-list-title">
        <Container>
          <h2 id="projects-list-title" className="sr-only">
            Project portfolio
          </h2>
          <Suspense fallback={<ProjectGridSkeleton count={projects.length} />}>
            <ProjectGrid projects={projects} />
          </Suspense>
          {hasPlaceholder && (
            <p className="mt-10 text-xs text-fg-soft">
              Projects marked “Sample” are illustrative examples pending verified project data.
            </p>
          )}
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
