import Link from "next/link"
import { Linkedin } from "lucide-react"
import Container from "@/components/ui/Container"
import CubottLogo from "@/components/brand/CubottLogo"
import Reveal from "@/components/motion/Reveal"
import { nav, siteConfig } from "@/lib/site"

const social = [{ label: "Cubott on LinkedIn", href: siteConfig.linkedin, Icon: Linkedin }]

// No dedicated pages yet — shown as static labels rather than dead links.
const legal = ["Privacy", "Terms"]

/**
 * Small by design: a brand row and a legal row, nothing else. The long-form sitemap already lives in
 * the header and in-page links — repeating it here just to fill width isn't information, it's floor.
 */
export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <Container size="xl">
        <Reveal y={10} className="flex items-center justify-between gap-6 py-5">
          <Link href="/" aria-label="Cubott home" className="rounded-md">
            <CubottLogo markClassName="h-8" />
          </Link>
          <ul className="flex items-center gap-2">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full text-navy/60 transition-[color,background-color,transform] duration-300 hover:-translate-y-px hover:bg-surface hover:text-navy"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="border-t border-navy/10">
        <Container size="xl">
          <Reveal y={8} delay={0.1} className="flex flex-col gap-3 py-5 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}
              <span className="mx-2 text-navy/15">·</span>
              All rights reserved
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-navy/70 hover:text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li aria-hidden="true" className="h-3 w-px bg-navy/15" />
              {legal.map((label) => (
                <li key={label} className="text-navy/40">
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </footer>
  )
}
