import { Metadata } from "next"
import Container from "@/components/ui/Container"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { Target, Heart, Lightbulb, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Cubott - Our Mission & Values",
  description: "Learn about Cubott's mission to simplify complex engineering problems through reliable, scalable, and intelligent solutions.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay at the forefront of technology, constantly exploring new tools and methodologies to deliver cutting-edge solutions.",
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "We build systems that work—consistently, securely, and at scale. Your trust is our top priority.",
    },
    {
      icon: Heart,
      title: "Craftsmanship",
      description: "We take pride in our work, writing clean code, designing elegant architectures, and delivering quality at every level.",
    },
    {
      icon: Target,
      title: "Integrity",
      description: "We operate with transparency, honesty, and respect in every client interaction and engineering decision.",
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-cubott-navy via-cubott-navy-light to-cubott-navy text-white">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Cubott
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              We're a team of passionate engineers, architects, and innovators dedicated to building technology that makes a difference.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  To <span className="text-cubott-teal font-semibold">simplify complex engineering problems</span> through reliable, scalable, and intelligent solutions that empower businesses to thrive in the digital age.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that great technology should be accessible, understandable, and transformative. Whether you're a startup looking to build your first MVP or an enterprise scaling to millions of users, we're here to make it happen.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cubott-teal to-cubott-navy opacity-10 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white p-8 rounded-2xl border-2 border-cubott-teal/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-cubott-navy mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the trusted technology partner for enterprises worldwide, recognized for our technical excellence, innovative solutions, and unwavering commitment to client success.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every line of code we write.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-cubott-teal transition-all hover:shadow-xl">
                  <div className="w-16 h-16 mb-6 rounded-xl bg-cubott-teal/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-cubott-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-cubott-navy mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Cubott was founded with a simple belief: <span className="text-cubott-teal font-semibold">great technology should empower businesses, not complicate them</span>. We've worked with startups and enterprises alike, helping them navigate the complex world of modern software development, cloud architecture, and digital transformation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our team brings together decades of experience from leading tech companies, having built systems that serve millions of users. We've seen what works and what doesn't—and we apply those lessons to every project we take on.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Cubott is trusted by businesses across industries to deliver mission-critical systems, innovative solutions, and strategic technology guidance. We're not just developers or consultants—we're your long-term technology partners, invested in your success.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-cubott-navy to-cubott-navy-light text-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Want to Learn More?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how Cubott can help transform your technology and accelerate your business goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-cubott-teal text-white rounded-lg font-semibold hover:bg-cubott-teal-dark transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  )
}

