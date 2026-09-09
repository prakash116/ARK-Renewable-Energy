import { getSolution } from "@/data/solutions";
import type { IconName } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolarImage } from "@/components/visuals/SolarImage";

const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "tractor", title: "Built for agriculture", text: "Sized to crop, borewell and season." },
  { icon: "droplets", title: "Reliable water access", text: "Daily supply wherever the sun shines." },
  { icon: "zap", title: "No diesel dependency", text: "Remove fuel cost and supply runs." },
  { icon: "trending-up", title: "Low operating cost", text: "Brushless motors, minimal servicing." },
  { icon: "sun", title: "Solar-powered pumping", text: "MPPT control for output in low light." },
  { icon: "drafting", title: "Smart engineering", text: "Protections, monitoring, seasonal tilt." },
];

/** Energy-flow overlay: panel → controller → pump, animated dashes. */
function FlowOverlay() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d="M270 372 C 340 372, 360 388, 470 388"
        fill="none"
        stroke="#c9f24b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="10 14"
        className="animate-energy-dash"
        opacity="0.9"
      />
      <circle cx="270" cy="372" r="5" fill="#c9f24b" />
      <circle cx="470" cy="388" r="5" fill="#c9f24b" className="animate-pulse-soft" />
    </svg>
  );
}

export function FeaturedSolution() {
  const solution = getSolution("solar-water-pumping");
  if (!solution) return null;
  return (
    <Section tone="dark" ariaLabelledby="featured-title" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-40" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal y={28} scale={0.98}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] border border-line sm:aspect-[16/11]">
                <SolarImage variant="pumping" tone="forest" alt="Solar array powering a pump beside a farm pond" className="absolute inset-0" />
                <FlowOverlay />
                <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-ink/60 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                  <span className="mr-2 inline-block size-1.5 rounded-full bg-lime align-middle" />
                  Array → Controller → Pump
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                id="featured-title"
                eyebrow="Featured solution"
                title="Water security, powered by daylight."
                description="Solar water pumping replaces diesel and unreliable grid supply with a system sized to your borewell, crop and season. It runs when the sun does, at near-zero operating cost."
              />
            </Reveal>
            <StaggerGroup as="ul" className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2" stagger={0.06}>
              {highlights.map((h) => (
                <StaggerItem key={h.title} as="li" className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lime">
                    <Icon name={h.icon} className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{h.title}</span>
                    <span className="block text-sm text-fg-muted">{h.text}</span>
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                <Button href="/solutions/solar-water-pumping" variant="lime" icon="arrow" size="lg">
                  Explore Solar Pumping
                </Button>
                <Button href="/contact?intent=quote&solution=solar-water-pumping" variant="outline" size="lg">
                  Get a Quote
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
