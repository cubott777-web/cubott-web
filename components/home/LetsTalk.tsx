"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import Reveal from "@/components/motion/Reveal"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const WORDS = ["LET'S TALK.", "PING US."]
const SWAP_MS = 4400

/** Per-letter stagger and direction, fixed so server and client render the same thing. */
const seed = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Got a problem? Let's talk. — the close of the page: one typographic block, the whole thing is the link.
 * The word swaps on a loop: letters drop out and slide in with a random stagger.
 * Hover: the brackets echo outward.
 */
export default function LetsTalk() {
  const box = useRef<HTMLAnchorElement>(null)
  const [hover, setHover] = useState(false)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [word, setWord] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), SWAP_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section data-scene="dark" className="relative bg-navy-900 text-white" aria-labelledby="talk-title">
      <Link
        ref={box}
        href="/contact"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHover(true)
        }}
        onPointerLeave={() => setHover(false)}
        className="group relative block overflow-hidden px-5 py-16 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 md:py-20 lg:py-24"
        data-hover={hover ? "true" : "false"}
      >
        <Reveal as="p" y={10} className="font-mono text-sm uppercase tracking-[0.28em] text-blue-300/80 md:text-base">
          Got a problem?
        </Reveal>

        <Reveal as="div" delay={0.15} y={24} className="talk-word relative mt-6 inline-flex max-w-full items-center justify-center md:mt-8">
          <Bracket side="left" />
          {/* Both words share one grid cell, so the box is as wide as the longer one and never shifts */}
          <h2 id="talk-title" className="relative grid whitespace-nowrap font-bold leading-none" aria-label="Let's talk.">
            {WORDS.map((w, wi) => (
              <span key={w} aria-hidden="true" className="col-start-1 row-start-1 text-center" data-on={wi === word ? "true" : "false"}>
                {w.split("").map((ch, i) => (
                  <span
                    key={i}
                    className="talk-letter inline-block"
                    style={{ "--d": `${Math.round(seed(wi * 31 + i) * 380)}ms`, "--dir": seed(wi * 17 + i * 3) > 0.5 ? 1 : -1 } as React.CSSProperties}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <Bracket side="right" />
        </Reveal>

        <Reveal as="p" delay={0.35} y={10} className="mt-8 text-sm text-blue-100/60 md:mt-10 md:text-base">
          Tell us what isn&apos;t working. We&apos;ll tell you what we&apos;d build.{" "}
          <span className="font-medium text-white/90">{siteConfig.contactEmail}</span>
        </Reveal>
      </Link>
    </section>
  )
}

/** A thin bracket arc that echoes outward on hover. */
function Bracket({ side }: { side: "left" | "right" }) {
  return (
    <span aria-hidden="true" className={cn("talk-bracket relative hidden h-[1.1em] w-[0.42em] shrink-0 sm:block", side === "left" ? "mr-[0.05em]" : "ml-[0.05em] -scale-x-100")}>
      {[0, 1, 2].map((k) => (
        <svg key={k} viewBox="0 0 40 100" className="talk-arc absolute inset-0 h-full w-full overflow-visible" style={{ "--k": k } as React.CSSProperties} fill="none">
          <path d="M34 2C12 22 12 78 34 98" stroke="currentColor" strokeWidth={k === 0 ? 2.2 : 1.4} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </span>
  )
}
