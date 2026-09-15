export const siteConfig = {
  name: "Cubott",
  legalName: "Cubott Technologies",
  url: "https://cubott.com",
  tagline: "We help founders shape their product, not just build it.",
  description:
    "Cubott is a custom software and product engineering company in Hyderabad. We help founders shape their product — business platforms, workflow systems and custom applications built around the way a business actually works. Serving Andhra Pradesh and Telangana, working globally.",
  contactEmail: "contact@cubott.com",
  contactPhone: "+91 99599 12812",
  linkedin: "https://www.linkedin.com/company/cubott/",
  foundingDate: "2025",
  founders: ["Prakash Chelluri", "Nimmu Vinay", "Lakshmi Krishna"],
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

export const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const
