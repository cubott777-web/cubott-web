/** Dealer Management modules — facts from the product documentation only. `screen` keys map to content/screens.ts. */
export const modules = [
  {
    key: "service",
    screen: "service-requests",
    title: "Service management",
    who: "Admin · Supervisor",
    text: "Every service request starts as a ticket: customer, chassis number, request type, priority, description, location and meter reading. The ticket is the thread the rest of the system hangs from.",
    facts: [
      "Requests arrive by phone, WhatsApp or walk-in",
      "Customer and vehicle looked up by phone or chassis number; created if new",
      "Request types: breakdown and service; priorities: normal, high, urgent",
    ],
  },
  {
    key: "job-cards",
    screen: "job-card",
    title: "Job cards",
    who: "Supervisor",
    text: "A job card turns a request into executable work: issues reported, inspection checklist, work instructions, estimated hours and the assigned technician.",
    facts: [
      "Auto-generated job card number; meter reading and service type carried over",
      "Vehicle handover checklist: fuel level, meter seal, side doors, tool box, video taken",
      "Section-by-section complaints from cutter bar to engine and body",
    ],
  },
  {
    key: "parts",
    screen: "parts-management",
    title: "Parts",
    who: "Supervisor · Technician",
    text: "Parts are selected from inventory onto the job card. Each part carries two independent tracks — its store status and its manufacturer status — so the two flows never get mixed up.",
    facts: [
      "Store status: REQUESTED → SENT TO STORE → ISSUED → USED / RETURNED",
      "Manufacturer status: NOT SENT → SENT → APPROVED / REJECTED → ACKNOWLEDGED",
      "Only parts in REQUESTED can be sent to store; duplicates on a job card are prevented",
    ],
  },
  {
    key: "store",
    screen: "store",
    title: "Store",
    who: "Store assistant · Store supervisor",
    text: "The store sees pending requests grouped by ticket, issues what is available and marks what isn't — with a reason — so the supervisor knows immediately.",
    facts: [
      "Issue parts to the technician; mark unavailable with a required reason",
      "Cannot issue when stock is zero or a part was already issued on the same job card",
      "Store supervisor acknowledges returns; inventory is updated",
    ],
  },
  {
    key: "warranty",
    screen: "warranty",
    title: "Warranty",
    who: "Supervisor",
    text: "Warranty-eligible parts are sent for approval with photos and a description. Approval runs in parallel — service does not wait for the manufacturer.",
    facts: [
      "Photos and a description are required to submit",
      "Approved parts become non-billable; rejected parts stay billable until acknowledged",
      "A rejection must be acknowledged before a part can be resent",
    ],
  },
  {
    key: "manufacturer",
    screen: "manufacturer",
    title: "Manufacturer",
    who: "Manufacturer",
    text: "Manufacturers review requests across dealers with the vehicle, customer and photo evidence in front of them, and decide part by part.",
    facts: [
      "Approve or reject each part; rejection reason is required",
      "Bulk approval across selected requests",
      "Complete lifecycle view of every part sent for approval",
    ],
  },
  {
    key: "warehouse",
    screen: "warehouse",
    title: "Warehouse",
    who: "Manufacturer warehouse",
    text: "Approved parts are issued from the manufacturer warehouse to the dealer with a verification photo, and the dealer acknowledges receipt to close the loop.",
    facts: [
      "Issue single or bulk; recipient name and verification photo are required",
      "Dealer store supervisor acknowledges receipt → PART RECEIVED",
      "Issuance history per dealer; favourite dealers for quick filtering",
    ],
  },
  {
    key: "finance",
    screen: "finance",
    title: "Finance",
    who: "Finance",
    text: "When service is complete, billable and non-billable parts are classified automatically. Finance generates the invoice, confirms payment and issues the gate pass.",
    facts: [
      "Billable = parts used minus manufacturer-approved minus returned",
      "Guided flow: Generate invoice → Confirm payment → Issue gate pass",
      "Payment method and reference recorded (UPI, cash, cheque)",
    ],
  },
  {
    key: "workshop",
    screen: "supervisor",
    title: "Physical workshop tracking",
    who: "Supervisor",
    text: "The system knows where the machine is. Parking slots and service bays are allocated and released automatically as the request moves through its lifecycle.",
    facts: [
      "Parking slot assigned when the request is created",
      "Service bay assigned at job card creation; parking slot released",
      "Bay released and parking reassigned at service completion",
    ],
  },
] as const

export const problem = {
  title: "The problem",
  lead: "Servicing one machine involves seven parties. In most dealerships that is seven separate conversations.",
  points: [
    "Nobody can see where a machine is, what has been done and what is being waited on — without asking around.",
    "Warranty decisions from the manufacturer block or blur the service work in the workshop.",
    "Parts get issued, used, returned and claimed with no single record of what happened to each one.",
  ],
}
