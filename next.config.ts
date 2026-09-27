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
      {
        // The Spanish docs follow the app's Spanish names (Colecciones,
        // Agentes); these two lived under the English words for a day.
        source: "/es/documentacion/collections",
        destination: "/es/documentacion/colecciones",
        permanent: true,
      },
      {
        source: "/es/documentacion/agents",
        destination: "/es/documentacion/agentes",
        permanent: true,
      },
    ];
  },
  async headers() {
    // The docs are embedded by the app (app.tavnit.io/docs, see
    // components/docs/embed.ts). Only the app and this site may frame them;
    // localhost covers the app's dev server.
    const docsFrame = [
      { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://app.tavnit.io http://localhost:*" },
    ];
    return [
      { source: "/docs", headers: docsFrame },
      { source: "/docs/:path*", headers: docsFrame },
      { source: "/es/documentacion", headers: docsFrame },
      { source: "/es/documentacion/:path*", headers: docsFrame },
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
