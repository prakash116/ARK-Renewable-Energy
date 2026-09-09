import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { impactStats, trustStats } from "@/data/stats";
import { Hero } from "@/components/hero/Hero";
import { Stats } from "@/components/sections/Stats";
import { Intro } from "@/components/sections/Intro";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { FeaturedSolution } from "@/components/sections/FeaturedSolution";
import { WhyArk } from "@/components/sections/WhyArk";
import { Process } from "@/components/sections/Process";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Technology } from "@/components/sections/Technology";
import { Impact } from "@/components/sections/Impact";
import { Testimonials } from "@/components/sections/Testimonials";
import { ResourcesTeaser } from "@/components/sections/ResourcesTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

const base = createMetadata({
  title: siteConfig.tagline.replace(/\.$/, ""),
  description: siteConfig.description,
  path: "/",
});

export const metadata: Metadata = {
  ...base,
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline.replace(/\.$/, "")}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats stats={trustStats} />
      <Intro />
      <SolutionsGrid />
      <FeaturedSolution />
      <WhyArk />
      <Process />
      <FeaturedProjects />
      <Technology />
      <Impact stats={impactStats} />
      <Testimonials />
      <ResourcesTeaser />
      <FinalCta />
    </>
  );
}
