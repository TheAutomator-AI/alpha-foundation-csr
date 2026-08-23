"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, MapPin, ArrowRight, Compass } from "lucide-react";
import { WorldCanvas } from "@/components/experience/WorldCanvas";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";
import { OPERATING_REGIONS } from "@/components/data/regionsData";

export function ImpactWorldSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const scrollToEducation = () => {
    const educationSec = document.getElementById("education");
    if (educationSec) {
      educationSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="impact-world"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-graphite-950 text-foreground py-20 sm:py-28 border-t border-white/10"
    >
      {/* 1. Section Header & Narrative Eyebrow */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex"
            >
              <InstitutionalBadge variant="cyan">
                SCENE 04 • INTERACTIVE 3D GLOBE
              </InstitutionalBadge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white leading-tight"
            >
              EXPLORE THE IMPACT WORLD
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-sm sm:text-base text-slate-300 font-light mt-4 max-w-xl leading-relaxed"
            >
              Explore the regions where Alpha Foundation operates and discover the
              causes at the heart of its mission.
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <InstitutionalButton
              variant="secondary"
              size="md"
              cursorState="EXPLORE"
              cursorText="DISCOVER"
              icon={<Compass className="h-4 w-4 text-cyan-300" />}
              onClick={scrollToEducation}
            >
              EXPLORE IMPACT CAUSES
            </InstitutionalButton>
          </div>
        </div>
      </div>

      {/* 2. Interactive 3D Earth World Canvas (Always Rendered & Visible) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12">
        <WorldCanvas />
      </div>

      {/* 3. Accessible HTML Region Fallback Strip (Crucial for Mobile & Screen Readers) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OPERATING_REGIONS.map((region) => (
            <div
              key={region.id}
              className="p-4 border border-white/10 bg-white/[0.02] hover:border-cyan-500/40 transition-all group"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">
                <span>{region.code}</span>
                <span className="text-cyan-400 font-semibold">ACTIVE</span>
              </div>
              <div className="font-display text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {region.name}
              </div>
              <div className="font-mono text-[8px] text-slate-400 uppercase tracking-wider mt-1">
                5 Focus Impact Areas
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
