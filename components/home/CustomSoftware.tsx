"use client"

import { motion, useReducedMotion } from "framer-motion"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import NodeChip from "@/components/core/NodeChip"
import CubottMark from "@/components/brand/CubottMark"
import { builderInputs } from "@/content/company"

/**
 * The primary conversion scene. Large type, white space, no urgency.
 * Then the System Builder: six inputs connect into one system built around the business.
 */
export default function CustomSoftware() {
  const reduce = useReducedMotion()
  const n = builderInputs.length
  // Inputs on the left edge, spaced vertically; the core sits at the right.
  const ys = builderInputs.map((_, i) => 10 + (i * 80) / (n - 1))
  const core = { x: 82, y: 50 }

  return (
    <section id="custom-software" className="bg-white py-28 md:py-44" aria-labelledby="custom-title">
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <h2 id="custom-title" className="display-xl text-navy">Your business isn&apos;t standard.</h2>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="display-xl mt-4 text-navy/35" role="heading" aria-level={3}>
              Your software shouldn&apos;t be either.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-10 max-w-xl text-xl leading-relaxed text-slate md:text-2xl">
              Tell us how your business actually works.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" arrow>
                Build something with Cubott
              </Button>
              <Button href="/work" variant="ghost" size="lg" arrow>
                Explore our work
              </Button>
            </div>
          </Reveal>
        </div>

        {/* System builder */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="eyebrow text-blue">The system builder</p>
          </Reveal>
          <div className="relative mt-8 h-[420px] w-full md:h-[520px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {ys.map((y, i) => (
                <motion.path
                  key={i}
                  d={`M 14 ${y} C 45 ${y}, 55 ${core.y}, ${core.x} ${core.y}`}
                  fill="none"
                  stroke="#2563EB"
                  strokeOpacity={0.55}
                  strokeWidth={1.25}
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 1.2, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </svg>

            {builderInputs.map((label, i) => (
              <motion.div
                key={label}
                className="absolute"
                style={{ left: "0%", top: `${ys[i]}%`, y: "-50%" }}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.18 }}
              >
                <NodeChip label={label} tone="light" size="sm" className="md:px-3.5 md:py-1.5 md:text-xs" />
              </motion.div>
            ))}

            <motion.div
              className="absolute flex flex-col items-center"
              style={{ left: `${core.x}%`, top: `${core.y}%`, x: "-50%", y: "-50%" }}
              initial={reduce ? false : { opacity: 0.25, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.9, delay: 1.3 }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full border border-navy/10 bg-surface shadow-card md:h-36 md:w-36">
                <CubottMark className="h-12 w-12 md:h-20 md:w-20" />
              </div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="mt-4 whitespace-nowrap text-center"
              >
                <span className="eyebrow block text-navy">One system</span>
                <span className="mt-1 block text-sm text-slate">Built around your business.</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
