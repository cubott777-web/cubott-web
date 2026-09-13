"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerProps {
  children: ReactNode
  className?: string
  gap?: number
  as?: "div" | "ul" | "ol"
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = motion[as]
  return (
    <Tag variants={item} className={className}>
      {children}
    </Tag>
  )
}

export default function Stagger({ children, className, gap = 0.08, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </Tag>
  )
}
