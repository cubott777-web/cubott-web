import Link from "next/link"
import Container from "@/components/ui/Container"
import CubottLogo from "@/components/brand/CubottLogo"
import { siteConfig } from "@/lib/site"

const columns = [
  {
    title: "Company",
    links: [
      { label: "Products", href: "/products" },
      { label: "Solutions", href: "/solutions" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [{ label: "Dealer Management", href: "/products/dealer-management" }],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <Container size="xl" className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href="/" aria-label="Cubott home" className="inline-block rounded-md">
              <CubottLogo />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate">
              We build systems that turn complexity into clarity. Products, business systems and custom software for
              businesses that don&apos;t fit inside a template.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-5 inline-block text-[15px] font-medium text-navy underline-offset-4 hover:text-blue hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
          {columns.map((col) => (
            <nav key={col.title} className="md:col-span-3" aria-label={col.title}>
              <h2 className="eyebrow text-navy/60">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-navy/80 hover:text-blue">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-navy/10 pt-6 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>Build. Connect. Grow.</p>
        </div>
      </Container>
    </footer>
  )
}
