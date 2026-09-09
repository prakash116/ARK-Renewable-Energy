import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { annualReports, businessSnapshot, corporateDocuments, governance } from "@/data/investors";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = createMetadata({
  title: "Investors",
  description:
    "Investor relations at ARK Renewable Energy: business overview, financial reporting, corporate documents and governance.",
  path: "/investors",
});

const highlightSlots = [
  { label: "Revenue", note: "Reported annually" },
  { label: "Installed capacity", note: "Cumulative MW across segments" },
  { label: "Order book", note: "Contracted, not yet commissioned" },
  { label: "Service portfolio", note: "Systems under O&M" },
];

export default function InvestorsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Investor relations"
        title="Long-life assets, engineered and serviced by one team."
        description="ARK builds and maintains distributed and utility-scale solar infrastructure. This page hosts our reporting, corporate documents and governance framework."
        crumbs={[{ name: "Investors", path: "/investors" }]}
        visual={{ alt: "", visual: "grid", tone: "ink" }}
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <Button href="#reports" variant="lime" icon="arrow">
            Annual reports
          </Button>
          <Button href="#contact" variant="outline">
            Investor contact
          </Button>
        </div>
      </InnerHero>

      {/* Overview */}
      <Section ariaLabelledby="ir-overview">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading id="ir-overview" eyebrow="Investor overview" title="Why distributed solar, and why now." />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="space-y-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                  <p>
                    Demand for reliable, affordable energy in agriculture, industry and rural infrastructure continues to
                    grow, while the cost of solar generation keeps falling. ARK addresses that demand with four
                    complementary solution lines and an integrated engineering, procurement, construction and service
                    model.
                  </p>
                  <p>
                    Our approach favours long-term relationships: systems are designed to perform for decades, and our
                    service network keeps them doing so. That creates recurring operations and maintenance activity
                    alongside project delivery.
                  </p>
                  <p>
                    This page will carry audited financial information, annual reports and corporate documents as they
                    are published. Until then, investors are welcome to contact us directly.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Business snapshot */}
      <Section tone="muted" ariaLabelledby="ir-snapshot">
        <Container>
          <Reveal>
            <SectionHeading id="ir-snapshot" eyebrow="Business snapshot" title="Four segments, one delivery model." />
          </Reveal>
          <FeatureGrid features={businessSnapshot} variant="tiles" columns={4} className="mt-10" />
        </Container>
      </Section>

      {/* Financial highlights (structure only; no invented figures) */}
      <Section tone="dark" ariaLabelledby="ir-fin" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-40" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="ir-fin"
              eyebrow="Financial highlights"
              title="Reported figures will be published here."
              description="We publish only audited or board-approved figures. The structure below shows the metrics that will be reported."
            />
          </Reveal>
          <StaggerGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {highlightSlots.map((h) => (
              <StaggerItem key={h.label} as="li" className="rounded-[var(--radius-card)] border border-dashed border-line-strong p-6">
                <p className="font-display text-3xl font-bold text-fg-soft">—</p>
                <p className="mt-3 text-[15px] font-semibold">{h.label}</p>
                <p className="mt-1 text-sm text-fg-muted">{h.note}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      {/* Reports */}
      <Section id="reports" ariaLabelledby="ir-reports" className="scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading id="ir-reports" eyebrow="Annual reports" title="Reporting." size="h3" />
              </Reveal>
              <ul className="mt-6 space-y-3">
                {annualReports.map((d) => (
                  <li key={d.id}>
                    <DocumentCard doc={d} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Reveal>
                <SectionHeading eyebrow="Corporate documents" title="Policies and profile." size="h3" as="h3" />
              </Reveal>
              <ul className="mt-6 space-y-3">
                {corporateDocuments.map((d) => (
                  <li key={d.id}>
                    <DocumentCard doc={d} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-xs text-fg-soft">
            Documents marked pending have not been published yet. Placeholder entries show the intended structure only.
          </p>
        </Container>
      </Section>

      {/* Governance */}
      <Section tone="muted" ariaLabelledby="ir-gov">
        <Container>
          <Reveal>
            <SectionHeading id="ir-gov" eyebrow="Governance" title="How the company is run." />
          </Reveal>
          <FeatureGrid features={governance} variant="rows" columns={4} className="mt-10" />
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" ariaLabelledby="ir-contact" className="scroll-mt-24">
        <Container size="narrow">
          <Reveal className="rounded-[var(--radius-media)] border border-line bg-card p-6 sm:p-10">
            <SectionHeading
              id="ir-contact"
              eyebrow="Investor contact"
              title="Speak with us."
              description="For investor enquiries, due diligence requests and document access."
              size="h3"
            />
            {/* TODO: Replace with a dedicated investor relations mailbox when available. */}
            <div className="mt-6 flex flex-col gap-3 xs:flex-row">
              <Button href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Investor enquiry")}`} variant="primary" icon="arrow-up-right">
                <Mail aria-hidden className="size-4" />
                {siteConfig.contact.email}
              </Button>
              <Button href="/contact?intent=general" variant="outline">
                Contact form
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
