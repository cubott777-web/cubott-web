import Link from "next/link"
import Container from "../ui/Container"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
    Services: [
      { label: "Software Engineering", href: "/services#software" },
      { label: "Cloud Architecture", href: "/services#cloud" },
      { label: "DevOps & SRE", href: "/services#devops" },
      { label: "AI/ML Integration", href: "/services#ai-ml" },
    ],
    Resources: [
      { label: "Documentation", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Support", href: "/contact" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "mailto:contact@cubott.com", label: "Email" },
  ]

  return (
    <footer className="bg-cubott-navy text-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 group mb-6">
                <img 
                  src="/cubott-logo.webp" 
                  alt="Cubott Logo" 
                  className="h-10 w-auto brightness-0 invert"
                />
                <span className="text-2xl font-bold text-white">Cubott</span>
              </Link>
              <p className="text-gray-300 mb-6 max-w-sm">
                Engineering reliable, intelligent, and scalable digital systems for the next generation of enterprises.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-cubott-teal transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-cubott-teal transition-colors"
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Cubott. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

