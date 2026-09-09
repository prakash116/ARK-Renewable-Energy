import { InnerHero } from "@/components/hero/InnerHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** Shared layout for policy pages. Content is data so legal can edit it easily. */
export function LegalPage({
  title,
  description,
  updated,
  path,
  sections,
}: {
  title: string;
  description: string;
  updated: string;
  path: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <InnerHero
        eyebrow="Legal"
        title={title}
        description={description}
        crumbs={[{ name: title, path }]}
        size="compact"
      >
        <p className="text-sm text-fg-muted">Last updated: {updated}</p>
      </InnerHero>
      <Section ariaLabelledby="legal-body">
        <Container size="prose">
          <h2 id="legal-body" className="sr-only">
            {title} content
          </h2>
          <div className="rounded-[var(--radius-card)] border border-solar/40 bg-solar/10 px-4 py-3 text-sm text-[#7a5410]">
            Template text for legal review. Replace with the policy approved by your legal advisor before launch.
          </div>
          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`legal-${i}`}>
                <h3 id={`legal-${i}`} className="text-h3">
                  {s.heading}
                </h3>
                <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {s.bullets && (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
