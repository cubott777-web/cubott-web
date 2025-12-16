import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import WhyCubott from "@/components/home/WhyCubott"
import CaseStudies from "@/components/home/CaseStudies"
import TechStack from "@/components/home/TechStack"
import CTA from "@/components/home/CTA"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <WhyCubott />
      <CaseStudies />
      <TechStack />
      <CTA />
    </main>
  )
}
