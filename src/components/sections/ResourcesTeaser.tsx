import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IconName } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "book-open", title: "Product Catalogue", text: "Ranges, specifications and options.", href: "/resources/catalogues" },
  { icon: "file-text", title: "Installation Manuals", text: "Step-by-step installation and commissioning.", href: "/resources/manuals" },
  { icon: "drafting", title: "Technical Guides", text: "Sizing, net metering and O&M references.", href: "/resources#guides" },
  { icon: "help-circle", title: "FAQs", text: "Answers to common questions.", href: "/resources/faqs" },
];

export function ResourcesTeaser() {
  return (
    <Section tone="muted" ariaLabelledby="resources-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="resources-title"
            eyebrow="Resources"
            title="Documentation for every stage."
            description="Catalogues, manuals and guides for customers, dealers and engineers."
            actions={
              <Button href="/resources" variant="outline" icon="arrow">
                Explore Resources
              </Button>
            }
          />
        </Reveal>
        <StaggerGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {cards.map((c) => (
            <StaggerItem key={c.title} as="li">
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_20px_40px_-30px_rgba(11,15,14,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name={c.icon} />
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 text-fg-soft transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </div>
                <h3 className="text-h4 mt-6">{c.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{c.text}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
