"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, HeartHandshake, Layers } from "lucide-react";
import { FOUNDATION_META, INTRO_IMPACT_AREAS } from "@/components/data/foundationData";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";

export function ImpactConvergence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const convergenceScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const convergenceOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.4, 1, 1, 0.5]);

  const scrollToTrust = () => {
    const el = document.getElementById("trust-gateway");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="convergence"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-graphite-950 text-foreground py-24 sm:py-32"
    >
      {/* 1. Ambient Background Grid & Convergence Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.95)_0%,rgba(5,7,10,1)_80%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Core Glowing Nexus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-cyan-500/[0.04] blur-[180px]" />
      </div>

      {/* 2. Top Stage Label */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="inline-flex"
        >
          <InstitutionalBadge variant="cyan">
            SCENE 10 • THE CONVERGENCE
          </InstitutionalBadge>
        </motion.div>
      </div>

      {/* 3. Central Cinematic Convergence Canvas / Graphic */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-12 my-auto">
        <motion.div
          style={{ scale: convergenceScale, opacity: convergenceOpacity }}
          className="flex flex-col items-center text-center"
        >
          {/* Visual Narrative Chain: Different Causes → One Institution → Shared Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-12"
          >
            <span className="px-3 py-1 border border-white/10 bg-white/[0.02]">
              DIFFERENT CAUSES
            </span>
            <span className="text-cyan-400">→</span>
            <span className="px-3 py-1 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 font-semibold">
              ONE INSTITUTION
            </span>
            <span className="text-cyan-400">→</span>
            <span className="px-3 py-1 border border-white/10 bg-white/[0.02]">
              SHARED IMPACT
            </span>
          </motion.div>

          {/* Central Monogram & Interconnecting Streams */}
          <div className="relative my-8 flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full border border-cyan-400/20 animate-pulse" />
            <div className="absolute h-36 w-36 sm:h-48 sm:w-48 rounded-full border border-white/10" />

            {/* Core Alpha Emblema */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative z-20 flex flex-col items-center justify-center h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-cyan-400/50 bg-black/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.25)]"
              data-cursor="CONNECT"
              data-cursor-text="ALPHA"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold text-white">α</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-cyan-300 mt-1">
                {FOUNDATION_META.name}
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.05] max-w-3xl mb-6 mt-4"
          >
            IMPACT IS CONNECTED.
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-base sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed mb-12"
          >
            Education. Healthcare. Environment. Community.
            <br />
            <span className="text-white font-medium">
              Different pathways. One shared purpose.
            </span>
          </motion.p>

          {/* Call-to-Actions Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
          >
            <InstitutionalButton
              variant="cyan"
              size="lg"
              cursorState="FUND"
              cursorText="PARTNER"
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => {
                alert("CSR Partnership Portal — Ready for Phase 5 integration.");
              }}
            >
              {FOUNDATION_META.primaryCTA}
            </InstitutionalButton>

            <InstitutionalButton
              variant="secondary"
              size="lg"
              cursorState="EXPLORE"
              cursorText="TRUST"
              icon={<ArrowRight className="h-4 w-4 text-cyan-300" />}
              onClick={scrollToTrust}
            >
              EXPLORE THE TRUST →
            </InstitutionalButton>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Institutional Foundation Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pt-16 border-t border-white/10 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="uppercase text-slate-300 font-semibold">
              {FOUNDATION_META.name}
            </span>
            <span className="text-slate-600">|</span>
            <span>Active Since {FOUNDATION_META.activeSince}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>Tamil Nadu</span>
            <span>•</span>
            <span>Karnataka</span>
            <span>•</span>
            <span>Andhra Pradesh</span>
            <span>•</span>
            <span>Puducherry</span>
          </div>

          <button
            onClick={scrollToTop}
            className="text-slate-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
            data-cursor="EXPLORE"
            data-cursor-text="TOP"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
