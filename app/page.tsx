import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import Work from "@/components/home/Work"
import Promises from "@/components/home/Promises"
import LetsTalk from "@/components/home/LetsTalk"

/** Homepage: hero (the signature) → what we do → what we've built → how we work → let's talk. */
export default function HomePage() {
  return (
    <main id="main" className="space-y-3 lg:space-y-6">
      <Hero />
      <Services />
      <Work />
      <Promises />
      <LetsTalk />
    </main>
  )
}
