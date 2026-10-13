import Link from "next/link"
import { Linkedin } from "lucide-react"
import Container from "@/components/ui/Container"
import CubottLogo from "@/components/brand/CubottLogo"
import Reveal from "@/components/motion/Reveal"
import { nav, siteConfig, phoneHref } from "@/lib/site"

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

/** Small by design: a brand row and a legal row. The sitemap lives in the header. */
export default function Footer() {
  return (
    <footer className="mt-3 lg:mt-6">
      <Container size="xl">
        <Reveal y={10} className="flex items-center justify-between gap-6 border-t border-line py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Link href="/" aria-label="Cubott home" className="rounded-md">
              <CubottLogo variant="dark" markClassName="h-8" />
            </Link>
            <address className="flex flex-col gap-1 text-sm not-italic text-white/50 sm:flex-row sm:items-center sm:gap-5">
              <span>
                {siteConfig.address.city}, {siteConfig.address.region}
              </span>
              <a href={`tel:${phoneHref}`} className="transition-colors hover:text-white">
                {siteConfig.contactPhone}
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`} className="transition-colors hover:text-white">
                {siteConfig.contactEmail}
              </a>
            </address>
          </div>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Cubott on LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition-[color,background-color,transform] duration-300 hover:-translate-y-px hover:bg-white/[0.06] hover:text-white"
          >
            <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal y={8} delay={0.1} className="flex flex-col gap-3 border-t border-line py-5 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
            <span className="mx-2 text-white/15">·</span>
            All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/60 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="h-3 w-px bg-white/15" />
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </footer>
  )
}
