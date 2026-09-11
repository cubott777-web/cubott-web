"use client"

import Container from "@/components/ui/Container"
import Eyebrow from "@/components/ui/Eyebrow"
import Reveal from "@/components/motion/Reveal"
import FlowStepper from "@/components/core/FlowStepper"
import WorkshopStory from "./WorkshopStory"
import WarrantyStory from "./WarrantyStory"
import { serviceLifecycle, partsStoreFlow, partsManufacturerFlow, releaseFlow } from "@/content/dealer"
import { cn } from "@/lib/utils"

interface Props {
  tone?: "light" | "dark"
  /** Full = product page treatment with more explanation. */
  variant?: "compact" | "full"
}

function Panel({
  index,
  title,
  text,
  children,
  tone,
  className,
}: {
  index: string
  title: string
  text: string
  children: React.ReactNode
  tone: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <Reveal as="div" className={cn("border-t pt-8", dark ? "border-white/10" : "border-navy/10", className)}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <Eyebrow tone={tone} index={index}>{title}</Eyebrow>
          <p className={cn("mt-4 max-w-sm text-[15px] leading-relaxed md:text-base", dark ? "text-blue-100/75" : "text-slate")}>{text}</p>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </Reveal>
  )
}

/** The five documented sub-systems, told as flows rather than feature cards. */
export default function SystemStories({ tone = "light", variant = "compact" }: Props) {
  const dark = tone === "dark"
  return (
    <section className={cn(dark ? "bg-navy text-white" : "bg-white", "py-20 md:py-28")} aria-labelledby="stories-title">
      <Container>
        <Reveal>
          <h2 id="stories-title" className={cn("display-md max-w-2xl", dark ? "text-white" : "text-navy")}>
            One connected operational story.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16">
          <Panel
            index="A"
            title="Service lifecycle"
            tone={tone}
            text="Tracked from creation to vehicle release. Each status is a real gate."
          >
            <FlowStepper steps={serviceLifecycle.map((s) => s.key)} code tone={tone} />
            {variant === "full" && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceLifecycle.map((s) => (
                  <li key={s.key} className={cn("text-sm", dark ? "text-blue-100/70" : "text-slate")}>
                    <span className={cn("font-mono text-xs font-semibold", dark ? "text-white" : "text-navy")}>{s.key}</span> — {s.note}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel
            index="B"
            title="Parts"
            tone={tone}
            text="Two independent tracks per part: store and manufacturer."
          >
            <div className="flex flex-col gap-8">
              <FlowStepper label="Dealer / store" steps={partsStoreFlow} tone={tone} />
              <FlowStepper label="Manufacturer" steps={partsManufacturerFlow} tone={tone} delay={0.6} />
            </div>
          </Panel>

          <Panel
            index="C"
            title="Physical workshop"
            tone={tone}
            text="The machine's physical place — parking slot or service bay — moves with its record."
          >
            <WorkshopStory tone={tone} />
          </Panel>

          <Panel
            index="D"
            title="Warranty"
            tone={tone}
            text="Warranty runs in parallel. Service does not wait for the manufacturer."
          >
            <WarrantyStory tone={tone} />
          </Panel>

          <Panel
            index="E"
            title="Finance and release"
            tone={tone}
            text="Payment is confirmed before a gate pass is issued, with a documented warranty-only exception."
          >
            <FlowStepper steps={releaseFlow} tone={tone} />
          </Panel>
        </div>
      </Container>
    </section>
  )
}
