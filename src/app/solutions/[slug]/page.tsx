import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, solutionSlugs } from "@/data/solutions";
import { createMetadata } from "@/lib/seo";
import { SolutionDetail } from "@/components/solutions/SolutionDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return createMetadata({
    title: solution.seo.title,
    description: solution.seo.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
