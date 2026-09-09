import type { IconName } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyFlowDiagram } from "@/components/visuals/EnergyFlowDiagram";

const points: { icon: IconName; title: string; text: string }[] = [
  { icon: "gauge", title: "MPPT tracking", text: "Extracts maximum power from the array in changing light." },
  { icon: "shield-check", title: "Layered protection", text: "Dry-run, overload, surge and reverse-polarity safeguards." },
  { icon: "network", title: "Monitoring built in", text: "Generation, consumption and faults visible from a phone." },
  { icon: "battery", title: "Storage ready", text: "Hybrid designs with lithium storage where backup matters." },
];

export function Technology() {
  return (
    <Section tone="muted" ariaLabelledby="tech-title" className="overflow-hidden">
      <Container>
        <Reveal>
          <SectionHeading
            id="tech-title"
            eyebrow="Technology"
            title="Technology That Works in the Real World."
            description="Every ARK system follows the same principle: generate efficiently, protect the equipment, and make performance visible."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 rounded-[var(--radius-media)] border border-line bg-canvas p-4 sm:p-6 lg:p-8">
          <EnergyFlowDiagram />
        </Reveal>
        <StaggerGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {points.map((p) => (
            <StaggerItem key={p.title} as="li" className="flex gap-3">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon name={p.icon} className="size-4" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold">{p.title}</span>
                <span className="block text-sm text-fg-muted">{p.text}</span>
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
