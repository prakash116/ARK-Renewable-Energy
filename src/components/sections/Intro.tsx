import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/visuals/MediaFrame";
import type { IconName } from "@/types/content";

const segments: { icon: IconName; label: string; text: string }[] = [
  { icon: "tractor", label: "Agriculture", text: "Solar pumping and irrigation" },
  { icon: "home", label: "Residential", text: "Rooftop systems with backup" },
  { icon: "building", label: "Commercial", text: "Offices, campuses, hospitals" },
  { icon: "factory", label: "Industrial", text: "Plants, sheds and captive power" },
];

export function Intro() {
  return (
    <Section ariaLabelledby="intro-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                id="intro-title"
                eyebrow="Who we are"
                title="Renewable Energy, Engineered Around Your Needs."
                description="ARK Renewable Energy delivers integrated clean-energy solutions across agriculture, residential, commercial and industrial applications, from the first site survey to years of dependable service."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {segments.map((s) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon name={s.icon} className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold">{s.label}</span>
                      <span className="block text-sm text-fg-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Button href="/about" variant="primary" icon="arrow">
                  About ARK
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal y={30} scale={0.98}>
              <MediaFrame
                image={{ alt: "Solar array beside cultivated fields at dusk", visual: "field", tone: "forest" }}
                aspect="4/3"
                className="shadow-[0_30px_80px_-40px_rgba(15,61,46,0.45)]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
