"use client";

import React, { useState } from "react";
import { Coins, Check } from "lucide-react";

interface FundingIntentProps {
  selectedAmount: string;
  customAmount: string;
  onSelectAmount: (amount: string) => void;
  onChangeCustomAmount: (amount: string) => void;
}

const PRESET_AMOUNTS = ["₹10,000", "₹25,000", "₹50,000", "₹1,00,000", "CUSTOM"];

export function FundingIntent({
  selectedAmount,
  customAmount,
  onSelectAmount,
  onChangeCustomAmount,
}: FundingIntentProps) {
  const isCustom = selectedAmount === "CUSTOM";

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      onChangeCustomAmount("");
      return;
    }
    const num = parseInt(val, 10);
    // Format into Indian currency string
    const formatted = "₹" + num.toLocaleString("en-IN");
    onChangeCustomAmount(formatted);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>WHAT LEVEL OF SUPPORT ARE YOU EXPLORING?</span>
        </label>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
          STEP 03 OF 06
        </span>
      </div>

      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
        <Coins className="h-3.5 w-3.5 text-cyan-400" />
        <span>EXPLORATORY FUNDING INTENT (NON-BINDING)</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {PRESET_AMOUNTS.map((preset) => {
          const isSelected = selectedAmount === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onSelectAmount(preset)}
              className={`p-3.5 border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? "border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
              data-cursor="FUND"
              data-cursor-text={preset}
              aria-pressed={isSelected}
            >
              <span className="font-mono text-sm font-bold tracking-wider">
                {preset}
              </span>
              {isSelected && (
                <span className="h-1 w-4 bg-cyan-400 rounded-none mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Amount Numeric Input */}
      {isCustom && (
        <div className="pt-2 animate-fadeIn">
          <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1.5">
            ENTER CUSTOM EXPLORATORY AMOUNT (INR)
          </label>
          <div className="relative">
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomInput}
              placeholder="e.g. ₹5,00,000"
              className="w-full bg-black/60 border border-cyan-500/40 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>
      )}

      <div className="text-[10px] font-sans text-slate-400 font-light leading-relaxed">
        * Exploratory funding-intent estimates help tailor partnership scoping discussions. No payment is processed at this stage.
      </div>
    </div>
  );
}
