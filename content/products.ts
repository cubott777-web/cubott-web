/**
 * Products shown on the homepage as proof of what Cubott builds — not a product catalogue, but
 * evidence that Cubott builds real, running systems for different kinds of business.
 * Videos live in /public/video. Add `video`/`poster` once a clip exists (the page probes it and
 * falls back to the poster, then to a labelled frame — nothing is mocked).
 */
export interface Product {
  key: string
  title: string
  sector: string
  line: string
  href: string
  video?: string
  poster?: string
}

export const products: Product[] = [
  {
    key: "dealer",
    title: "Dealership Management",
    sector: "Agricultural machinery dealers",
    line: "Service operations, parts, warranty and workshop workflows — connected in one system.",
    href: "/products/dealer-management",
    video: "/video/dealer.mp4",
    poster: "/video/dealer.jpg",
  },
  {
    key: "clinic",
    title: "Clinic Management",
    sector: "Clinics and practices",
    line: "Patient, appointment and clinic operations brought into one connected workflow.",
    href: "/products",
    video: "/video/clinic.webm",
  },
  {
    key: "school",
    title: "School Management",
    sector: "Schools",
    line: "Students, attendance, fees and day-to-day school operations in one system.",
    href: "/products",
    video: "/video/School.webm",
  },
]
