import { whyArk } from "@/data/company";
import { pad2 } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyArk() {
  return (
    <Section ariaLabelledby="why-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="why-title"
            eyebrow="Why ARK"
            title="Built on Engineering. Driven by Impact."
            description="Six principles that shape how every ARK system is designed, delivered and supported."
          />
        </Reveal>
        <StaggerGroup as="ul" className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {whyArk.map((f, i) => (
            <StaggerItem key={f.title} as="li" className="border-t border-line pt-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-fg-soft tabular-nums">{pad2(i)}</span>
                {f.icon && (
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name={f.icon} className="size-4" />
                  </span>
                )}
              </div>
              <h3 className="text-h4 mt-5">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{f.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
