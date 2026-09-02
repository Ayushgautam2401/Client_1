import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // generates /out folder for Netlify drag-and-drop
  trailingSlash: true, // Netlify needs this for clean URLs

  // Security headers (addressing SEC-005, SEC-006, SEC-017)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME-type sniffing (SEC-005)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Clickjacking protection (SEC-006)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Referrer policy (SEC-005)
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy (SEC-005)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // CSP — compatible with Next.js App Router + Google Fonts (SEC-004, SEC-005, SEC-006)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval in dev; tighten in production with nonces
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "frame-ancestors 'self'", // Clickjacking (SEC-006)
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          // HSTS — enable in production with HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920],
    minimumCacheTTL: 86400,
  },

  // Suppress source maps in production (SEC-017)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
