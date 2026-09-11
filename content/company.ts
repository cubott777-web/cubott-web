/** Company-level content: process, principles, solution categories. Nothing here claims customers, numbers or certifications. */

export const process = [
  {
    n: "01",
    key: "understand",
    title: "Understand",
    summary: "Workflows, requirements, constraints.",
    text: "Who does what, in what order, what breaks, and where the exceptions live.",
    evidence: {
      label: "From Dealer Management",
      items: ["Nine roles across dealer, manufacturer and platform", "Phone, WhatsApp and walk-in intake", "Warranty decisions that must not block service"],
    },
  },
  {
    n: "02",
    key: "architect",
    title: "Architect",
    summary: "Architecture, data models, APIs, permissions.",
    text: "Entities, states, transitions and who may trigger them. Structure first, screens later.",
    evidence: {
      label: "Documented model",
      items: ["service_requests · job_cards · machine_visits", "service_parts_usage as the single source of truth for parts", "parts_events — immutable audit log"],
    },
  },
  {
    n: "03",
    key: "design",
    title: "Design",
    summary: "Interfaces and user journeys.",
    text: "Each role gets a working surface built for its job, not a filtered view of someone else's.",
    evidence: {
      label: "Role-specific dashboards",
      items: ["Supervisor operations", "Store operations", "Manufacturer approvals", "Warehouse", "Finance"],
    },
  },
  {
    n: "04",
    key: "build",
    title: "Build",
    summary: "The application, end to end.",
    text: "Front end, APIs, rules and data built as one system, so the rules live in one place.",
    evidence: {
      label: "Stack in production",
      items: ["React + TypeScript", "Node.js / Express + TypeScript", "PostgreSQL + Drizzle ORM", "JWT auth with role-based access"],
    },
  },
  {
    n: "05",
    key: "test",
    title: "Test",
    summary: "Workflows, validation, edge cases.",
    text: "Every gate in the workflow has preconditions, and every precondition is enforced in code.",
    evidence: {
      label: "Documented invariants",
      items: ["Only parts in REQUESTED can be sent to store", "No finance submission with pending approvals", "Gate pass requires confirmed payment", "Duplicate chassis numbers prevented"],
    },
  },
  {
    n: "06",
    key: "deploy",
    title: "Deploy",
    summary: "Production, infrastructure.",
    text: "Multi-tenant from the first release, with tenant isolation on every record and every route.",
    evidence: {
      label: "Platform",
      items: ["Multi-tenant deployment", "Tenant isolation on every query", "Per-tenant configuration"],
    },
  },
  {
    n: "07",
    key: "evolve",
    title: "Evolve",
    summary: "Improvements, support, iteration.",
    text: "The business changes, so the software does. We stay with it after launch.",
    evidence: {
      label: "Later iterations of Dealer Management",
      items: ["Finance and gate-pass module", "Physical workshop tracking (parking slots, service bays)", "Inventory redesign"],
    },
  },
] as const

export const principles = [
  { title: "We understand the business.", text: "Not just the technology." },
  { title: "We build the whole system.", text: "Not isolated screens." },
  { title: "We care about what happens after launch.", text: "Software evolves." },
  { title: "We build for reality.", text: "Real people, real workflows, exceptions and changing requirements." },
] as const

export const builderInputs = ["Your people", "Your data", "Your workflow", "Your rules", "Your systems", "Your constraints"] as const

export const solutionCategories = [
  {
    key: "custom-software",
    title: "Custom software",
    text: "Applications built around the actual way your business operates — its roles, rules and exceptions.",
    example: "A service management platform shaped by how dealerships, technicians and manufacturers really work together.",
  },
  {
    key: "business-platforms",
    title: "Business platforms",
    text: "Multi-role, multi-tenant systems that bring people, processes and data into one place.",
    example: "Nine roles across dealers, manufacturers and warehouses on one platform, each with its own working surface.",
  },
  {
    key: "workflow-systems",
    title: "Workflow systems",
    text: "State-driven processes with real gates: what can happen next, who can make it happen, and what gets recorded.",
    example: "Service, parts, warranty and finance lifecycles with validated transitions and an immutable event log.",
  },
  {
    key: "internal-applications",
    title: "Internal applications",
    text: "Operational tools for the teams that run the business — store, finance, supervision, administration.",
    example: "Store, finance and supervisor dashboards that land users on actionable screens.",
  },
  {
    key: "integrations",
    title: "Integrations",
    text: "Connecting the system to the channels and services a business already uses.",
    example: "WhatsApp Business API intake that creates service requests from customer conversations.",
  },
] as const
