import type { Metadata } from "next";
import { generalFaqs } from "@/data/resources";
import { createMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about solar water pumping, rooftop solar, solar power plants, street lighting, costs, subsidies, installation and maintenance from ARK Renewable Energy.",
  path: "/resources/faqs",
});

export default function FaqsPage() {
  const all = generalFaqs.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={faqSchema(all)} />
      <InnerHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        description="Straight answers on choosing, costing, installing and maintaining solar systems."
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: "FAQs", path: "/resources/faqs" },
        ]}
        size="compact"
      >
        <ul className="flex flex-wrap gap-2">
          {generalFaqs.map((g) => (
            <li key={g.group}>
              <a
                href={`#${g.group.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-white/5"
              >
                {g.group}
              </a>
            </li>
          ))}
        </ul>
      </InnerHero>

      <Section ariaLabelledby="faq-all">
        <Container size="narrow">
          <h2 id="faq-all" className="sr-only">
            All questions
          </h2>
          <div className="space-y-14">
            {generalFaqs.map((g) => (
              <Reveal key={g.group} as="section" className="scroll-mt-28">
                <h3 id={g.group.toLowerCase().replace(/\s+/g, "-")} className="text-h3 mb-4">
                  {g.group}
                </h3>
                <FaqAccordion faqs={g.items} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta
        title="Still have a question?"
        description="Our engineers answer technical questions directly. No sales script."
        primary={{ label: "Ask a question", href: "/contact?intent=general" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </>
  );
}
