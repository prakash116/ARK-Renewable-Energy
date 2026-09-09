import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { jobs } from "@/data/jobs";

export const dynamic = "force-static";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/team", priority: 0.5, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
    { path: "/resources/catalogues", priority: 0.5, changeFrequency: "monthly" },
    { path: "/resources/manuals", priority: 0.5, changeFrequency: "monthly" },
    { path: "/resources/faqs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/investors", priority: 0.5, changeFrequency: "yearly" },
    { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { path: "/csr", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...solutions.map((s) => ({
      url: absoluteUrl(`/solutions/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...jobs.map((j) => ({
      url: absoluteUrl(`/careers/${j.slug}`),
      lastModified: new Date(j.postedOn),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
