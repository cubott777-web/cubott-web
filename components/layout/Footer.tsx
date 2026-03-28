import Link from "next/link"
import Container from "../ui/Container"
import { Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: "Features", href: "/#features" },
    { label: "Platform", href: "/#platform" },
    { label: "Why Cubott", href: "/#why-cubott" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-[#020608] border-t border-white/5">
      <Container>
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6">

          <Link href="/" className="flex-shrink-0 group">
            <span className="text-white/50 font-black text-sm tracking-tight group-hover:text-white/80 transition-colors">Cubott</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/30 hover:text-white/70 transition-colors font-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:contact@cubott.com"
            className="flex items-center gap-2 text-sm text-white/30 hover:text-cubott-teal transition-colors font-light flex-shrink-0"
          >
            <Mail size={13} />
            contact@cubott.com
          </a>

        </div>

        <div className="border-t border-white/[0.04] py-4 text-center">
          <p className="text-white/15 text-xs font-light">© {currentYear} Cubott Technologies. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
