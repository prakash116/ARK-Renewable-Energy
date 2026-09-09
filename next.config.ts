import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectPages =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName !== undefined &&
  !repositoryName.endsWith(".github.io");
const basePath = isProjectPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  images: {
    // GitHub Pages has no image-optimization server.
    unoptimized: true,
    // Next 16 only allows quality 75 unless listed explicitly.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  // Three.js and R3F ship large ESM bundles; keep them out of the server bundle
  // where possible and let Turbopack tree-shake the client bundle.
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
  },
};

export default nextConfig;
