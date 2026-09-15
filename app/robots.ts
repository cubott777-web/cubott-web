import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

/**
 * Everyone may crawl. The AI crawlers are listed by name on purpose: an explicit allow is what
 * they look for, and it documents that we want Cubott represented in ChatGPT, Claude and
 * Perplexity answers.
 */
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Bingbot", "CCBot"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
