"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import { FOUNDATION_META, IMPACT_PILLARS } from "@/components/data/foundationData";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";
import { VideoBackground } from "@/components/ui/VideoBackground";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const contentX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("trust-gateway");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const scrollToPartnership = () => {
    const csrLab = document.getElementById("csr-lab");
    if (csrLab) {
      csrLab.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-graphite-950 text-foreground selection:bg-cyan-400 selection:text-black"
    >
      {/* 1. Cinematic Hero Earth Video Background (Balanced Cinematic Brightness) */}
      <VideoBackground
        src="/videos/hero-earth.mp4"
        priority={true}
        opacity={0.82}
        vignetteStyle="hero"
        containerRef={containerRef}
      />

      {/* 2. Mouse-reactive atmospheric cyan glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.04] blur-[150px] pointer-events-none z-0"
      />

      {/* 3. Top Spacer for Floating Nav */}
      <div className="pt-28 sm:pt-36" />

      {/* 4. Hero Core Content (Parallax Reactivity) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 my-auto">
        <motion.div
          style={{ x: contentX, y: contentY }}
          className="max-w-4xl flex flex-col items-start"
        >
          {/* Eyebrow Institutional Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <InstitutionalBadge variant="cyan">
              {FOUNDATION_META.tagline}
            </InstitutionalBadge>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-widest text-slate-300">
              | ESTABLISHED 2003
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05] text-balance mb-8 drop-shadow-md"
          >
            {FOUNDATION_META.heroHeadline}
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-base sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl leading-relaxed mb-10 border-l border-cyan-400/60 pl-5 drop-shadow-sm"
          >
            {FOUNDATION_META.heroSupportingText}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <InstitutionalButton
              variant="primary"
              size="lg"
              cursorState="FUND"
              cursorText="PARTNER"
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={scrollToPartnership}
            >
              {FOUNDATION_META.primaryCTA}
            </InstitutionalButton>

            <InstitutionalButton
              variant="secondary"
              size="lg"
              cursorState="EXPLORE"
              cursorText="DISCOVER"
              icon={<Compass className="h-4 w-4 text-cyan-300" />}
              onClick={scrollToNext}
            >
              {FOUNDATION_META.secondaryCTA}
            </InstitutionalButton>
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Bottom Institutional HUD & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 pb-8 pt-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Statutory Mandate Indicator */}
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-300">
              CSR Registration: CSR 00029723 • Active Since 2003
            </span>
          </div>

          {/* Center: Scroll Indicator */}
          <div
            onClick={scrollToNext}
            className="flex items-center gap-3 cursor-pointer group select-none self-center md:self-auto"
            data-cursor="EXPLORE"
            data-cursor-text="SCROLL"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300 transition-colors group-hover:text-cyan-300">
              Scroll To Explore
            </span>
            <div className="flex h-7 w-4 items-start justify-center rounded-full border border-white/30 p-1 group-hover:border-cyan-400/80 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-cyan-400"
              />
            </div>
          </div>

          {/* Right: Pillars Micro-index */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
              06 Strategic Focus Areas
            </span>
            <div className="flex gap-1">
              {IMPACT_PILLARS.map((pillar) => (
                <span
                  key={pillar.id}
                  title={pillar.label}
                  className="h-1 w-3 rounded-none bg-white/30 hover:bg-cyan-400 transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
