import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
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
