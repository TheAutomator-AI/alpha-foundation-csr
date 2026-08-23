"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { STORY_STAGES } from "@/components/data/foundationData";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      for (let i = STORY_STAGES.length - 1; i >= 0; i--) {
        const element = document.getElementById(STORY_STAGES[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setCurrentStageIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStage = STORY_STAGES[currentStageIndex] || STORY_STAGES[0];
  const totalStages = STORY_STAGES.length.toString().padStart(2, "0");

  return (
    <>
      {/* 1. Top Minimal Line Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[1.5px] origin-left bg-gradient-to-r from-cyan-500 via-cyan-300 to-white"
        style={{ scaleX }}
      />

      {/* 2. Subtle Right HUD: Stage Counter & Vertical Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 select-none pointer-events-none">
        {/* Active Stage Indicator */}
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest text-slate-400">
          <span className="text-cyan-300 font-semibold">{activeStage.index}</span>
          <span className="h-4 w-[1px] bg-white/20" />
          <span className="text-slate-600">{totalStages}</span>
        </div>

        {/* Narrative Keyword Tag */}
        <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500 transition-colors duration-300">
          {activeStage.title}
        </div>

        {/* Vertical Stepper Dots */}
        <div className="flex flex-col gap-1.5 pt-2">
          {STORY_STAGES.map((stage, idx) => (
            <span
              key={stage.id}
              className={`w-1 transition-all duration-300 ${
                idx === currentStageIndex
                  ? "h-4 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "h-1 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
