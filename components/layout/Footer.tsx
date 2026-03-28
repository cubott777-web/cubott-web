import Link from "next/link"
import Container from "../ui/Container"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Platform: [
      { label: "Features", href: "/#features" },
      { label: "Platform Overview", href: "/#platform" },
      { label: "Why Cubott", href: "/#why-cubott" },
      { label: "Request Demo", href: "/contact" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@cubott.com", label: "Email" },
  ]

  return (
    <footer className="bg-[#020608] border-t border-white/5">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <img src="/cubott-logo.webp" alt="Cubott" className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="font-bagel text-xl text-white tracking-wide">Cubott</span>
            </Link>
            <p className="text-white/35 text-sm mb-6 leading-relaxed max-w-xs font-light">
              Multi-tenant SaaS platform that digitizes end-to-end dealership operations with complete traceability and role-based control.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:bg-cubott-teal/15 hover:border-cubott-teal/20 transition-all"
                  aria-label={s.label}
                >
                  <s.icon size={15} className="text-white/40" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white/50 text-xs uppercase tracking-[0.15em] mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/30 hover:text-white/70 transition-colors text-sm font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs font-light">© {currentYear} Cubott Technologies. All rights reserved.</p>
          <p className="text-white/15 text-xs font-light">Precision Intelligence System</p>
        </div>
      </Container>
    </footer>
  )
}
