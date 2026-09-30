import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote CMS/CDN hosts here when a CMS is connected, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  poweredByHeader: false,
  // Baseline public-site security headers. No CSP yet: add one when third-party
  // services (donations, CRM, analytics) are approved, so it can list them.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
        ],
      },
    ];
  },
};

export default nextConfig;
