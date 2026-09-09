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
  title: "Product Catalogues",
  description:
    "Download ARK Renewable Energy product catalogues for solar water pumping, rooftop solar, solar power plants and solar street lighting.",
  path: "/resources/catalogues",
});

export default function CataloguesPage() {
  const items = getResourcesByType("catalogue");
  const pending = items.some((r) => r.href === "#");
  return (
    <>
      <InnerHero
        eyebrow="Resources"
        title="Product Catalogues"
        description="Ranges, specifications and configuration options for each solution line."
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: "Catalogues", path: "/resources/catalogues" },
        ]}
        size="compact"
      />
      <Section ariaLabelledby="cat-list">
        <Container>
          <h2 id="cat-list" className="sr-only">
            Catalogue downloads
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
              Files marked pending have not been uploaded yet. Request the latest catalogue through the contact page.
            </p>
          )}
        </Container>
      </Section>
      <FinalCta
        title="Prefer a walkthrough?"
        description="Our team can take you through the right product range for your requirement."
        primary={{ label: "Talk to sales", href: "/contact?intent=quote" }}
        secondary={{ label: "Back to resources", href: "/resources" }}
      />
    </>
  );
}
