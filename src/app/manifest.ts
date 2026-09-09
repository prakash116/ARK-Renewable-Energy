import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#0b0f0e",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
