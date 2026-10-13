import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Container from "@/components/ui/Container"
import ProductMedia from "@/components/ui/ProductMedia"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import MediaReveal from "@/components/motion/MediaReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import { products } from "@/content/products"

const tags = ["Service", "Parts & warranty", "Finance & gate pass", "9 roles", "Multi-tenant"]

/** What we've built: one featured system, then the rest as cards. Proof, not a catalogue. */
export default function Work() {
  const [featured, ...rest] = products
  return (
    <section id="products" className="stage scroll-mt-6 py-14 md:py-20" aria-labelledby="work-title">
      <Container>
        <Reveal as="p" y={8} className="eyebrow text-blue-400">
          Proof, not promises
        </Reveal>
        <TextReveal as="h2" id="work-title" className="display-lg mt-3 max-w-[14ch]" delay={0.1}>
          What we&apos;ve built.
        </TextReveal>

        <Link href={featured.href} className="card card-hover group mt-10 grid overflow-hidden md:mt-12 lg:grid-cols-12">
          <MediaReveal className="lg:col-span-7">
            <div className="aspect-video overflow-hidden bg-navy-900 lg:h-full lg:aspect-auto lg:min-h-[420px]">
              <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none">
                <ProductMedia video={featured.video} poster={featured.poster} label={featured.title} />
              </div>
            </div>
          </MediaReveal>
          <Stagger as="div" gap={0.08} className="flex flex-col justify-center p-7 md:p-10 lg:col-span-5">
            <StaggerItem>
              <p className="text-sm font-medium text-white/50">{featured.sector}</p>
            </StaggerItem>
            <StaggerItem>
              <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{featured.title}</h3>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 md:text-lg">{featured.line}</p>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t} className="pill">
                    {t}
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-blue-400">
                See the system
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </StaggerItem>
          </Stagger>
        </Link>

        <Stagger as="ul" gap={0.1} className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((p) => (
            <StaggerItem as="li" key={p.key}>
              <Link href={p.href} className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="aspect-video overflow-hidden bg-navy-900">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none">
                    <ProductMedia video={p.video} poster={p.poster} label={p.title} />
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm font-medium text-white/50">{p.sector}</p>
                  <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.line}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
