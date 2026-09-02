import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',    // generates /out folder for Netlify drag-and-drop
  trailingSlash: true, // Netlify needs this for clean URLs
  // Note: security headers are handled by netlify.toml (static export ignores async headers())

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920],
    minimumCacheTTL: 86400,
    unoptimized: true, // required for static export
  },

  // Suppress source maps in production (SEC-017)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
