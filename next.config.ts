import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Configure Next.js to work properly in this subdirectory
  // This prevents conflicts with parent directory package files
  turbopack: {
    rules: {}
  },
  // Ensure proper path resolution
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Set the correct root directory to avoid lockfile conflicts
  outputFileTracingRoot: __dirname,
  // GitHub Pages static export configuration
  output: process.env.NEXT_PUBLIC_BASE_PATH ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure webpack to ignore parent directory
  webpack: (config) => {
    // Ignore parent directory node_modules
    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, 'node_modules')
    ];
    return config;
  }
};

export default nextConfig;
