import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI crawler policy.
 *
 * Tavnit's buyers use AI assistants, so being citable in AI answers is a
 * primary channel — not a side effect. Search-and-cite crawlers are therefore
 * allowed explicitly rather than by default, so intent is unambiguous.
 *
 * CCBot (Common Crawl) stays blocked: it is bulk training-corpus scraping with
 * no citation path back to us, so it is the one block that trades nothing away.
 */
export default function robots(): MetadataRoute.Robots {
  const citingAiCrawlers = [
    "GPTBot", // OpenAI training + grounding for ChatGPT
    "ChatGPT-User", // ChatGPT live retrieval when a user asks it to browse
    "OAI-SearchBot", // ChatGPT Search index
    "ClaudeBot", // Anthropic
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot", // Perplexity
    "Google-Extended", // Gemini / AI Overviews grounding
    "Applebot-Extended",
    "cohere-ai",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /s/ are personalized sales follow-up links — private by obscurity,
        // and worthless in a search index.
        disallow: ["/api/", "/_next/", "/s/"],
      },
      {
        userAgent: citingAiCrawlers,
        allow: "/",
        disallow: ["/api/", "/_next/", "/s/"],
      },
      {
        // Training-only bulk scraper, no citation benefit.
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
