"use client"

import { motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { EASE, DUR } from "@/components/motion/tokens"

/**
 * Route transition: interior pages settle in from a few pixels below. The homepage is left alone —
 * its hero runs its own choreography and must not be faded over.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  if (pathname === "/" || reduce) return <>{children}</>
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DUR.base, ease: EASE }}>
      {children}
    </motion.div>
  )
}
