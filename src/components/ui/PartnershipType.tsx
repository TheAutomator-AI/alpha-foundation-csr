"use client";

import React from "react";
import { Building2, User, Check } from "lucide-react";

export type PartnerCategory = "corporate" | "individual";

interface PartnershipTypeProps {
  selectedType: PartnerCategory;
  onSelectType: (type: PartnerCategory) => void;
}

export function PartnershipType({
  selectedType,
  onSelectType,
}: PartnershipTypeProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>WHO ARE YOU?</span>
        </label>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
          STEP 02 OF 06
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 1. Corporate / CSR (Visually Emphasized Primary Route) */}
        <button
          type="button"
          onClick={() => onSelectType("corporate")}
          className={`text-left p-5 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
            selectedType === "corporate"
              ? "border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              : "border-white/15 bg-white/[0.03] text-slate-300 hover:border-white/40 hover:bg-white/[0.05]"
          }`}
          data-cursor="DISCOVER"
          data-cursor-text="CORPORATE"
          aria-pressed={selectedType === "corporate"}
        >
          {/* Primary Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building2 className={`h-4 w-4 ${selectedType === "corporate" ? "text-cyan-400" : "text-slate-400"}`} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                CORPORATE / CSR
              </span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border border-cyan-500/40 bg-cyan-950/40 text-cyan-300">
              PRIMARY
            </span>
          </div>

          <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
            Institutional partnership, CSR mandate allocation, and community programs.
          </p>

          {selectedType === "corporate" && (
            <div className="mt-3 pt-3 border-t border-cyan-500/30 font-mono text-[9px] text-cyan-300 flex items-center gap-1.5">
              <Check className="h-3 w-3" />
              <span>Selected for Corporate Exploration</span>
            </div>
          )}
        </button>

        {/* 2. Individual Donor */}
        <button
          type="button"
          onClick={() => onSelectType("individual")}
          className={`text-left p-5 border transition-all duration-200 flex flex-col justify-between ${
            selectedType === "individual"
              ? "border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-slate-200"
          }`}
          data-cursor="DISCOVER"
          data-cursor-text="INDIVIDUAL"
          aria-pressed={selectedType === "individual"}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User className={`h-4 w-4 ${selectedType === "individual" ? "text-cyan-400" : "text-slate-400"}`} />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                INDIVIDUAL
              </span>
            </div>
          </div>

          <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
            High-value philanthropy, personal patronage, and individual social commitment.
          </p>

          {selectedType === "individual" && (
            <div className="mt-3 pt-3 border-t border-cyan-500/30 font-mono text-[9px] text-cyan-300 flex items-center gap-1.5">
              <Check className="h-3 w-3" />
              <span>Selected for Personal Giving</span>
            </div>
          )}
        </button>
      </div>

      {/* Contextual Guidance Notice */}
      <div className="p-3.5 bg-white/[0.02] border border-white/5 font-sans text-xs text-slate-300 font-light">
        {selectedType === "corporate" ? (
          <span className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
              FOR CORPORATE PARTNERS
            </span>
            <span>
              Explore a conversation around your organization's social-impact priorities and potential CSR partnership opportunities.
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-white/10 border border-white/15 text-slate-200 font-semibold">
              PERSONAL GIVING
            </span>
            <span>
              Explore an area of interest and start a conversation with the foundation.
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
