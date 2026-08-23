"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { InstitutionalBadge } from "@/components/ui/InstitutionalBadge";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";
import { ImpactSelector } from "@/components/ui/ImpactSelector";
import { PartnershipType, PartnerCategory } from "@/components/ui/PartnershipType";
import { FundingIntent } from "@/components/ui/FundingIntent";
import { PartnershipForm, FormDataState } from "@/components/ui/PartnershipForm";
import { PartnershipSummary } from "@/components/ui/PartnershipSummary";
import { SuccessState } from "@/components/ui/SuccessState";
import { FOUNDATION_INSTITUTIONAL_DATA } from "@/data/foundation";

export function CSRPartnershipLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const data = FOUNDATION_INSTITUTIONAL_DATA;

  // Form States
  const [selectedImpact, setSelectedImpact] = useState<string>("EDUCATION");
  const [partnerType, setPartnerType] = useState<PartnerCategory>("corporate");
  const [selectedAmount, setSelectedAmount] = useState<string>("₹50,000");
  const [customAmount, setCustomAmount] = useState<string>("");

  const [formData, setFormData] = useState<FormDataState>({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    interests: ["CSR PARTNERSHIP"],
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFieldChange = (field: keyof FormDataState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const errs: Partial<Record<keyof FormDataState, string>> = {};

    if (partnerType === "corporate" && !formData.organizationName.trim()) {
      errs.organizationName = "Organization name is required";
    }

    if (!formData.contactName.trim()) {
      errs.contactName = "Contact name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 8) {
      errs.phone = "Please enter a valid phone number";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll smoothly to form error
      const formEl = document.getElementById("csr-form-panel");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      interests: ["CSR PARTNERSHIP"],
      message: "",
    });
    setErrors({});
  };

  const scrollToControls = () => {
    const el = document.getElementById("csr-form-panel");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="csr-lab"
      ref={containerRef}
      className="relative min-h-screen w-full bg-graphite-950 text-foreground py-24 sm:py-36 overflow-hidden selection:bg-cyan-400 selection:text-black border-t border-white/10"
    >
      {/* 1. Ambient Digital Impact World Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.9)_0%,rgba(5,7,10,1)_80%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Dynamic Focus Glow corresponding to selected impact priority */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/[0.04] blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ========================================================
            2. OPENING EXPERIENCE HEADER
        ======================================================== */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <InstitutionalBadge variant="cyan">
              CSR PARTNERSHIP LAB
            </InstitutionalBadge>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              STRATEGIC ONBOARDING
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.08] mb-6"
          >
            PUT YOUR CSR CAPITAL TO WORK.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-slate-300 font-light max-w-2xl leading-relaxed border-l border-cyan-400/40 pl-5 mb-8"
          >
            Explore a potential partnership aligned with your organization's
            social-impact priorities and discover opportunities across South India.
          </motion.p>

          <InstitutionalButton
            variant="secondary"
            size="md"
            icon={<ArrowDown className="h-4 w-4 text-cyan-300" />}
            onClick={scrollToControls}
            cursorState="EXPLORE"
            cursorText="LAB"
          >
            EXPLORE PARTNERSHIP OPTIONS
          </InstitutionalButton>
        </div>

        {/* ========================================================
            3. INTERACTIVE PARTNERSHIP LAB INTERFACE
        ======================================================== */}
        <div id="csr-form-panel" className="scroll-mt-24 mb-28">
          {isSubmitted ? (
            /* Success State */
            <SuccessState
              selectedImpact={selectedImpact}
              partnerType={partnerType}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              formData={formData}
              onReset={handleReset}
            />
          ) : (
            /* Interactive 2-Column Lab */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Progression Controls */}
              <div className="lg:col-span-7 space-y-8 glass-panel p-6 sm:p-10 border border-white/10">
                {/* Step 01: Impact Priority */}
                <ImpactSelector
                  selectedImpact={selectedImpact}
                  onSelectImpact={(imp) => setSelectedImpact(imp)}
                />

                <div className="h-[1px] w-full bg-white/10" />

                {/* Step 02: Partnership Type */}
                <PartnershipType
                  selectedType={partnerType}
                  onSelectType={(t) => setPartnerType(t)}
                />

                <div className="h-[1px] w-full bg-white/10" />

                {/* Step 03: Exploratory Funding Intent */}
                <FundingIntent
                  selectedAmount={selectedAmount}
                  customAmount={customAmount}
                  onSelectAmount={(amt) => setSelectedAmount(amt)}
                  onChangeCustomAmount={(amt) => setCustomAmount(amt)}
                />

                <div className="h-[1px] w-full bg-white/10" />

                {/* Steps 04-06: Organization & Contact Form */}
                <PartnershipForm
                  partnerType={partnerType}
                  formData={formData}
                  onChangeField={handleFieldChange}
                  errors={errors}
                />
              </div>

              {/* Right Column: Live Partnership Summary Panel */}
              <div className="lg:col-span-5 sticky top-24">
                <PartnershipSummary
                  selectedImpact={selectedImpact}
                  partnerType={partnerType}
                  selectedAmount={selectedAmount}
                  customAmount={customAmount}
                  formData={formData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            4. FINAL CINEMATIC FINALE ANCHOR
        ======================================================== */}
        <div className="border-t border-white/10 pt-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Visual Synthesis Chain */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-[9.5px] uppercase tracking-widest text-slate-400 mb-8">
              <span>Education</span>
              <span>•</span>
              <span>Healthcare</span>
              <span>•</span>
              <span>Environment</span>
              <span>•</span>
              <span>Disaster Relief</span>
              <span>•</span>
              <span>Community</span>
              <span>•</span>
              <span>Women</span>
              <span>•</span>
              <span>Destitute Care</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 uppercase tracking-[0.25em] mb-4">
              <span>↓</span>
              <span>ALPHA FOUNDATION</span>
              <span>↓</span>
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400 mb-6">
              ONE SHARED PURPOSE
            </div>

            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-tight mb-6">
              READY TO CREATE IMPACT?
            </h3>

            <p className="font-sans text-base sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed mb-10">
              Let's start a conversation around your organization's social-impact
              priorities.
            </p>

            <div className="font-display text-2xl sm:text-3xl text-cyan-300 tracking-wide font-normal mb-10 italic">
              "A World Equal For All."
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
              <InstitutionalButton
                variant="cyan"
                size="lg"
                cursorState="FUND"
                cursorText="PARTNER"
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={scrollToControls}
              >
                START A CSR PARTNERSHIP
              </InstitutionalButton>

              <a
                href={`mailto:${data.contact.emails[0]}`}
                className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider px-8 py-4 border border-white/20 text-white hover:border-white/40 bg-white/[0.04] transition-colors"
                data-cursor="CONNECT"
                data-cursor-text="CONTACT"
              >
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>CONTACT ALPHA FOUNDATION</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. MASTER INSTITUTIONAL FOOTER
        ======================================================== */}
        <footer className="mt-24 pt-12 border-t border-white/10 text-slate-400 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Column 1: Organization & Identity */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 font-display text-white font-bold">
                  α
                </div>
                <span className="text-white font-bold tracking-[0.2em] uppercase">
                  {data.name}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                A long-term social-impact platform active since 2003 across
                Tamil Nadu, Karnataka, Andhra Pradesh, and Puducherry.
              </p>
              <div className="text-[10px] text-slate-500">
                Estd {data.activeSince} • CSR Registration: {data.csrRegistration.number}
              </div>
            </div>

            {/* Column 2: Governance Leadership */}
            <div className="md:col-span-3 space-y-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                TRUST LEADERSHIP
              </div>
              {data.leadership.map((l) => (
                <div key={l.role} className="text-xs">
                  <div className="text-slate-400 text-[10px] uppercase">{l.role}</div>
                  <div className="text-white font-medium">{l.name}</div>
                </div>
              ))}
            </div>

            {/* Column 3: Direct Contact */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                REGISTERED SECRETARIAT
              </div>
              <div className="font-sans text-xs text-slate-300 font-light">
                {data.contact.address.formatted}
              </div>
              <div className="text-cyan-300 font-mono text-xs pt-1">
                {data.contact.emails.join(" • ")}
              </div>
              <div className="text-slate-400 font-mono text-xs">
                {data.contact.phones.join(" • ")}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6 text-[10px] text-slate-500">
            <div>
              © 2003–{new Date().getFullYear()} {data.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Section 12AA & 80G Compliant</span>
              <span>•</span>
              <span>NITI Aayog: {data.nitiAayog.reference}</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
