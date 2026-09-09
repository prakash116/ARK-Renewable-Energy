import { getFeaturedProjects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  const featured = getFeaturedProjects(4);
  const hasPlaceholder = featured.some((p) => p.isPlaceholder);
  return (
    <Section ariaLabelledby="projects-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Projects"
            title="Energy Solutions in Action."
            description="Selected installations across pumping, rooftop and utility-scale work."
            actions={
              <Button href="/projects" variant="outline" icon="arrow">
                View All Projects
              </Button>
            }
          />
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-x-8 lg:gap-y-12" stagger={0.08}>
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        {hasPlaceholder && (
          <p className="mt-8 text-xs text-fg-soft">
            Projects marked “Sample” are illustrative examples pending verified project data.
          </p>
        )}
      </Container>
    </Section>
  );
}
