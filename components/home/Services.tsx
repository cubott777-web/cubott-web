import { Code2, Cloud, Cog, Brain, Smartphone, Building2 } from "lucide-react"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"

export default function Services() {
  const services = [
    {
      icon: Code2,
      title: "Software Engineering",
      description: "Custom enterprise software development with modern architectures, clean code, and best practices.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Cloud,
      title: "Cloud Architecture & Deployments",
      description: "Design and deploy scalable cloud infrastructure on AWS, Azure, GCP, and Oracle Cloud.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Cog,
      title: "DevOps & SRE Automation",
      description: "CI/CD pipelines, infrastructure as code, observability, and site reliability engineering.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Brain,
      title: "AI/ML Integration",
      description: "Intelligent automation, machine learning pipelines, and AI-powered solutions for enterprise.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Applications",
      description: "Modern, responsive web and mobile apps built with React, Next.js, React Native, and Flutter.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Building2,
      title: "Enterprise Consulting",
      description: "Digital transformation strategy, technology assessment, and architectural planning.",
      color: "from-teal-500 to-green-500",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <Container>
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ideation to deployment, we deliver end-to-end solutions that drive business growth and technical excellence.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <div className="group relative h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-cubott-teal transition-all duration-300 hover:shadow-2xl hover:shadow-cubott-teal/10">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${service.color} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-cubott-navy" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-cubott-navy mb-4 group-hover:text-cubott-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cubott-teal/5 to-cubott-navy/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

