export const siteConfig = {
  name: "Cubott",
  legalName: "Cubott Technologies",
  // The www host is the one Vercel serves; the apex redirects to it. Every canonical, sitemap
  // entry and schema @id derives from this, so it must match what actually returns 200.
  url: "https://www.cubott.com",
  tagline: "We help founders shape their product, not just build it.",
  description:
    "Cubott is a custom software and product engineering company in Hyderabad. We help founders shape their product — business platforms, workflow systems and custom applications built around the way a business actually works. Serving Andhra Pradesh and Telangana, working globally.",
  contactEmail: "contact@cubott.com",
  contactPhone: "+91 99599 12812",
  linkedin: "https://www.linkedin.com/company/cubott/",
  foundingDate: "2025",
  address: {
    street: "Flat 403, Kavuries Laasya Heights, Road No. 3/9, Mathrusree Nagar, Miyapur",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500049",
    country: "IN",
  },
  /** Where we actively work today; the company itself serves clients anywhere. */
  areaServed: ["Andhra Pradesh", "Telangana", "India"],
}

/** E.164 form for tel: links and structured data. */
export const phoneHref = siteConfig.contactPhone.replace(/\s+/g, "")

/** Hero intent chips → /contact?intent=key, which prefills the message. */
export const intents = [
  { key: "system", label: "Run my business on one system", message: "I want to run my business on one system. Today we use…" },
  { key: "product", label: "Launch a product", message: "I want to launch a product. The idea is…" },
  { key: "replace", label: "Replace software that doesn't fit", message: "Our current software doesn't fit. What isn't working is…" },
] as const

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const
