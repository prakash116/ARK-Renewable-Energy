import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";
import type { Job } from "@/types/content";
import { jobs } from "@/data/jobs";
import { siteConfig } from "@/config/site";
import { jobPostingSchema } from "@/lib/seo";
import { formatDate, pad2 } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JobCard } from "./JobCard";

function Meta({ icon: IconEl, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <IconEl aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
      <div>
        <p className="text-xs text-fg-soft">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

export function JobDetail({ job }: { job: Job }) {
  // TODO: Replace mailto with an ATS or careers inbox once available.
  const applyHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
  const others = jobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={jobPostingSchema(job)} />
      <InnerHero
        eyebrow={job.department}
        title={job.title}
        description={job.summary}
        crumbs={[
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ]}
        size="compact"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-line-strong text-fg">
            {job.type}
          </Badge>
          {job.isPlaceholder && <PlaceholderBadge />}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Meta icon={MapPin} label="Location" value={job.location} />
          <Meta icon={Briefcase} label="Experience" value={job.experience} />
          <Meta icon={Calendar} label="Posted" value={formatDate(job.postedOn)} />
          {job.validThrough && <Meta icon={Clock} label="Apply by" value={formatDate(job.validThrough)} />}
        </div>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <Button href={applyHref} variant="lime" size="lg" icon="arrow-up-right">
            Apply for this role
          </Button>
          <Button href="/careers" variant="outline" size="lg">
            All positions
          </Button>
        </div>
      </InnerHero>

      <Section ariaLabelledby="jd-resp">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <SectionHeading id="jd-resp" eyebrow="Responsibilities" title="What you will do." size="h3" />
              </Reveal>
              <StaggerGroup as="ul" className="mt-6 space-y-3" stagger={0.05}>
                {job.responsibilities.map((r, i) => (
                  <StaggerItem key={i} as="li" className="flex gap-4 border-t border-line pt-3 text-[15px] leading-relaxed">
                    <span className="font-mono text-xs text-fg-soft tabular-nums">{pad2(i)}</span>
                    <span>{r}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal className="mt-14">
                <SectionHeading eyebrow="Requirements" title="What you bring." size="h3" as="h3" />
              </Reveal>
              <StaggerGroup as="ul" className="mt-6 space-y-3" stagger={0.05}>
                {job.requirements.map((r, i) => (
                  <StaggerItem key={i} as="li" className="flex gap-4 border-t border-line pt-3 text-[15px] leading-relaxed">
                    <span className="font-mono text-xs text-fg-soft tabular-nums">{pad2(i)}</span>
                    <span>{r}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <aside className="lg:col-span-4">
              <Reveal delay={0.1}>
                <div className="rounded-[var(--radius-media)] border border-line bg-card p-6 lg:sticky lg:top-28">
                  <p className="eyebrow text-fg-soft">How to apply</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                    Email your CV with the subject line “Application: {job.title}”. Include your current location,
                    notice period and a short note on relevant projects.
                  </p>
                  <Button href={applyHref} variant="primary" icon="arrow-up-right" block className="mt-6">
                    Apply by email
                  </Button>
                  <p className="mt-4 text-xs text-fg-soft">
                    {siteConfig.name} is an equal-opportunity employer.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section tone="muted" ariaLabelledby="jd-other">
          <Container>
            <Reveal>
              <SectionHeading id="jd-other" eyebrow="More roles" title="Other open positions." />
            </Reveal>
            <ul className="mt-8 space-y-3">
              {others.map((j) => (
                <li key={j.slug}>
                  <JobCard job={j} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
