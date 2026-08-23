"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { INTRO_IMPACT_AREAS, FOUNDATION_META } from "@/components/data/foundationData";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { Sparkles, Network } from "lucide-react";

export function ImpactWorldIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Positions of the 7 orbital nodes around the circle
  const nodePositions = [
    { x: 0, y: -220, label: "EDUCATION", code: "01" },
    { x: 195, y: -105, label: "HEALTHCARE", code: "02" },
    { x: 215, y: 110, label: "ENVIRONMENT", code: "03" },
    { x: 90, y: 220, label: "DISASTER RELIEF", code: "04" },
    { x: -90, y: 220, label: "COMMUNITY DEVELOPMENT", code: "05" },
    { x: -215, y: 110, label: "WOMEN EMPOWERMENT", code: "06" },
    { x: -195, y: -105, label: "DESTITUTE CARE", code: "07" },
  ];

  return (
    <section
      id="impact-intro"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-graphite-950 py-24 sm:py-32"
    >
      {/* Background Ambience: Subtle Radial Depth & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.8)_0%,rgba(5,7,10,1)_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glowing Luminous Nebula */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[160px]" />
      </div>

      {/* Content Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex"
        >
          <InstitutionalBadge variant="cyan">
            SCENE 03 • IMPACT ARCHITECTURE
          </InstitutionalBadge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl font-normal text-white mb-4"
        >
          A UNIFIED IMPACT ECOSYSTEM
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-sans text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto"
        >
          Seven interconnected pathways orchestrated under one disciplined institutional mission.
        </motion.p>
      </div>

      {/* Interactive Constellation / Digital Impact Bridge */}
      <motion.div
        style={{ scale, rotate, opacity }}
        className="relative z-10 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] flex items-center justify-center select-none my-8"
      >
        {/* SVG Interconnecting Radial Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="-280 -280 560 560"
        >
          {/* Outer Orbital Rings */}
          <circle
            cx="0"
            cy="0"
            r="220"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="0"
            cy="0"
            r="160"
            fill="none"
            stroke="rgba(34,211,238,0.08)"
            strokeWidth="1"
          />

          {/* Radial Spokes to Nodes */}
          {nodePositions.map((pos, idx) => (
            <motion.line
              key={pos.label}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
              strokeDasharray="2 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
            />
          ))}
        </svg>

        {/* Central Core: ALPHA FOUNDATION */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-20 flex flex-col items-center justify-center h-28 w-28 sm:h-36 sm:w-36 rounded-full border border-cyan-400/40 bg-black/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.2)] text-center p-3"
          data-cursor="EXPLORE"
          data-cursor-text="CORE"
        >
          <span className="font-display text-lg sm:text-xl font-bold text-cyan-300">α</span>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white mt-1">
            {FOUNDATION_META.name}
          </span>
          <span className="font-mono text-[7px] uppercase tracking-wider text-slate-400 mt-0.5">
            Mission Nexus
          </span>
        </motion.div>

        {/* 7 Orbital Impact Area Nodes */}
        {nodePositions.map((node, idx) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.7, delay: 0.35 + idx * 0.1 }}
            style={{
              transform: `translate(${node.x * 0.6}px, ${node.y * 0.6}px)`,
            }}
            className="absolute z-20 sm:!translate-x-0 sm:!translate-y-0"
          >
            {/* Desktop positioning wrapper */}
            <div
              style={{
                transform: `translate(${node.x}px, ${node.y}px)`,
              }}
              className="hidden sm:flex flex-col items-center justify-center"
              data-cursor="DISCOVER"
              data-cursor-text={node.label.split(" ")[0]}
            >
              <div className="group flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-black/75 backdrop-blur-xl hover:border-cyan-400/60 hover:bg-cyan-950/20 transition-all cursor-pointer">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-300 group-hover:text-cyan-300">
                  {node.label}
                </span>
                <span className="font-mono text-[8px] text-slate-500">
                  #{node.code}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Nodes Grid Fallback */}
      <div className="sm:hidden grid grid-cols-2 gap-2 px-6 w-full max-w-sm mt-4 z-20">
        {INTRO_IMPACT_AREAS.map((area, idx) => (
          <div
            key={area}
            className="flex items-center gap-2 p-2.5 border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-slate-300"
          >
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span className="truncate">{area}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
