import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IconName } from "@/types/content";
import { generalFaqs, getResourcesByType } from "@/data/resources";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Product catalogues, installation manuals, technical guides and FAQs for ARK Renewable Energy solar pumping, rooftop, power plant and street lighting systems.",
  path: "/resources",
});

const categories: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "book-open", title: "Product Catalogues", text: "Ranges, specifications and configuration options.", href: "/resources/catalogues" },
  { icon: "file-text", title: "Installation Manuals", text: "Installation, commissioning and troubleshooting.", href: "/resources/manuals" },
  { icon: "drafting", title: "Technical Guides", text: "Sizing, net metering and O&M references.", href: "#guides" },
  { icon: "help-circle", title: "FAQs", text: "Answers to the questions we hear most.", href: "/resources/faqs" },
];

export default function ResourcesPage() {
  const catalogues = getResourcesByType("catalogue");
  const guides = getResourcesByType("guide");
  const faqPreview = generalFaqs[0].items.slice(0, 3);
  return (
    <>
      <InnerHero
        eyebrow="Resources"
        title="Documentation for every stage of your project."
        description="Catalogues for choosing, manuals for installing, guides for understanding and FAQs for everything else."
        crumbs={[{ name: "Resources", path: "/resources" }]}
      />

      <Section ariaLabelledby="cats-title" padding="tight">
        <Container>
          <h2 id="cats-title" className="sr-only">
            Resource categories
          </h2>
          <StaggerGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {categories.map((c) => (
              <StaggerItem key={c.title} as="li">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-5 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong"
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

      <Section tone="muted" ariaLabelledby="cat-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="cat-title"
              eyebrow="Catalogues"
              title="Product catalogues."
              actions={
                <Button href="/resources/catalogues" variant="outline" icon="arrow">
                  All catalogues
                </Button>
              }
            />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {catalogues.map((r) => (
              <StaggerItem key={r.id} as="li">
                <ResourceCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <Section id="guides" ariaLabelledby="guides-title" className="scroll-mt-24">
        <Container>
          <Reveal>
            <SectionHeading
              id="guides-title"
              eyebrow="Technical guides"
              title="Understand the engineering."
              description="Short references written by our engineers for customers, dealers and consultants."
            />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {guides.map((r) => (
              <StaggerItem key={r.id} as="li">
                <ResourceCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <Section tone="muted" ariaLabelledby="faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading id="faq-title" eyebrow="FAQs" title="Quick answers." />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-6">
                  <Button href="/resources/faqs" variant="outline" icon="arrow">
                    All FAQs
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <FaqAccordion faqs={faqPreview} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta
        title="Need a document that is not listed?"
        description="Datasheets, drawings and compliance documents are shared on request for active enquiries and projects."
        primary={{ label: "Request documents", href: "/contact?intent=general" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </>
  );
}
