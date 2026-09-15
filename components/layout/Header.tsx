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

/**
 * Header adapts to the scene beneath it. Pages mark dark scenes with `data-scene="dark"`;
 * while one sits under the header the palette flips to the reverse version.
 */
export default function Header() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
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
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene="dark"]'))
    const probe = 36 // vertical centre of the header
    const check = () => {
      setOnDark(
        scenes.some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= probe && r.bottom >= probe
        })
      )
    }
    const raf = requestAnimationFrame(check)
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  const dark = onDark && !open

  return (
    <motion.header
      initial={reduce ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled && !open && (dark ? "bg-navy/80 backdrop-blur-md" : "bg-white/85 backdrop-blur-md"),
        scrolled && !open && "border-b",
        dark ? "border-white/10" : "border-navy/10",
        open && "bg-white"
      )}
    >
      <Container size="xl">
        <nav className="flex h-[72px] items-center justify-between" aria-label="Primary">
          <Link href="/" className="rounded-md" aria-label="Cubott home">
            <CubottLogo variant={dark ? "dark" : "light"} showMark={false} />
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
                      "group/nav relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold tracking-tight transition-colors duration-300",
                      dark ? "text-white/75 hover:text-white" : "text-navy/70 hover:text-navy",
                      active && (dark ? "text-white" : "text-navy")
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:scale-x-100",
                        active && "scale-x-100",
                        dark ? "bg-blue-400" : "bg-blue"
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:block">
            <Button href="/contact" size="sm" variant={dark ? "primary-dark" : "primary"} arrow>
              Let&apos;s build
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden",
              dark ? "text-white" : "text-navy"
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white md:hidden"
          >
            <Container size="xl" className="flex min-h-full flex-col py-6">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                    className="border-b border-navy/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-navy"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <span className="text-blue" aria-hidden="true">→</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/contact" size="lg" className="w-full" arrow onClick={() => setOpen(false)}>
                  Let&apos;s build
                </Button>
              </div>
              <p className="mt-auto pt-10 text-sm text-slate">Technology for businesses that don&apos;t fit inside a template.</p>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
