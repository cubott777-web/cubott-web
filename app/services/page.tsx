import { Metadata } from "next"
import Container from "@/components/ui/Container"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { Code2, Cloud, Cog, Brain, Smartphone, Building2, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Services - Software Development & Cloud Solutions | Cubott",
  description: "Enterprise software engineering, cloud architecture, DevOps automation, AI/ML integration, and technology consulting services.",
}

export default function ServicesPage() {
  const services = [
    {
      icon: Code2,
      title: "Software Engineering",
      description: "Custom enterprise software development with modern architectures and best practices.",
      features: [
        "Full-stack web applications",
        "Microservices architecture",
        "API design and development",
        "Legacy system modernization",
        "Code quality and testing",
        "Technical documentation",
      ],
      tech: ["React", "Node.js", "Python", "Go", "TypeScript", "PostgreSQL"],
    },
    {
      icon: Cloud,
      title: "Cloud Architecture & Deployments",
      description: "Design, build, and deploy scalable cloud infrastructure on major cloud platforms.",
      features: [
        "Cloud migration strategy",
        "Multi-cloud architecture",
        "Auto-scaling and load balancing",
        "Disaster recovery planning",
        "Cost optimization",
        "Security and compliance",
      ],
      tech: ["AWS", "Azure", "GCP", "Oracle Cloud", "Terraform", "Docker"],
    },
    {
      icon: Cog,
      title: "DevOps & SRE Automation",
      description: "Streamline your development and operations with automated CI/CD pipelines.",
      features: [
        "CI/CD pipeline setup",
        "Infrastructure as Code",
        "Container orchestration",
        "Monitoring and observability",
        "Incident response automation",
        "Performance optimization",
      ],
      tech: ["Kubernetes", "Jenkins", "GitHub Actions", "Prometheus", "Grafana", "Ansible"],
    },
    {
      icon: Brain,
      title: "AI/ML Integration",
      description: "Implement intelligent automation and machine learning solutions for your business.",
      features: [
        "ML model development",
        "Data pipeline engineering",
        "Natural language processing",
        "Computer vision solutions",
        "Predictive analytics",
        "Model deployment and monitoring",
      ],
      tech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "MLflow", "Databricks"],
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Applications",
      description: "Modern, responsive applications that deliver exceptional user experiences.",
      features: [
        "Progressive web apps",
        "Native mobile development",
        "Cross-platform solutions",
        "Responsive design",
        "Performance optimization",
        "App store deployment",
      ],
      tech: ["React", "Next.js", "React Native", "Flutter", "Tailwind CSS", "Redux"],
    },
    {
      icon: Building2,
      title: "Enterprise Consulting",
      description: "Strategic technology guidance for digital transformation and modernization.",
      features: [
        "Technology assessment",
        "Architecture review",
        "Cloud strategy",
        "Team augmentation",
        "Technical training",
        "Best practices guidance",
      ],
      tech: ["Agile", "Scrum", "SAFe", "TOGAF", "DevOps", "SRE"],
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-cubott-navy via-cubott-navy-light to-cubott-navy text-white">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              End-to-end technology solutions tailored to your business needs, from initial concept to production deployment.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <Container>
          <div className="space-y-24">
            {services.map((service, index) => (
              <AnimatedSection key={service.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-cubott-teal to-cubott-navy flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-cubott-navy mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="w-5 h-5 text-cubott-teal mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-3">TECHNOLOGIES</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-cubott-navy/5 text-cubott-navy rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cubott-teal/20 to-cubott-navy/20 rounded-2xl transform rotate-3"></div>
                      <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <div className="h-64 flex items-center justify-center">
                          <service.icon className="w-32 h-32 text-cubott-navy/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to deliver projects on time, on budget, and beyond expectations.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understand your business goals and technical requirements" },
              { step: "02", title: "Planning", description: "Design architecture and create detailed project roadmap" },
              { step: "03", title: "Development", description: "Build with agile sprints, continuous testing, and feedback" },
              { step: "04", title: "Deployment", description: "Launch to production with monitoring and ongoing support" },
            ].map((phase, index) => (
              <AnimatedSection key={phase.step} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-cubott-teal/20 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold text-cubott-navy mb-3">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-cubott-navy to-cubott-navy-light text-white">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and explore how we can help bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-cubott-teal text-white rounded-lg font-semibold hover:bg-cubott-teal-dark transition-all shadow-lg hover:shadow-xl"
            >
              Schedule a Consultation
            </a>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  )
}

