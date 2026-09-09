import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCarousel } from "./TestimonialCarousel";

export function Testimonials() {
  return (
    <Section ariaLabelledby="testimonials-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Customer voices"
            title="What our customers say."
            description="From farms to factories, the measure of our work is how systems perform years after handover."
          />
        </Reveal>
        <div className="mt-10">
          <TestimonialCarousel items={testimonials} />
        </div>
      </Container>
    </Section>
  );
}
