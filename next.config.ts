import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Search Console reports /index.html (on both hosts) as a 404 Google
        // keeps recrawling — a leftover from the pre-Next static site that
        // something still links to. Permanent redirect so the request
        // consolidates onto "/" instead of returning a 404 every month.
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // The Vercel preview/production alias (tavnit-landing.vercel.app)
        // serves the whole site with a 200 and is crawlable. Every page
        // canonicalises to www.tavnit.io, so Google should consolidate, but a
        // canonical is a hint and a noindex header is a directive; the
        // header removes the duplicate host from the index outright without
        // touching the Vercel domain configuration.
        source: "/:path*",
        has: [{ type: "host", value: "(.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
