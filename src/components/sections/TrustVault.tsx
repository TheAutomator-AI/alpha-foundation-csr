"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  Receipt,
  Landmark,
  MapPin,
  Users,
  Mail,
  Phone,
  Building2,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { FOUNDATION_INSTITUTIONAL_DATA } from "@/data/foundation";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";

export function TrustVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const data = FOUNDATION_INSTITUTIONAL_DATA;

  const scrollToLeadership = () => {
    const el = document.getElementById("trust-leadership");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("trust-contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPartnership = () => {
    const el = document.getElementById("convergence");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="trust-vault"
      ref={containerRef}
      className="relative min-h-screen w-full bg-graphite-950 text-foreground py-24 sm:py-36 overflow-hidden selection:bg-amber-400 selection:text-black border-t border-white/10"
    >
      {/* 1. Ambient Background: Fine Architectural Grid & Depth Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.9)_0%,rgba(5,7,10,1)_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Subtle Warm Institutional Gold / Cyan Ambient Wash */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-amber-500/[0.025] blur-[170px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ========================================================
            2. SECTION HEADER
        ======================================================== */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <InstitutionalBadge variant="gold">
              INSTITUTIONAL INFORMATION
            </InstitutionalBadge>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              THE TRUST VAULT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.08] mb-6"
          >
            TRUST IS BUILT ON TRANSPARENCY.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed border-l border-amber-400/40 pl-5"
          >
            Explore the institutional information provided by Alpha Foundation and
            understand the framework behind its social-impact work.
          </motion.p>
        </div>

        {/* ========================================================
            3. PRIMARY SCALE MOMENT: ₹3,311 CRORE
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative glass-panel p-8 sm:p-14 border border-white/10 mb-20 overflow-hidden"
          data-cursor="VERIFY"
          data-cursor-text="CA VALUE"
        >
          {/* Architectural Tech Corner Accents */}
          <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-amber-400/70" />
          <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-amber-400/70" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-amber-400/70" />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-amber-400/70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Giant Cinematic Scale Typography */}
            <div className="lg:col-span-8">
              <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300/90 mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>{data.projectValue.label}</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
                <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white">
                  {data.projectValue.formatted}
                </span>
                <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-slate-400 uppercase tracking-wider">
                  {data.projectValue.unit}
                </span>
              </div>

              <div className="font-mono text-xs text-slate-400 mt-4">
                {data.projectValue.description}
              </div>
            </div>

            {/* Right: Institutional Timeline Marker */}
            <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-10 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                  ESTABLISHED
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-normal text-white">
                    {data.activeSince}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">
                    ACTIVE SINCE
                  </span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                  CURRENT STATUS
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-normal text-slate-200">
                    PRESENT
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    CONTINUING SOCIAL-IMPACT WORK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            4. VERIFICATION REGISTRATION PANELS GRID
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {/* 1. CSR Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:border-amber-400/40 hover:bg-white/[0.04] transition-all group"
            data-cursor="VERIFY"
            data-cursor-text="CSR REG"
          >
            <div className="flex items-center justify-between text-slate-400 mb-5">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-amber-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                  {data.csrRegistration.label}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
            </div>

            <div className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider mb-2 group-hover:text-amber-200 transition-colors">
              {data.csrRegistration.number}
            </div>

            <div className="font-sans text-xs text-slate-400 font-light">
              {data.csrRegistration.description}
            </div>
          </motion.div>

          {/* 2. Tax Exemptions (12AA & 80G) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all group"
            data-cursor="VERIFY"
            data-cursor-text="TAX EXEMPT"
          >
            <div className="flex items-center justify-between text-slate-400 mb-5">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-cyan-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                  {data.taxExemptions.label}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            </div>

            <div className="flex items-center gap-2 mb-2 font-mono text-lg sm:text-xl font-bold text-white tracking-wider group-hover:text-cyan-200 transition-colors">
              <span>{data.taxExemptions.sections.join(" & ")}</span>
            </div>

            <div className="font-sans text-xs text-slate-400 font-light">
              {data.taxExemptions.act}
            </div>
          </motion.div>

          {/* 3. NITI Aayog Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.56 }}
            className="p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:border-amber-400/40 hover:bg-white/[0.04] transition-all group"
            data-cursor="VERIFY"
            data-cursor-text="NITI AAYOG"
          >
            <div className="flex items-center justify-between text-slate-400 mb-5">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-amber-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                  {data.nitiAayog.label}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
            </div>

            <div className="font-mono text-base sm:text-lg font-bold text-white tracking-wide mb-2 group-hover:text-amber-200 transition-colors">
              {data.nitiAayog.reference}
            </div>

            <div className="font-sans text-xs text-slate-400 font-light">
              NITI Aayog Reference
            </div>
          </motion.div>

          {/* 4. Operating Regions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.64 }}
            className="p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all group"
            data-cursor="VERIFY"
            data-cursor-text="4 REGIONS"
          >
            <div className="flex items-center justify-between text-slate-400 mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                  OPERATING REGIONS
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            </div>

            <div className="font-mono text-xs text-slate-200 space-y-1">
              {data.operatingRegions.map((region) => (
                <div key={region} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />
                  <span>{region}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            5. TRUST STATEMENT & TRANSPARENCY DIRECTORY
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pt-8 border-t border-white/10">
          {/* Left: Statement */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl sm:text-4xl font-normal text-white mb-6">
              BUILT FOR LONG-TERM IMPACT.
            </h3>
            <p className="font-sans text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Alpha Foundation has been active since 2003, with work spanning
              education, healthcare, environmental restoration, disaster relief,
              community development, women empowerment and care for vulnerable
              communities.
            </p>
          </div>

          {/* Right: Transparency Index */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-white/[0.02] border border-white/10">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-4">
              INFORMATION SHOULD BE EASY TO FIND.
            </div>

            <ul className="space-y-2.5 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>CSR Registration (CSR 00029723)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Tax Exemptions (12AA & 80G)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>NITI Aayog Reference (TN/2020/0253326)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Operating Regions (TN, KA, AP, PY)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Leadership & Contact Details</span>
              </li>
            </ul>

            <button
              onClick={scrollToLeadership}
              className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-300 hover:text-white transition-colors"
              data-cursor="EXPLORE"
              data-cursor-text="LEADERSHIP"
            >
              <span>EXPLORE THE FOUNDATION →</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            6. LEADERSHIP & CONTACT PANELS
        ======================================================== */}
        <div id="trust-leadership" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Leadership Panel */}
          <div className="lg:col-span-6 p-8 border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-slate-400 mb-6 font-mono text-xs uppercase tracking-widest">
              <Users className="h-4 w-4 text-cyan-400" />
              <span>LEADERSHIP</span>
            </div>

            <div className="space-y-6">
              {data.leadership.map((leader) => (
                <div
                  key={leader.role}
                  className="p-4 border border-white/5 bg-black/40 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    {leader.role}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-normal text-white mt-1">
                    {leader.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase">
              <span>Trust Board</span>
              <span className="text-cyan-300">Active Governance</span>
            </div>
          </div>

          {/* Contact & Registered Address Panel */}
          <div id="trust-contact" className="lg:col-span-6 p-8 border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-slate-400 mb-6 font-mono text-xs uppercase tracking-widest">
              <Building2 className="h-4 w-4 text-amber-400" />
              <span>CONTACT & REGISTERED ADDRESS</span>
            </div>

            {/* Address */}
            <div className="p-4 border border-white/5 bg-black/40 mb-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                REGISTERED ADDRESS
              </div>
              <div className="font-sans text-sm text-slate-200 font-light leading-relaxed">
                {data.contact.address.formatted}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 border border-white/5 bg-black/40">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  <Mail className="h-3 w-3 text-cyan-400" />
                  <span>EMAIL</span>
                </div>
                <div className="font-mono text-xs text-slate-200 space-y-0.5">
                  {data.contact.emails.map((em) => (
                    <div key={em} className="truncate">
                      {em}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-white/5 bg-black/40">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                  <Phone className="h-3 w-3 text-amber-400" />
                  <span>PHONE</span>
                </div>
                <div className="font-mono text-xs text-slate-200 space-y-0.5">
                  {data.contact.phones.map((ph) => (
                    <div key={ph}>{ph}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            7. CONVERSION BRIDGE TO PARTNERSHIP
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-black text-center flex flex-col items-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">
            YOU'VE SEEN THE MISSION. NOW EXPLORE THE PARTNERSHIP.
          </span>

          <h3 className="font-display text-3xl sm:text-5xl font-normal text-white mb-8 max-w-2xl">
            Transform CSR Capital Into Meaningful Infrastructure
          </h3>

          <InstitutionalButton
            variant="cyan"
            size="lg"
            cursorState="FUND"
            cursorText="PARTNER"
            icon={<ArrowUpRight className="h-4 w-4" />}
            onClick={scrollToPartnership}
          >
            START A CSR PARTNERSHIP →
          </InstitutionalButton>
        </motion.div>
      </div>
    </section>
  );
}
