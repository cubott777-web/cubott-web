import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import Container from "../ui/Container"
import Button from "../ui/Button"
import AnimatedSection from "../shared/AnimatedSection"

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "ServiceHub",
      industry: "Agricultural Machinery",
      description: "Complete multi-tenant SaaS platform for service management with sales, operations, and finance workflows.",
      metrics: [
        { label: "Uptime", value: "99.9%" },
        { label: "Users", value: "500+" },
        { label: "Completion", value: "100%" },
      ],
      tech: ["React", "TypeScript", "PostgreSQL", "Node.js"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Global Financial Platform",
      industry: "FinTech",
      description: "Migrated legacy banking system to AWS cloud with microservices architecture and zero downtime.",
      metrics: [
        { label: "Uptime", value: "99.99%" },
        { label: "Cost Saved", value: "60%" },
        { label: "Response", value: "<100ms" },
      ],
      tech: ["AWS", "Kubernetes", "Terraform", "Go"],
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      title: "E-Commerce Infrastructure",
      industry: "Retail",
      description: "Built event-driven serverless architecture handling 10M+ daily transactions with auto-scaling.",
      metrics: [
        { label: "Scale", value: "10x" },
        { label: "Latency", value: "<50ms" },
        { label: "Availability", value: "99.95%" },
      ],
      tech: ["GCP", "Cloud Functions", "Pub/Sub", "Redis"],
      gradient: "from-violet-600 to-fuchsia-600",
    },
    {
      title: "Healthcare Data Platform",
      industry: "Healthcare",
      description: "HIPAA-compliant ML pipeline for healthcare analytics with automated insights and reporting.",
      metrics: [
        { label: "Compliance", value: "100%" },
        { label: "Faster Insights", value: "80%" },
        { label: "Data Points", value: "1B+" },
      ],
      tech: ["Azure", "Databricks", "Python", "MLflow"],
      gradient: "from-pink-600 to-rose-600",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cubott-teal/10 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-cubott-teal" />
            <span className="text-sm font-medium text-cubott-navy">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-6">
            Real Results, Real Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped enterprises transform their technology and achieve measurable business outcomes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.title} delay={index * 0.1}>
              <div className="group h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-cubott-teal transition-all duration-300 hover:shadow-2xl">
                {/* Header */}
                <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${study.gradient} text-white text-sm font-semibold mb-4`}>
                  {study.industry}
                </div>
                
                <h3 className="text-2xl font-bold text-cubott-navy mb-3 group-hover:text-cubott-teal transition-colors">
                  {study.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {study.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-2xl font-bold text-cubott-teal mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-cubott-navy/5 text-cubott-navy rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center" delay={0.4}>
          <Link href="/case-studies" className="group inline-block">
            <Button size="lg" variant="outline">
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  )
}

