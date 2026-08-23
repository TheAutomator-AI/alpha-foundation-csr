"use client";

import React from "react";
import { PartnerCategory } from "./PartnershipType";
import { Check } from "lucide-react";

export interface FormDataState {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  interests: string[];
  message: string;
}

interface PartnershipFormProps {
  partnerType: PartnerCategory;
  formData: FormDataState;
  onChangeField: (field: keyof FormDataState, value: any) => void;
  errors: Partial<Record<keyof FormDataState, string>>;
}

const INTEREST_OPTIONS = [
  "CSR PARTNERSHIP",
  "PROJECT SUPPORT",
  "LONG-TERM SOCIAL IMPACT",
  "CORPORATE COMMUNITY INITIATIVE",
  "OTHER",
];

export function PartnershipForm({
  partnerType,
  formData,
  onChangeField,
  errors,
}: PartnershipFormProps) {
  const toggleInterest = (interest: string) => {
    const current = formData.interests;
    if (current.includes(interest)) {
      onChangeField(
        "interests",
        current.filter((i) => i !== interest)
      );
    } else {
      onChangeField("interests", [...current, interest]);
    }
  };

  return (
    <div className="space-y-8">
      {/* =========================================================
          STEP 04 — CONTACT / ORGANIZATION DETAILS
      ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>
              {partnerType === "corporate"
                ? "ORGANIZATION & CONTACT DETAILS"
                : "YOUR CONTACT INFORMATION"}
            </span>
          </label>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            STEP 04 OF 06
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Organization Name (if corporate) */}
          {partnerType === "corporate" && (
            <div className="sm:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                ORGANIZATION NAME *
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => onChangeField("organizationName", e.target.value)}
                placeholder="e.g. Tata Consultancy Services / Infosys"
                className={`w-full bg-black/50 border px-4 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                  errors.organizationName
                    ? "border-red-500/80 focus:border-red-400"
                    : "border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                }`}
              />
              {errors.organizationName && (
                <span className="font-mono text-[10px] text-red-400 mt-1 block">
                  {errors.organizationName}
                </span>
              )}
            </div>
          )}

          {/* Contact Person Name */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
              {partnerType === "corporate"
                ? "CSR / PARTNERSHIP CONTACT *"
                : "FULL NAME *"}
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => onChangeField("contactName", e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className={`w-full bg-black/50 border px-4 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                errors.contactName
                  ? "border-red-500/80 focus:border-red-400"
                  : "border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              }`}
            />
            {errors.contactName && (
              <span className="font-mono text-[10px] text-red-400 mt-1 block">
                {errors.contactName}
              </span>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
              {partnerType === "corporate" ? "BUSINESS EMAIL *" : "EMAIL ADDRESS *"}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChangeField("email", e.target.value)}
              placeholder="e.g. csr@enterprise.com"
              className={`w-full bg-black/50 border px-4 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-500/80 focus:border-red-400"
                  : "border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              }`}
            />
            {errors.email && (
              <span className="font-mono text-[10px] text-red-400 mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
              PHONE NUMBER *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChangeField("phone", e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className={`w-full bg-black/50 border px-4 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                errors.phone
                  ? "border-red-500/80 focus:border-red-400"
                  : "border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              }`}
            />
            {errors.phone && (
              <span className="font-mono text-[10px] text-red-400 mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Website (Optional, for Corporate) */}
          {partnerType === "corporate" && (
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                ORGANIZATION WEBSITE (OPTIONAL)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => onChangeField("website", e.target.value)}
                placeholder="e.g. https://company.com"
                className="w-full bg-black/50 border border-white/15 px-4 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          STEP 05 — PARTNERSHIP INTEREST
      ========================================================= */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>WHAT WOULD YOU LIKE TO DISCUSS?</span>
          </label>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            STEP 05 OF 06
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = formData.interests.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                className={`p-3 border text-left transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-950/30 text-white"
                    : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
                data-cursor="DISCOVER"
                data-cursor-text="INTEREST"
                aria-pressed={isSelected}
              >
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  {opt}
                </span>
                <span
                  className={`flex h-4 w-4 items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-400 text-black"
                      : "border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          STEP 06 — MESSAGE / PRIORITY
      ========================================================= */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>TELL US ABOUT YOUR PRIORITY</span>
          </label>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
            STEP 06 OF 06
          </span>
        </div>

        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => onChangeField("message", e.target.value)}
          placeholder="Tell us what your organization is hoping to explore..."
          className="w-full bg-black/50 border border-white/15 p-4 font-sans text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}
