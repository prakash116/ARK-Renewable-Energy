import type { Metadata } from "next";
import { getResourcesByType } from "@/data/resources";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Installation Manuals",
  description:
    "Installation, operation and maintenance manuals for ARK Renewable Energy solar pumps, rooftop systems and street lights.",
  path: "/resources/manuals",
});

export default function ManualsPage() {
  const items = getResourcesByType("manual");
  const pending = items.some((r) => r.href === "#");
  return (
    <>
      <InnerHero
        eyebrow="Resources"
        title="Installation Manuals"
        description="Step-by-step installation, commissioning, operation and troubleshooting guidance for installers and owners."
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: "Manuals", path: "/resources/manuals" },
        ]}
        size="compact"
      />
      <Section ariaLabelledby="man-list">
        <Container>
          <h2 id="man-list" className="sr-only">
            Manual downloads
          </h2>
          <StaggerGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {items.map((r) => (
              <StaggerItem key={r.id} as="li">
                <ResourceCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {pending && (
            <p className="mt-8 text-xs text-fg-soft">
              Files marked pending have not been uploaded yet. Installers can request manuals from the service team.
            </p>
          )}
        </Container>
      </Section>
      <FinalCta
        title="Need service support?"
        description="Our service team handles commissioning questions, faults and maintenance planning."
        primary={{ label: "Contact service", href: "/contact?intent=service" }}
        secondary={{ label: "Back to resources", href: "/resources" }}
      />
    </>
  );
}
