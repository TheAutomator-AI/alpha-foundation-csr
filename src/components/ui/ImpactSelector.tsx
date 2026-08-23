"use client";

import React from "react";
import { Check } from "lucide-react";
import { INTRO_IMPACT_AREAS } from "@/components/data/foundationData";

interface ImpactSelectorProps {
  selectedImpact: string;
  onSelectImpact: (impact: string) => void;
}

export function ImpactSelector({
  selectedImpact,
  onSelectImpact,
}: ImpactSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>WHAT WOULD YOU LIKE TO SUPPORT?</span>
        </label>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
          STEP 01 OF 06
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {INTRO_IMPACT_AREAS.map((area) => {
          const isSelected = selectedImpact === area;
          return (
            <button
              key={area}
              type="button"
              onClick={() => onSelectImpact(area)}
              className={`text-left p-3.5 border transition-all duration-200 flex items-center justify-between group ${
                isSelected
                  ? "border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
              data-cursor="DISCOVER"
              data-cursor-text={area.split(" ")[0]}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-none transition-colors ${
                    isSelected ? "bg-cyan-400" : "bg-white/20 group-hover:bg-white/40"
                  }`}
                />
                <span className="font-mono text-xs uppercase tracking-wider font-medium">
                  {area}
                </span>
              </div>

              {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
            </button>
          );
        })}
      </div>

      <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-slate-400">
        <span>Selected Impact Priority:</span>
        <span className="text-cyan-300 font-semibold uppercase tracking-wider">
          {selectedImpact || "None Selected"}
        </span>
      </div>
    </div>
  );
}
