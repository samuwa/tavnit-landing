import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
