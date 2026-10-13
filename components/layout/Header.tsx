"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import CubottLogo from "@/components/brand/CubottLogo"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

/** Header floats over the dark canvas; it gains a blurred backing once the page scrolls. */
export default function Header() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  // The menu panel is a sibling of the bar, not a child: the bar's entry transform would otherwise become the
  // containing block for the fixed panel and collapse it to the bar's 72px height.
  return (
    <>
    <motion.header
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-500", scrolled && !open && "bg-navy-900/80 backdrop-blur-md", open && "bg-navy-900")}
    >
      <Container size="xl">
        <nav className="flex h-[72px] items-center justify-between" aria-label="Primary">
          <Link href="/" className="rounded-md" aria-label="Cubott home">
            <CubottLogo variant="dark" showMark={false} />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group/nav relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold tracking-tight text-white/70 transition-colors duration-300 hover:text-white",
                      active && "text-white"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-blue-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:scale-x-100",
                        active && "scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:block">
            <Button href="/contact" size="sm" variant="primary-dark" arrow>
              Let&apos;s build
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

    </motion.header>
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-navy-900 md:hidden"
        >
          <Container size="xl" className="flex min-h-full flex-col py-6">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="border-b border-line"
                >
                  <Link href={item.href} className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
                    {item.label}
                    <span className="text-blue-400" aria-hidden="true">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact" size="lg" variant="primary-dark" className="w-full" arrow onClick={() => setOpen(false)}>
                Let&apos;s build
              </Button>
            </div>
            <p className="mt-auto pt-10 text-sm text-white/50">Technology for businesses that don&apos;t fit inside a template.</p>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
