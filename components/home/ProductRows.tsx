"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import MediaReveal from "@/components/motion/MediaReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import { useMediaQuery, REDUCED_MOTION } from "@/components/motion/useMediaQuery"
import { products, type Product } from "@/content/products"
import { cn } from "@/lib/utils"

/**
 * What we've built — proof, not a product catalogue. Each system gets a full showcase: a large,
 * always-playing clip and a short case for what it does, alternating sides down the page so it
 * reads as a sequence of real work rather than a list of SKUs.
 */
export default function ProductRows() {
  return (
    <section id="products" className="relative scroll-mt-16 bg-white py-14 md:py-20 lg:py-24" aria-labelledby="products-title">
      <Container>
        {/* Heading left, lede right and bottom-aligned — the same header rhythm as What we do */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <p className="eyebrow text-blue">Proof, not promises</p>
            </Reveal>
            <TextReveal as="h2" id="products-title" className="display-lg mt-3 max-w-[14ch] text-navy" delay={0.1}>
              What we&apos;ve built.
            </TextReveal>
          </div>
          <Reveal delay={0.35} className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2">
            <p className="max-w-sm text-base leading-relaxed text-slate md:text-lg">
              Examples of the systems we&apos;ve built for real businesses — proof of what a Cubott system looks like once it&apos;s running.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 space-y-14 md:mt-16 md:space-y-20 lg:space-y-24">
          {products.map((p, i) => (
            <li key={p.key} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
              <Stagger as="div" gap={0.09} className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                <StaggerItem>
                  <p className="text-sm font-medium text-slate">{p.sector}</p>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-navy md:text-4xl">{p.title}</h3>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate md:text-lg">{p.line}</p>
                </StaggerItem>
                <StaggerItem>
                  <Link href={p.href} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-blue">
                    Explore product
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </StaggerItem>
              </Stagger>
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1")}>
                <MediaReveal delay={0.1}>
                  <Link href={p.href} aria-label={`${p.title} — explore product`} className="group/media relative block aspect-video overflow-hidden rounded-2xl bg-navy-900 shadow-frame">
                    <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.025] motion-reduce:transform-none">
                      <ProductMedia product={p} />
                    </div>
                  </Link>
                </MediaReveal>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <Container>
        <Reveal as="p" y={10} className="mt-10 text-center text-sm text-slate md:mt-12">
          Something else entirely?{" "}
          <Link href="/contact" className="font-semibold text-navy underline-offset-4 hover:text-blue hover:underline">
            That&apos;s usually where we start.
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

/** One probe per clip per page, however many times the media mounts. */
const probes = new Map<string, Promise<boolean>>()
function probe(src: string) {
  let p = probes.get(src)
  if (!p) {
    p = fetch(src, { method: "HEAD" })
      .then((r) => r.ok && (r.headers.get("content-type") ?? "").startsWith("video/"))
      .catch(() => false)
    probes.set(src, p)
  }
  return p
}

/**
 * The clip if it exists, else the poster, else a labelled frame. Never a mock.
 * Autoplay is native (muted + playsInline), not a JS-driven visibility gate: browsers already defer
 * and pause offscreen video on their own, and a hand-rolled IntersectionObserver has no reliable
 * signal on a backgrounded or hidden tab. Reduced motion just pauses it in place on its first frame.
 */
function ProductMedia({ product }: { product: Product }) {
  const [video, setVideo] = useState<boolean | null>(product.video ? null : false)
  const [poster, setPoster] = useState(true)
  const el = useRef<HTMLVideoElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)

  useEffect(() => {
    if (!product.video) return
    let cancelled = false
    probe(product.video).then((ok) => !cancelled && setVideo(ok))
    return () => {
      cancelled = true
    }
  }, [product.video])

  useEffect(() => {
    const v = el.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => {})
  }, [reduced, video])

  if (video) {
    return (
      <video
        ref={el}
        src={product.video}
        poster={product.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-top"
      />
    )
  }
  if (product.poster && poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.poster} alt="" onError={() => setPoster(false)} className="h-full w-full object-cover object-top" />
  }
  return (
    <div className="grid h-full w-full place-items-center grid-fine text-blue-200/60">
      <span className="eyebrow">{product.title}</span>
    </div>
  )
}
