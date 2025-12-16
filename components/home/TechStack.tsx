import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"

export default function TechStack() {
  const techCategories = [
    {
      category: "Cloud Platforms",
      technologies: [
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Oracle Cloud",
        "DigitalOcean",
      ],
    },
    {
      category: "Container & Orchestration",
      technologies: [
        "Docker",
        "Kubernetes",
        "Helm",
        "ECS",
        "GKE",
      ],
    },
    {
      category: "Infrastructure as Code",
      technologies: [
        "Terraform",
        "Ansible",
        "CloudFormation",
        "Pulumi",
        "Chef",
      ],
    },
    {
      category: "CI/CD & DevOps",
      technologies: [
        "Jenkins",
        "GitHub Actions",
        "GitLab CI",
        "CircleCI",
        "ArgoCD",
      ],
    },
    {
      category: "Frontend Technologies",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Vue.js",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend Technologies",
      technologies: [
        "Node.js",
        "Python",
        "Go",
        "Java",
        "Rust",
      ],
    },
    {
      category: "Databases",
      technologies: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "MySQL",
        "DynamoDB",
      ],
    },
    {
      category: "Monitoring & Observability",
      technologies: [
        "Prometheus",
        "Grafana",
        "Datadog",
        "New Relic",
        "ELK Stack",
      ],
    },
  ]

  return (
    <section className="py-24 bg-white">
      <Container>
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cubott-navy mb-6">
            Modern Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and industry-leading tools to build robust, scalable solutions.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, index) => (
            <AnimatedSection key={category.category} delay={index * 0.05}>
              <div className="p-6 bg-gray-50 rounded-xl hover:bg-cubott-teal/5 transition-colors">
                <h3 className="text-lg font-bold text-cubott-navy mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center text-gray-600 hover:text-cubott-teal transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal mr-3" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center" delay={0.4}>
          <div className="inline-block px-6 py-3 bg-cubott-navy/5 rounded-lg">
            <p className="text-gray-600">
              <span className="font-semibold text-cubott-navy">Plus many more...</span> We stay current with the latest technologies and frameworks to deliver cutting-edge solutions.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

