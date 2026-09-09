import type { Stat } from "@/types/content";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Impact({
  stats,
  eyebrow = "Impact",
  title = "Cleaner Energy. Measurable Impact.",
  description = "Every system we commission displaces diesel or grid power and adds up to a measurable reduction in emissions.",
}: {
  stats: Stat[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const hasPlaceholder = stats.some((s) => s.isPlaceholder);
  return (
    <Section tone="dark" ariaLabelledby="impact-title" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-40" />
      <div aria-hidden className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <SectionHeading id="impact-title" eyebrow={eyebrow} title={title} description={description} align="center" />
        </Reveal>
        <StaggerGroup as="ul" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.id} as="li" className="rounded-[var(--radius-card)] border border-line bg-white/[0.03] p-6">
              <p className="text-stat text-lime">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[15px] font-semibold">{s.label}</p>
              {s.note && <p className="mt-1 text-sm text-fg-muted">{s.note}</p>}
              {s.isPlaceholder && <PlaceholderBadge className="mt-3" />}
            </StaggerItem>
          ))}
        </StaggerGroup>
        {hasPlaceholder && (
          <p className="mt-8 text-center text-xs text-fg-soft">
            Impact figures marked “Sample” are placeholders. Publish only verified figures with the calculation
            method.
          </p>
        )}
      </Container>
    </Section>
  );
}
