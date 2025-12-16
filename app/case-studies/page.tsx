import { Metadata } from "next"
import Link from "next/link"
import Container from "@/components/ui/Container"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies - Real Results | Cubott",
  description: "See how Cubott has helped enterprises transform their technology with measurable results and business impact.",
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "servicehub",
      title: "ServiceHub",
      subtitle: "Multi-Tenant Service Management Platform",
      industry: "Agricultural Machinery",
      client: "Enterprise Agricultural Equipment Service Provider",
      challenge: "Managing complex service workflows across sales, operations, and finance with poor visibility and manual processes.",
      solution: "Built a comprehensive SaaS platform with React, TypeScript, and PostgreSQL featuring multi-tenant architecture, real-time updates, and complete workflow automation.",
      results: [
        { label: "Feature Completion", value: "100%", icon: Zap },
        { label: "System Uptime", value: "99.9%", icon: TrendingUp },
        { label: "Active Users", value: "500+", icon: Users },
      ],
      impact: [
        "Reduced service completion time by 60%",
        "Eliminated manual paperwork",
        "Real-time visibility across all operations",
        "Improved customer satisfaction scores",
      ],
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "fintech",
      title: "Global Financial Services Platform",
      subtitle: "Cloud Migration & Microservices Architecture",
      industry: "FinTech",
      client: "International Banking Institution",
      challenge: "Legacy monolithic system causing scalability issues, high costs, and inability to deploy new features quickly.",
      solution: "Migrated to AWS cloud with microservices architecture, implementing event-driven patterns and CI/CD automation.",
      results: [
        { label: "System Uptime", value: "99.99%", icon: TrendingUp },
        { label: "Cost Reduction", value: "60%", icon: Zap },
        { label: "Deploy Speed", value: "10x", icon: ArrowRight },
      ],
      impact: [
        "Zero-downtime migration completed",
        "Reduced infrastructure costs by 60%",
        "Deployment time from weeks to hours",
        "Improved system reliability significantly",
      ],
      tech: ["AWS", "Kubernetes", "Terraform", "Go", "PostgreSQL", "Redis"],
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: "ecommerce",
      title: "E-Commerce Infrastructure",
      subtitle: "Scalable Event-Driven Architecture",
      industry: "Retail",
      client: "Global E-Commerce Platform",
      challenge: "Unable to handle peak traffic during sales events, frequent system crashes, and poor customer experience.",
      solution: "Built event-driven serverless architecture on GCP with auto-scaling, caching strategies, and global CDN distribution.",
      results: [
        { label: "Scale", value: "10x", icon: TrendingUp },
        { label: "Response Time", value: "<50ms", icon: Zap },
        { label: "Availability", value: "99.95%", icon: Users },
      ],
      impact: [
        "Successfully handled 10M+ daily transactions",
        "Sub-50ms API response times",
        "Zero downtime during Black Friday",
        "Improved conversion rates by 25%",
      ],
      tech: ["GCP", "Cloud Functions", "Pub/Sub", "Redis", "MongoDB", "Cloud CDN"],
      gradient: "from-violet-600 to-fuchsia-600",
    },
    {
      id: "healthcare",
      title: "Healthcare Data Platform",
      subtitle: "HIPAA-Compliant ML Pipeline",
      industry: "Healthcare",
      client: "Healthcare Analytics Company",
      challenge: "Manual data processing, lack of insights, and compliance concerns with patient data handling.",
      solution: "Developed HIPAA-compliant data lake with automated ML pipelines for predictive analytics and real-time insights.",
      results: [
        { label: "Compliance", value: "100%", icon: TrendingUp },
        { label: "Faster Insights", value: "80%", icon: Zap },
        { label: "Data Points", value: "1B+", icon: Users },
      ],
      impact: [
        "Full HIPAA compliance achieved",
        "80% faster time to insights",
        "Automated reporting and analytics",
        "Improved patient outcomes through predictive models",
      ],
      tech: ["Azure", "Databricks", "Python", "MLflow", "Azure Security", "Power BI"],
      gradient: "from-pink-600 to-rose-600",
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-cubott-navy via-cubott-navy-light to-cubott-navy text-white">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-cubott-teal" />
              <span className="text-sm font-medium">Success Stories</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Real Results, Real Impact
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              See how we've helped enterprises transform their technology and achieve measurable business outcomes.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white">
        <Container>
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${study.gradient} text-white text-sm font-semibold mb-4`}>
                      {study.industry}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-cubott-navy mb-2">
                      {study.title}
                    </h2>
                    <p className="text-xl text-cubott-teal mb-6">{study.subtitle}</p>

                    {/* Challenge */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Challenge</h3>
                      <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Solution</h3>
                      <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                    </div>

                    {/* Impact */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Business Impact</h3>
                      <ul className="space-y-2">
                        {study.impact.map((item) => (
                          <li key={item} className="flex items-start text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal mr-3 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-3">TECHNOLOGIES</p>
                      <div className="flex flex-wrap gap-2">
                        {study.tech.map((tech) => (
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

                  {/* Metrics */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="sticky top-24 space-y-6">
                      <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-cubott-navy mb-6">Key Metrics</h3>
                        <div className="space-y-6">
                          {study.results.map((metric) => (
                            <div key={metric.label} className="flex items-start">
                              <div className="w-12 h-12 rounded-lg bg-cubott-teal/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <metric.icon className="w-6 h-6 text-cubott-teal" />
                              </div>
                              <div>
                                <div className="text-3xl font-bold text-cubott-navy mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-sm text-gray-600">{metric.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-cubott-navy text-white rounded-xl">
                        <p className="text-sm mb-2 text-gray-300">CLIENT</p>
                        <p className="font-semibold">{study.client}</p>
                      </div>
                    </div>
                  </div>
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how Cubott can help you achieve similar results for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-cubott-teal text-white rounded-lg font-semibold hover:bg-cubott-teal-dark transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  )
}

