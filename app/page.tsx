import Hero from "@/components/home/Hero"
import WhatWeDo from "@/components/home/WhatWeDo"
import ProductRows from "@/components/home/ProductRows"
import LetsTalk from "@/components/home/LetsTalk"

/** Homepage: hero (the signature) → what we do → our products → let's talk (the close). */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <WhatWeDo />
      <ProductRows />
      <LetsTalk />
    </main>
  )
}
