"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import Button from "../ui/Button"
import { ArrowRight, Calendar } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-cubott-navy via-cubott-navy-light to-cubott-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Animated Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-cubott-teal/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cubott-teal-light/20 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Build Something
              <span className="block text-cubott-teal mt-2">Exceptional</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your technology stack? Schedule a free discovery call with our engineering team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="group">
                <Button size="lg" variant="primary" className="bg-cubott-teal hover:bg-cubott-teal-dark">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule a Free Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" href="/services" className="border-white text-white hover:bg-white hover:text-cubott-navy">
                Explore Our Services
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-gray-400 mb-4">Trusted by forward-thinking companies worldwide</p>
              <div className="flex items-center justify-center space-x-4 text-white/40">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-cubott-teal rounded-sm"></div>
                </div>
                <span className="text-sm">Enterprise-Grade Security</span>
                <span className="text-white/20">•</span>
                <span className="text-sm">24/7 Support</span>
                <span className="text-white/20">•</span>
                <span className="text-sm">99.9% Uptime SLA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

