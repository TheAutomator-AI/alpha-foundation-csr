"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  RotateCcw,
  Building2,
  Sparkles,
} from "lucide-react";
import { PartnerCategory } from "./PartnershipType";
import { FormDataState } from "./PartnershipForm";
import { FOUNDATION_INSTITUTIONAL_DATA } from "@/data/foundation";
import { InstitutionalButton } from "./InstitutionalButton";

interface SuccessStateProps {
  selectedImpact: string;
  partnerType: PartnerCategory;
  selectedAmount: string;
  customAmount: string;
  formData: FormDataState;
  onReset: () => void;
}

export function SuccessState({
  selectedImpact,
  partnerType,
  selectedAmount,
  customAmount,
  formData,
  onReset,
}: SuccessStateProps) {
  const data = FOUNDATION_INSTITUTIONAL_DATA;
  const displayAmount =
    selectedAmount === "CUSTOM"
      ? customAmount || "Custom Amount"
      : selectedAmount || "Not specified";

  // Construct mailto link
  const emailSubject = encodeURIComponent(
    `CSR Partnership Discussion — Alpha Foundation (${
      partnerType === "corporate" ? formData.organizationName || "Corporate" : "Individual"
    })`
  );

  const emailBody = encodeURIComponent(
    `Dear Alpha Foundation Leadership,

I would like to explore a potential social-impact partnership:

1. IMPACT PRIORITY: ${selectedImpact}
2. PARTNER TYPE: ${partnerType === "corporate" ? "Corporate / CSR" : "Individual"}
3. EXPLORATORY FUNDING INTENT: ${displayAmount}
4. ORGANIZATION: ${formData.organizationName || "N/A"}
5. CONTACT PERSON: ${formData.contactName}
6. EMAIL: ${formData.email}
7. PHONE: ${formData.phone}
8. WEBSITE: ${formData.website || "N/A"}
9. INTERESTS: ${formData.interests.join(", ") || "General CSR Exploration"}

MESSAGE / SCOPE NOTES:
${formData.message || "Looking forward to an introductory discussion."}

Best regards,
${formData.contactName}
${formData.organizationName ? formData.organizationName : ""}`
  );

  const mailtoUrl = `mailto:${data.contact.emails[0]}?cc=${data.contact.emails[1]}&subject=${emailSubject}&body=${emailBody}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-8 sm:p-12 border border-cyan-400/40 relative overflow-hidden"
    >
      {/* Corner Tech Accents */}
      <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-cyan-400" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center border border-cyan-400 bg-cyan-950/40 text-cyan-300">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-300">
            INQUIRY DRAFT COMPILED
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-normal text-white">
            PARTNERSHIP REQUEST READY
          </h3>
        </div>
      </div>

      <p className="font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
        Your partnership details are ready for the next conversation with Alpha Foundation.
        Click below to dispatch an official briefing draft via your email client.
      </p>

      {/* Structured Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-8">
        <div className="p-4 bg-black/40 border border-white/10">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
            SELECTED IMPACT AREA
          </span>
          <span className="font-bold text-cyan-300 text-sm">{selectedImpact}</span>
        </div>

        <div className="p-4 bg-black/40 border border-white/10">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
            PARTNERSHIP TYPE
          </span>
          <span className="font-bold text-white text-sm uppercase">
            {partnerType === "corporate" ? "Corporate / CSR" : "Individual"}
          </span>
        </div>

        <div className="p-4 bg-black/40 border border-white/10">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">
            FUNDING INTENT
          </span>
          <span className="font-bold text-white text-sm">{displayAmount}</span>
        </div>
      </div>

      {/* Direct Verified Foundation Contacts */}
      <div className="p-6 bg-white/[0.02] border border-white/10 mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block mb-4">
          DIRECT FOUNDATION CONTACTS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500">MANAGING TRUSTEE EMAIL</div>
            <div className="text-white font-medium">{data.contact.emails[1]}</div>
            <div className="text-[10px] text-slate-500 pt-1">SECRETARIAT EMAIL</div>
            <div className="text-cyan-300 font-medium">{data.contact.emails[0]}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] text-slate-500">DIRECT PHONES</div>
            <div className="text-white font-medium">{data.contact.phones.join("  /  ")}</div>
            <div className="text-[10px] text-slate-500 pt-1">LOCATION</div>
            <div className="text-slate-300 font-light truncate">{data.contact.address.formatted}</div>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <a
          href={mailtoUrl}
          className="group relative inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest px-8 py-4 bg-cyan-400 text-black hover:bg-cyan-300 font-bold border border-cyan-400 transition-all select-none shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          data-cursor="CONNECT"
          data-cursor-text="EMAIL"
        >
          <Mail className="h-4 w-4" />
          <span>EMAIL THE FOUNDATION</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-4 border border-white/20 text-slate-300 hover:text-white hover:border-white/40 bg-black/40 transition-colors"
          data-cursor="EXPLORE"
          data-cursor-text="RESET"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>START AGAIN</span>
        </button>
      </div>

      <div className="mt-4 text-[10px] font-sans text-slate-400 font-light">
        * Note: Clicking "Email the Foundation" opens a pre-populated inquiry draft in your default email client.
      </div>
    </motion.div>
  );
}
