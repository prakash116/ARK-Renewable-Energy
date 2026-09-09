import { solutions } from "@/data/solutions";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionCard } from "@/components/solutions/SolutionCard";

/** Asymmetric 7/5 · 5/7 grid on desktop, stacked on mobile. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function SolutionsGrid() {
  return (
    <Section tone="muted" ariaLabelledby="solutions-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="solutions-title"
            eyebrow="Solutions"
            title="Solutions Built for Real-World Energy Needs."
            description="Four solution lines, each engineered for the site it serves, from a single borewell to a multi-megawatt plant."
            actions={
              <Button href="/solutions" variant="outline" icon="arrow">
                All solutions
              </Button>
            }
          />
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6" stagger={0.1}>
          {solutions.map((s, i) => (
            <StaggerItem key={s.slug} className={spans[i]}>
              <SolutionCard solution={s} size={i === 0 || i === 3 ? "large" : "default"} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
