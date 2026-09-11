/**
 * Dealer Management — factual content.
 * Source of truth: Cubott SaaS product documentation (Functional Documentation v1.0,
 * PRD v2.0, Parts & Service PRD v1.0, Cubott SaaS 2026 Jan).
 * Do not add statuses, features or claims that are not documented there.
 */

export const dealer = {
  name: "Dealer Management",
  tagline: "An operating system for agricultural equipment dealerships.",
  summary:
    "A multi-tenant service platform for agricultural machinery dealerships — service requests, technicians, parts, warranty, manufacturer warehouse, billing and vehicle release, with a full audit trail.",
  manages: [
    "Customer service requests",
    "Technician workflow",
    "Parts issuance",
    "Warranty approvals",
    "Manufacturer warehouse operations",
    "Billing",
    "Vehicle release",
  ],
}

/** The documented service request lifecycle. */
export const serviceLifecycle = [
  { key: "UNASSIGNED", note: "Ticket created. Parking slot assigned." },
  { key: "IN_PROGRESS", note: "Job card created, technician assigned, service bay allocated." },
  { key: "AWAITING_SPARES", note: "Parts sent to store, waiting for issuance." },
  { key: "AWAITING_BILLING", note: "Service completed and submitted to finance." },
  { key: "COMPLETED", note: "Gate pass issued. Machine released." },
] as const

/** Dealer / store parts flow. */
export const partsStoreFlow = ["REQUESTED", "SENT TO STORE", "ISSUED", "USED / RETURNED"] as const

/** Manufacturer / warranty parts flow. */
export const partsManufacturerFlow = [
  "SENT FOR APPROVAL",
  "APPROVED / REJECTED",
  "ISSUED FROM WAREHOUSE",
  "PART RECEIVED",
] as const

/** Warranty workflow — runs parallel to service execution. */
export const warrantyFlow = ["SENT FOR APPROVAL", "APPROVED / REJECTED", "WAREHOUSE ISSUE", "DEALER ACKNOWLEDGMENT"] as const

/** Physical workshop tracking. */
export const physicalFlow = [
  { key: "PARKING", note: "Assigned automatically when the service request is created." },
  { key: "SERVICE BAY", note: "Allocated when the job card is created. Parking slot released." },
  { key: "PARKING", note: "Reassigned when service is completed, while billing is pending." },
  { key: "EXIT", note: "Released when the gate pass is issued." },
] as const

/** Finance / release. */
export const releaseFlow = ["SERVICE COMPLETE", "FINANCE", "GATE PASS", "MACHINE RELEASE"] as const

/** One machine's journey — the stations the story moves through. */
export const journey = [
  {
    key: "customer",
    label: "Customer",
    role: "Phone, WhatsApp or walk-in",
    detail: "A customer reports a problem with a machine. The dealer looks them up by phone or chassis number.",
  },
  {
    key: "service-request",
    label: "Service request",
    role: "Admin / Supervisor",
    detail: "A ticket is created with the machine, meter reading, location and priority. A parking slot is assigned automatically.",
    status: "UNASSIGNED",
  },
  {
    key: "job-card",
    label: "Job card",
    role: "Supervisor",
    detail: "Issues reported, inspection checklist, work instructions and estimated hours are recorded on a job card.",
    status: "IN_PROGRESS",
  },
  {
    key: "technician",
    label: "Technician",
    role: "Technician",
    detail: "A technician is assigned and the machine moves into a service bay. Work is logged against the job card.",
  },
  {
    key: "parts",
    label: "Parts",
    role: "Supervisor",
    detail: "Spare parts are selected from inventory and added to the job card. Warranty-eligible parts can go to the manufacturer in parallel.",
  },
  {
    key: "store",
    label: "Store",
    role: "Store assistant / supervisor",
    detail: "Parts are sent to the store, issued to the technician, and later marked used or returned.",
    status: "AWAITING_SPARES",
  },
  {
    key: "warranty",
    label: "Warranty",
    role: "Supervisor",
    detail: "Warranty parts are sent for approval with photos and a description. Service does not wait for the decision.",
  },
  {
    key: "manufacturer",
    label: "Manufacturer",
    role: "Manufacturer",
    detail: "The manufacturer approves or rejects each part. Approved parts become non-billable; rejections must be acknowledged.",
  },
  {
    key: "warehouse",
    label: "Warehouse",
    role: "Manufacturer warehouse",
    detail: "Approved parts are issued from the manufacturer warehouse with a verification photo, and the dealer acknowledges receipt.",
  },
  {
    key: "billing",
    label: "Billing",
    role: "Finance",
    detail: "Service is completed, billable and non-billable parts are classified, an invoice is generated and payment is confirmed.",
    status: "AWAITING_BILLING",
  },
  {
    key: "release",
    label: "Vehicle release",
    role: "Finance",
    detail: "A gate pass is issued, the parking slot is released and the machine leaves the service center.",
    status: "COMPLETED",
  },
] as const

/** Roles documented in the platform. */
export const roles = [
  { key: "system_admin", label: "System admin", scope: "Platform" },
  { key: "manufacturer", label: "Manufacturer", scope: "Platform" },
  { key: "manufacturer_warehouse", label: "Manufacturer warehouse", scope: "Platform" },
  { key: "admin", label: "Dealer admin", scope: "Tenant" },
  { key: "supervisor", label: "Supervisor", scope: "Tenant" },
  { key: "technician", label: "Technician", scope: "Tenant" },
  { key: "store_assistant", label: "Store assistant", scope: "Tenant" },
  { key: "store_supervisor", label: "Store supervisor", scope: "Tenant" },
  { key: "finance", label: "Finance", scope: "Tenant" },
] as const

/** Documented technical characteristics only. */
export const architecture = {
  layers: [
    { key: "EXPERIENCE", note: "Role-specific dashboards: supervisor, technician, store, manufacturer, warehouse, finance." },
    { key: "APPLICATION", note: "React + TypeScript front end." },
    { key: "APIs", note: "Node.js / Express with JWT authentication and role checks on every route." },
    { key: "BUSINESS LOGIC", note: "State-driven workflows with validated transitions and preconditions." },
    { key: "DATA", note: "PostgreSQL with Drizzle ORM. Normalized domain model, tenant_id on every record." },
    { key: "INFRASTRUCTURE", note: "Multi-tenant deployment with tenant isolation." },
  ],
  characteristics: [
    "PostgreSQL + Drizzle ORM",
    "Multi-tenancy with strict tenant isolation",
    "Role-based access control",
    "Normalized domain architecture",
    "State-driven workflows",
    "Immutable parts event history",
    "Physical resource tracking (parking slots, service bays)",
  ],
}

export const trust = [
  { key: "IDENTITY", note: "Every user belongs to one tenant and one role." },
  { key: "PERMISSIONS", note: "Role checks on every route." },
  { key: "WORKFLOW", note: "Transitions are validated — no gate pass without payment." },
  { key: "AUDIT", note: "Timestamps and user IDs on key actions; parts events are immutable." },
  { key: "ACCOUNTABILITY", note: "Who did what, when." },
] as const
