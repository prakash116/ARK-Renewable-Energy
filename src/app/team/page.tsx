import type { Metadata } from "next";
import { team } from "@/data/team";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "@/components/ui/TeamCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = createMetadata({
  title: "Leadership Team",
  description: "Meet the leadership team responsible for engineering, projects, sales and service at ARK Renewable Energy.",
  path: "/team",
});

export default function TeamPage() {
  const hasPlaceholder = team.some((m) => m.isPlaceholder);
  return (
    <>
      <InnerHero
        eyebrow="Leadership"
        title="The team behind every system."
        description="Engineering, projects, sales and service leaders who take responsibility for how ARK systems are designed, delivered and supported."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Team", path: "/team" },
        ]}
      />
      <Section ariaLabelledby="team-title">
        <Container>
          <h2 id="team-title" className="sr-only">
            Leadership team
          </h2>
          <StaggerGroup as="ul" className="grid gap-x-6 gap-y-10 xs:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {team.map((m) => (
              <StaggerItem key={m.id} as="li">
                <TeamCard member={m} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {hasPlaceholder && (
            <p className="mt-10 text-xs text-fg-soft">
              Profiles marked “Sample” are placeholders. Replace with verified names, designations, bios and photographs.
            </p>
          )}
        </Container>
      </Section>
      <FinalCta
        eyebrow="Careers"
        title="Join a team that builds real infrastructure."
        description="We hire engineers, site leads, sales partners and service technicians across India."
        primary={{ label: "View open positions", href: "/careers" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        visual="community"
      />
    </>
  );
}
