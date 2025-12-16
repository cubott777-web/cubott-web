import { Shield, Rocket, Users } from "lucide-react"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"

export default function WhyCubott() {
  const pillars = [
    {
      icon: Shield,
      title: "Enterprise-Grade Reliability",
      description: "Built to handle mission-critical workloads with 99.99% uptime SLAs and comprehensive security.",
      features: ["24/7 Monitoring", "Disaster Recovery", "Security First"],
    },
    {
      icon: Rocket,
      title: "Modern Scalable Solutions",
      description: "Cloud-native architectures designed to scale seamlessly from startup to enterprise.",
      features: ["Auto-Scaling", "Global CDN", "Microservices"],
    },
    {
      icon: Users,
      title: "Transparent Delivery",
      description: "Strong engineering culture with clear communication, agile methodology, and measurable results.",
      features: ["Agile Sprints", "Regular Updates", "Full Transparency"],
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-cubott-navy via-cubott-navy-light to-cubott-navy">
      <Container>
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Cubott
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine technical excellence with business acumen to deliver solutions that truly move the needle.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={pillar.title} delay={index * 0.15}>
              <div className="relative h-full p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cubott-teal transition-all duration-300 hover:bg-white/10">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cubott-teal to-cubott-teal-light rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
                
                {/* Icon */}
                <div className="relative w-16 h-16 mb-6 rounded-xl bg-cubott-teal/20 flex items-center justify-center">
                  <pillar.icon className="w-8 h-8 text-cubott-teal" />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="relative text-gray-300 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Features */}
                <ul className="relative space-y-2">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

