"use client";

import React, { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Compass,
  MapPin,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  OPERATING_REGIONS,
  OperatingRegion,
} from "@/components/data/regionsData";
import { SceneLighting } from "./SceneLighting";
import { ParticleField } from "./ParticleField";
import { Earth } from "./Earth";
import { ImpactNodes } from "./ImpactNodes";
import { CameraRig } from "./CameraRig";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";

export function WorldCanvas() {
  const [selectedRegion, setSelectedRegion] = useState<OperatingRegion | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReset = () => {
    setSelectedRegion(null);
    setHoveredRegionId(null);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSelectRegion = (region: OperatingRegion) => {
    setSelectedRegion(region);
  };

  const handleExploreCause = () => {
    const educationSec = document.getElementById("education");
    if (educationSec) {
      educationSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isMounted) {
    return (
      <div className="relative w-full h-[640px] sm:h-[760px] lg:h-[820px] bg-[#030609] flex items-center justify-center border border-white/10">
        <div className="flex flex-col items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            Initializing Earth Telemetry...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[640px] sm:h-[760px] lg:h-[820px] bg-[#030609] overflow-hidden border border-white/10 select-none shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
      {/* 1. 3D WebGL Canvas Layer */}
      <div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        data-cursor="ROTATE"
        data-cursor-text="ROTATE"
      >
        <Canvas
          camera={{ position: [0, 0.2, 5.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <ParticleField />
            <Earth
              radius={2.0}
              selectedRegionId={selectedRegion ? selectedRegion.id : null}
            />
            <ImpactNodes
              radius={2.0}
              selectedRegionId={selectedRegion ? selectedRegion.id : null}
              onSelectRegion={handleSelectRegion}
              onHoverNode={(id) => setHoveredRegionId(id)}
            />
            <CameraRig
              selectedRegion={selectedRegion}
              hoveredRegionId={hoveredRegionId}
              resetTrigger={resetTrigger}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Top Minimal HUD Telemetry */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        {/* Top-Left Header */}
        <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-white">ALPHA IMPACT WORLD</span>
          <span className="hidden sm:inline-block text-slate-600">/</span>
          <span className="hidden sm:inline-block text-slate-400">GEO TELEMETRY</span>
        </div>

        {/* Top-Right Telemetry Counter */}
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cyan-300 px-3 py-1 border border-white/10 bg-black/60 backdrop-blur-md">
          <MapPin className="h-3 w-3 text-cyan-400" />
          <span>04 OPERATING REGIONS</span>
        </div>
      </div>

      {/* 3. Left-Side Minimalist Quick Focus List */}
      <div className="absolute top-20 left-6 z-20 hidden md:flex flex-col gap-2 pointer-events-auto">
        <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500 mb-0.5">
          QUICK FOCUS
        </span>
        {OPERATING_REGIONS.map((region, idx) => {
          const isSelected = selectedRegion?.id === region.id;
          return (
            <button
              key={region.id}
              onClick={() => handleSelectRegion(region)}
              className={`group flex items-center gap-2.5 text-left font-mono text-[9.5px] uppercase tracking-wider py-1 px-2.5 border transition-all duration-200 ${
                isSelected
                  ? "border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                  : "border-transparent bg-black/40 text-slate-400 hover:text-white hover:border-white/15"
              }`}
              data-cursor="EXPLORE"
              data-cursor-text={region.name.split(" ")[0]}
            >
              <span className="text-[8px] text-slate-500 group-hover:text-cyan-400">
                0{idx + 1}
              </span>
              <span className="h-[1px] w-2 bg-white/20 group-hover:w-3 group-hover:bg-cyan-400 transition-all" />
              <span>{region.name}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Subtle Conceptual Floating Anchor (Non-Geographic) */}
      <div className="absolute bottom-16 right-6 z-20 hidden lg:flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-widest text-slate-400 bg-black/40 px-3 py-1 border border-white/5 pointer-events-none">
        <Sparkles className="h-3 w-3 text-cyan-400/80" />
        <span>ALPHA FOUNDATION • IMPACT NETWORK</span>
      </div>

      {/* 5. Bottom Controls Hint & Reset View */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
        {/* Bottom-Left Controls Hint */}
        <div className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-slate-400 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 border border-white/5">
          <Compass className="h-3 w-3 text-cyan-400" />
          <span>DRAG TO ROTATE • SELECT A REGION TO EXPLORE</span>
        </div>

        {/* Bottom-Right Reset View Button */}
        <button
          onClick={handleReset}
          className="pointer-events-auto flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-widest text-slate-300 hover:text-white px-3.5 py-1.5 border border-white/15 bg-black/70 backdrop-blur-md hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all group"
          data-cursor="EXPLORE"
          data-cursor-text="RESET"
          aria-label="Reset 3D camera view"
        >
          <RotateCcw className="h-3 w-3 text-cyan-400 transition-transform group-hover:-rotate-90 duration-300" />
          <span>RESET VIEW</span>
        </button>
      </div>

      {/* 6. Floating Region Detail Panel (When a region is selected) */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 right-6 z-30 w-full max-w-sm glass-panel p-6 sm:p-7 border border-cyan-400/35 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto"
          >
            {/* Header & Close Button */}
            <div className="flex items-start justify-between mb-3 border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[8.5px] uppercase tracking-widest text-cyan-400">
                  OPERATING REGION • {selectedRegion.code}
                </span>
                <h3 className="font-display text-2xl font-normal text-white mt-0.5">
                  {selectedRegion.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="flex h-6 w-6 items-center justify-center border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Close region panel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Region Description */}
            <p className="font-sans text-xs text-slate-300 font-light leading-relaxed mb-4">
              {selectedRegion.description}
            </p>

            {/* Focus Causes Badges */}
            <div className="mb-5">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400 block mb-1.5">
                RELEVANT CAUSES
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedRegion.causes.map((cause) => (
                  <span
                    key={cause}
                    className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/10 text-slate-200"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </div>

            {/* Explore CTA */}
            <InstitutionalButton
              variant="cyan"
              size="sm"
              className="w-full justify-center text-xs"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
              onClick={handleExploreCause}
              cursorState="EXPLORE"
              cursorText="LEARN"
            >
              EXPLORE CAUSES →
            </InstitutionalButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
