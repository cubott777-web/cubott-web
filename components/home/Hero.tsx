"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import HeroSignature from "@/components/home/HeroSignature"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { BEATS } from "@/components/three/hero-clock"

const EASE = [0.16, 1, 0.3, 1] as const

const SECOND_LINE = "we help founders shape their product, not just build it.".split(" ")

/**
 * Hero: the cube isn't an illustration next to the headline — it's the set. Full-bleed, it opens on
 * a macro shot of a single seam and pulls back as its plates lock; the headline arrives with that
 * reveal instead of sitting beside it on load, so the two read as one cinematic beat.
 *
 * The name gets its own beat first — "We're Cubott." lands a fraction of a second ahead of the rest
 * of the sentence, so the brand is emphasised through timing and scale rather than a separate
 * loading-screen effect in front of the page.
 */
export default function Hero() {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const nameDelay = reduced ? 0 : BEATS.reveal - 0.55
  const lineDelay = reduced ? 0 : BEATS.reveal - 0.15
  const ctaDelay = reduced ? 0.1 : BEATS.reveal + 0.55

  return (
    <section data-scene="dark" className="relative isolate min-h-screen overflow-hidden bg-navy-900 text-white" aria-labelledby="hero-title">
      {/* ground: isometric grid across the whole scene, a low blue horizon, a touch of grain — the
          glow is anchored low-right, toward the cube, so the far side of the viewport still has
          depth instead of reading as empty navy */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <div className="absolute inset-0 iso-grid [mask-image:radial-gradient(ellipse_at_68%_62%,black_20%,transparent_85%)]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 68% 68%, rgba(37,99,235,0.28), transparent 62%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 8% 15%, rgba(59,142,210,0.08), transparent 55%)" }} />
        <div className="grain absolute inset-0 opacity-60 mix-blend-overlay" />
      </div>

      {/* the cube: full-bleed, the hero's set rather than a boxed illustration — nudged toward the
          lower-right so it anchors the composition near the CTA baseline instead of hanging in an
          open field */}
      <HeroSignature className="-z-10 translate-y-[6%] lg:translate-x-[24%] lg:translate-y-[10%]" />

      {/* a scrim under the text column so the headline stays legible over the object behind it */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full lg:w-[58%]" style={{ background: "linear-gradient(100deg, rgba(11,20,38,0.92) 0%, rgba(11,20,38,0.74) 50%, rgba(11,20,38,0) 100%)" }} />

      <Container className="relative flex min-h-screen flex-col justify-center pb-16 pt-[calc(var(--header-h)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+1rem)]">
        <div className="max-w-2xl">
          <h1 id="hero-title" className="display-hero max-w-[16ch]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: 0.8, delay: nameDelay, ease: EASE }}
                className="relative inline-block"
              >
                We&apos;re{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="name-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[2.2em] w-[3.4em] -translate-x-1/2 rounded-full blur-2xl"
                    style={{ background: "radial-gradient(closest-side, rgba(96,165,250,0.55), transparent 72%)" }}
                  />
                  <span className="ink-sky-live">Cubott.</span>
                </span>
              </motion.span>
            </span>
            <span className="mt-1 block">
              {SECOND_LINE.map((word, i) => (
                <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-top">
                  <motion.span
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{ duration: 0.7, delay: lineDelay + i * (reduced ? 0 : 0.045), ease: EASE }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: ctaDelay, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact" size="lg" variant="primary-dark" arrow>
              Start a conversation
            </Button>
            <Button href="#products" size="lg" variant="ghost-dark" arrow>
              See what we&apos;ve built
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
