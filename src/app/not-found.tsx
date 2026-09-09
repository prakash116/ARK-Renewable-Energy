import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/hero/InnerHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const links = [
  { label: "Solutions", href: "/solutions", text: "Pumping, rooftop, power plants, lighting" },
  { label: "Projects", href: "/projects", text: "Installations across India" },
  { label: "Resources", href: "/resources", text: "Catalogues, manuals and FAQs" },
  { label: "Contact", href: "/contact", text: "Talk to an engineer" },
];

export default function NotFound() {
  return (
    <>
      <InnerHero
        eyebrow="Error 404"
        title="This page is off the grid."
        description="The link may be outdated or the page may have moved. Try one of the routes below."
        size="compact"
      >
        <Button href="/" variant="lime" icon="arrow">
          Back to home
        </Button>
      </InnerHero>
      <Section padding="tight" ariaLabelledby="nf-links">
        <Container>
          <h2 id="nf-links" className="sr-only">
            Popular pages
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-line bg-card p-5 transition-colors hover:border-line-strong"
                >
                  <span>
                    <span className="block text-[15px] font-semibold">{l.label}</span>
                    <span className="block text-sm text-fg-muted">{l.text}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-fg-soft transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
