import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, jobs } from "@/data/jobs";
import { createMetadata } from "@/lib/seo";
import { JobDetail } from "@/components/careers/JobDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) return {};
  return createMetadata({
    title: `${job.title} (${job.location})`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage(props: PageProps<"/careers/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) notFound();
  return <JobDetail job={job} />;
}
