import Link from "next/link"
import Container from "../ui/Container"
import { Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const platformLinks = [
    { label: "Features", href: "/#features" },
    { label: "Platform Overview", href: "/#platform" },
    { label: "Why Cubott", href: "/#why-cubott" },
    { label: "Request Demo", href: "/contact" },
  ]

  return (
    <footer className="bg-[#020608] border-t border-white/5">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <img
                src="/cubott-logo.webp"
                alt="Cubott"
                className="h-9 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white/70 font-bold text-lg tracking-tight group-hover:text-white transition-colors">
                Cubott
              </span>
            </Link>
            <p className="text-white/35 text-sm mb-6 leading-relaxed max-w-sm font-light">
              Multi-tenant SaaS platform that digitizes end-to-end dealership operations with complete traceability and role-based control.
            </p>
            <a
              href="mailto:contact@cubott.com"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass hover:bg-cubott-teal/10 hover:border-cubott-teal/20 transition-all group"
            >
              <Mail size={14} className="text-cubott-teal" />
              <span className="text-white/50 group-hover:text-white/80 transition-colors text-sm font-light">
                contact@cubott.com
              </span>
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-white/50 text-xs uppercase tracking-[0.15em] mb-5">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/30 hover:text-white/70 transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="text-white/30 hover:text-white/70 transition-colors text-sm font-light"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs font-light">© {currentYear} Cubott Technologies. All rights reserved.</p>
          <p className="text-white/15 text-xs font-light">Built for modern dealerships.</p>
        </div>
      </Container>
    </footer>
  )
}
