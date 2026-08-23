"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ImpactPillar } from "@/components/data/foundationData";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";
import { VideoBackground } from "@/components/ui/VideoBackground";

interface PillarWorldSceneProps {
  pillar: ImpactPillar;
  sceneIndex: string;
  alignment?: "left" | "right";
  vignetteStyle?: "default" | "intense" | "minimal";
  accentColor?: string;
  onExplore?: () => void;
}

export function PillarWorldScene({
  pillar,
  sceneIndex,
  alignment = "left",
  vignetteStyle = "default",
  onExplore,
}: PillarWorldSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const handleCtaClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      const csrLab = document.getElementById("csr-lab");
      if (csrLab) csrLab.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={pillar.id}
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-graphite-950 py-24 sm:py-32"
    >
      {/* 1. Cinematic Lazy-loaded Video Background (75%+ Visual Visibility) */}
      <VideoBackground
        src={pillar.videoSrc}
        opacity={0.88}
        vignetteStyle={vignetteStyle}
        containerRef={containerRef}
      />

      {/* 2. Localized Text Readability Scrim (Only over the text column, leaving 60%+ video open) */}
      <div
        className={`absolute inset-y-0 ${
          alignment === "left"
            ? "left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
            : "right-0 w-full lg:w-3/5 bg-gradient-to-l from-black/85 via-black/50 to-transparent"
        } pointer-events-none z-[1]`}
      />

      {/* 3. Editorial Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
            alignment === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Main Editorial Text Block */}
          <div
            className={`flex flex-col items-start ${
              alignment === "right"
                ? "lg:col-start-6 lg:col-span-7"
                : "lg:col-span-8"
            }`}
          >
            {/* Scene Index & Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <InstitutionalBadge variant="cyan">
                {pillar.label}
              </InstitutionalBadge>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                SCENE {sceneIndex} • {pillar.code}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-8 drop-shadow-md"
            >
              {pillar.headline}
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-10 max-w-2xl border-l border-cyan-400/60 pl-5 drop-shadow-sm"
            >
              {pillar.copy}
            </motion.p>

            {/* Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <InstitutionalButton
                variant="secondary"
                size="md"
                cursorState="DISCOVER"
                cursorText={pillar.label.split(" ")[0]}
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={handleCtaClick}
              >
                {pillar.ctaText}
              </InstitutionalButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
