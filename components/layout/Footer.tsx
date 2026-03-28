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
      { label: "Case Studies", href: "/case-studies" },
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
    <footer className="bg-[#02070F] border-t border-white/5">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 group mb-5">
                <img
                  src="/cubott-logo.webp"
                  alt="Cubott Logo"
                  className="h-9 w-auto opacity-90"
                />
                <span className="text-xl font-bold text-white tracking-tight">Cubott</span>
              </Link>
              <p className="text-white/40 text-sm mb-2 leading-relaxed max-w-xs">
                Precision Intelligence System for agricultural machinery dealerships.
              </p>
              <p className="text-white/25 text-xs mb-6 max-w-xs">
                Digitize service operations, spare parts tracking, warranty approvals, and billing — all in one platform.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:bg-cubott-teal/20 hover:border-cubott-teal/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={16} className="text-white/50" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-white/70 text-sm uppercase tracking-wider mb-5">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/35 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-white/25 text-xs">
              © {currentYear} Cubott Technologies. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              All signals encrypted.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
