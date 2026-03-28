"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Wrench, Package, TrendingUp, FileText } from "lucide-react"

const modules = [
  { icon: Wrench, label: "Service", metric: "12 active jobs", color: "#4FB3D9", dot: "bg-cubott-teal" },
  { icon: Package, label: "Inventory", metric: "2,710 parts tracked", color: "#a78bfa", dot: "bg-violet-400" },
  { icon: TrendingUp, label: "Sales", metric: "8 open deals", color: "#34d399", dot: "bg-emerald-400" },
  { icon: FileText, label: "Finance", metric: "All invoices synced", color: "#fbbf24", dot: "bg-amber-400" },
]

function FloatingCard({
  icon: Icon, label, metric, color, dot, delay, x, y, rotate,
}: {
  icon: any; label: string; metric: string; color: string; dot: string;
  delay: number; x: number; y: number; rotate: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, rotate: `${rotate}deg` }}
      className="w-52 glass-card rounded-2xl p-4 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm text-white font-semibold mb-2">{metric}</div>
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
        <span className="text-[10px] text-white/30 font-light">Live</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05090F]">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(79,179,217,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(30,60,120,0.15) 0%, transparent 70%)",
        }}
      />

      <motion.div
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,179,217,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 lg:gap-0 items-center min-h-[85vh]">

          <div className="lg:pr-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-10"
            >
              <span className="w-5 h-px bg-cubott-teal/60" />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-cubott-teal/70 uppercase">
                Dealership Management · Multi-tenant SaaS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,6.5vw,6rem)] font-black leading-[0.92] tracking-[-0.04em] mb-8"
            >
              <span className="text-white">Every deal tracked.</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #4FB3D9 0%, #7DD3FC 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Every team aligned.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-base md:text-lg text-white/35 max-w-md mb-12 leading-relaxed font-light"
            >
              Cubott unifies service, inventory, sales, and finance into one platform — with complete traceability and role-based control at every step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cubott-teal/25 text-sm"
              >
                Let&apos;s Talk Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/#platform"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors font-medium"
              >
                See the platform →
              </Link>
            </motion.div>

          </div>

          <div className="relative h-[520px] lg:h-[640px] hidden lg:block">
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(79,179,217,0.06) 0%, transparent 70%)",
              }}
            />

            <FloatingCard {...modules[0]} delay={0.5} x={4} y={2} rotate={-2} />
            <FloatingCard {...modules[1]} delay={0.65} x={52} y={6} rotate={2} />
            <FloatingCard {...modules[2]} delay={0.8} x={8} y={56} rotate={1} />
            <FloatingCard {...modules[3]} delay={0.95} x={52} y={62} rotate={-1.5} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[28%] top-[28%] w-[210px]"
            >
              <div className="glass rounded-2xl p-5 border border-cubott-teal/15 bg-cubott-teal/5">
                <div className="text-[10px] text-cubott-teal/70 font-bold tracking-wider uppercase mb-3">Platform Status</div>
                {[
                  { label: "Uptime", val: "99.9%", w: "100%" },
                  { label: "Jobs Active", val: "12", w: "72%" },
                  { label: "Stock Health", val: "Good", w: "88%" },
                ].map((row) => (
                  <div key={row.label} className="mb-3 last:mb-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-white/30">{row.label}</span>
                      <span className="text-[10px] text-white/70 font-semibold">{row.val}</span>
                    </div>
                    <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: row.w }}
                        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-cubott-teal rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {[
              { x: "22%", y: "50%", size: 280, opacity: 0.06 },
              { x: "60%", y: "40%", size: 200, opacity: 0.04 },
            ].map((g, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: g.x, top: g.y,
                  width: g.size, height: g.size,
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, rgba(79,179,217,${g.opacity}) 0%, transparent 70%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
