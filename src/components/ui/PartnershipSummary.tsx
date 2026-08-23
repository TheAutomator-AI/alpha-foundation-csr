"use client";

import React from "react";
import { PartnerCategory } from "./PartnershipType";
import { FormDataState } from "./PartnershipForm";
import { ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { InstitutionalButton } from "./InstitutionalButton";

interface PartnershipSummaryProps {
  selectedImpact: string;
  partnerType: PartnerCategory;
  selectedAmount: string;
  customAmount: string;
  formData: FormDataState;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function PartnershipSummary({
  selectedImpact,
  partnerType,
  selectedAmount,
  customAmount,
  formData,
  onSubmit,
  isSubmitting = false,
}: PartnershipSummaryProps) {
  const displayAmount =
    selectedAmount === "CUSTOM"
      ? customAmount || "Custom Amount"
      : selectedAmount || "Not Selected";

  return (
    <div className="glass-panel p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden flex flex-col justify-between h-full">
      {/* Top Corner Accents */}
      <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-cyan-400" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              PARTNERSHIP EXPLORATION
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-cyan-500/30 text-cyan-300">
            LIVE PREVIEW
          </span>
        </div>

        {/* Live Summary Items Grid */}
        <div className="space-y-4 font-mono text-xs">
          {/* 1. Impact Priority */}
          <div className="p-3 bg-white/[0.02] border border-white/5">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
              IMPACT AREA
            </span>
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              {selectedImpact || "Select an Impact Priority"}
            </span>
          </div>

          {/* 2. Partner Type */}
          <div className="p-3 bg-white/[0.02] border border-white/5">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
              PARTNER TYPE
            </span>
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              {partnerType === "corporate" ? "CORPORATE / CSR PARTNERSHIP" : "INDIVIDUAL GIVING"}
            </span>
          </div>

          {/* 3. Exploratory Funding Intent */}
          <div className="p-3 bg-white/[0.02] border border-white/5">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
              FUNDING INTENT
            </span>
            <span className="text-base font-bold text-white tracking-wider">
              {displayAmount}
            </span>
          </div>

          {/* 4. Selected Interests */}
          <div className="p-3 bg-white/[0.02] border border-white/5">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
              DISCUSSION INTERESTS
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {formData.interests.length > 0 ? (
                formData.interests.map((i) => (
                  <span
                    key={i}
                    className="text-[9px] uppercase px-1.5 py-0.5 bg-cyan-950/40 border border-cyan-500/20 text-slate-300"
                  >
                    {i}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-[10px]">None selected</span>
              )}
            </div>
          </div>

          {/* 5. Contact Preview */}
          <div className="p-3 bg-white/[0.02] border border-white/5">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
              CONTACT
            </span>
            <div className="text-slate-300 font-sans text-xs space-y-0.5">
              {formData.organizationName && (
                <div className="font-semibold text-white">
                  {formData.organizationName}
                </div>
              )}
              <div>{formData.contactName || "Contact name pending"}</div>
              <div className="font-mono text-[10px] text-slate-400">
                {formData.email || "Email pending"} {formData.phone ? `• ${formData.phone}` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Submit Button */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
        <InstitutionalButton
          type="button"
          variant="cyan"
          size="lg"
          className="w-full justify-center font-bold"
          icon={<ArrowUpRight className="h-4 w-4" />}
          onClick={onSubmit}
          cursorState="CONNECT"
          cursorText="PREVIEW"
          disabled={isSubmitting}
        >
          {isSubmitting ? "PREPARING INQUIRY..." : "REVIEW & PREPARE INQUIRY →"}
        </InstitutionalButton>

        <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
          <span>Non-binding Exploratory Prototype</span>
        </div>
      </div>
    </div>
  );
}
