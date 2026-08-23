"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ShieldCheck, MapPin } from "lucide-react";
import { FOUNDATION_META } from "@/components/data/foundationData";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { VideoBackground } from "@/components/ui/VideoBackground";

export function TrustGateway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  return (
    <section
      id="trust-gateway"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-graphite-950 py-24 sm:py-32"
    >
      {/* 1. Cinematic Foundation Video Background (Crisp & High Visibility) */}
      <VideoBackground
        src="/videos/foundation.mp4"
        opacity={0.85}
        vignetteStyle="default"
        containerRef={containerRef}
      />

      {/* 2. Left-side Localized Text Readability Scrim */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none z-[1]" />

      {/* 3. Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Institutional Statement */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Stage Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <InstitutionalBadge variant="default">
                SCENE 02 • THE INSTITUTION
              </InstitutionalBadge>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-8 drop-shadow-md"
            >
              ENTER THE ALPHA FOUNDATION
            </motion.h2>

            {/* Core Institutional Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-10 max-w-2xl border-l border-cyan-400/60 pl-5 drop-shadow-sm"
            >
              A long-term social-impact platform working across education,
              healthcare, environmental restoration, disaster response,
              community development, women empowerment and care for vulnerable
              communities.
            </motion.p>

            {/* Institutional Heritage Marker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center gap-6 pt-4 border-t border-white/15"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-cyan-500/40 bg-cyan-950/40 text-cyan-300">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                    ACTIVE SINCE
                  </div>
                  <div className="font-display text-xl font-bold text-white tracking-wider">
                    {FOUNDATION_META.activeSince}
                  </div>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-white/20" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-slate-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                    GOVERNANCE
                  </div>
                  <div className="font-display text-sm font-semibold text-white tracking-wide">
                    Institutional Trust
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Geographic Footprint Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-panel p-8 sm:p-10 border border-white/15 relative overflow-hidden"
              data-cursor="DISCOVER"
              data-cursor-text="FOOTPRINT"
            >
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex items-center gap-2 mb-6 text-cyan-400">
                <MapPin className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  OPERATING ACROSS
                </span>
              </div>

              <div className="space-y-3">
                {FOUNDATION_META.operatingRegions.map((region, idx) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3.5 bg-black/40 border border-white/10 hover:border-cyan-500/40 hover:bg-black/60 transition-all group"
                  >
                    <span className="font-sans text-sm font-medium text-slate-200 group-hover:text-white">
                      {region}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 group-hover:text-cyan-300">
                      REG-0{idx + 1}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                <span>Verified Deployment</span>
                <span className="text-cyan-300">South India</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
