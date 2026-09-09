import { processSteps } from "@/data/company";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process({
  eyebrow = "How we work",
  title = "From Idea to Energy.",
  description = "A defined delivery process with clear checkpoints, so you always know what happens next.",
  tone = "muted",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "muted" | "dark";
}) {
  return (
    <Section tone={tone} ariaLabelledby="process-title">
      <Container>
        <Reveal>
          <SectionHeading id="process-title" eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
        <ProcessTimeline steps={processSteps} />
      </Container>
    </Section>
  );
}
