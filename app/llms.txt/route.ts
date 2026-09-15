import { siteConfig, phoneHref } from "@/lib/site"
import { solutionCategories } from "@/content/company"
import { products } from "@/content/products"
import { dealer } from "@/content/dealer"

/**
 * /llms.txt — the plain-text summary AI assistants read when deciding what a site is about.
 * Facts only, nothing that isn't already on the site.
 */
export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Facts

- Legal name: ${siteConfig.legalName}
- Founded: ${siteConfig.foundingDate}
- Founders: ${siteConfig.founders.join(", ")}
- Location: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, India
- Area served: ${siteConfig.areaServed.join(", ")}; works with clients worldwide
- Phone: ${phoneHref}
- Email: ${siteConfig.contactEmail}
- LinkedIn: ${siteConfig.linkedin}

## What Cubott builds

${solutionCategories.map((c) => `- **${c.title}** — ${c.text}`).join("\n")}

## Products

${products.map((p) => `- **${p.title}** (${p.sector}) — ${p.line} ${siteConfig.url}${p.href}`).join("\n")}

### ${dealer.name}

${dealer.summary} It manages: ${dealer.manages.join("; ")}.

## Pages

- Home: ${siteConfig.url}/
- Products — what we build and what we've built: ${siteConfig.url}/products
- About: ${siteConfig.url}/about
- Contact: ${siteConfig.url}/contact
- Dealer Management: ${siteConfig.url}/products/dealer-management
- Privacy: ${siteConfig.url}/privacy
- Terms: ${siteConfig.url}/terms
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } })
}
