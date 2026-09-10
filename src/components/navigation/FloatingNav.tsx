"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, LogIn } from "lucide-react";
import { NAV_ITEMS, FOUNDATION_META } from "@/components/data/foundationData";
import { InstitutionalButton } from "@/components/ui/InstitutionalButton";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(href.replace("#", ""));
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    const target = document.getElementById("csr-lab") || document.getElementById("csr-form-panel");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-500 pointer-events-none", isScrolled ? "py-3 sm:py-4" : "py-5 sm:py-7")}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="pointer-events-auto group flex items-center gap-3 select-none" data-cursor="EXPLORE" data-cursor-text="ALPHA">
            <div className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black/60 backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <span className="font-display text-sm font-bold text-white tracking-tighter">α</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-cyan-300">{FOUNDATION_META.name}</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-slate-400">South India • Estd 2003</span>
            </div>
          </Link>

          <nav className={cn("pointer-events-auto hidden md:flex items-center gap-8 rounded-none border transition-all duration-500", isScrolled ? "px-6 py-2 border-white/20 bg-black/85 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]" : "px-7 py-2.5 border-white/10 bg-black/40 backdrop-blur-md")}>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="font-mono text-[11px] font-medium tracking-institutional uppercase text-slate-300 transition-colors duration-200 hover:text-cyan-300 relative py-1 group" data-cursor="CONNECT" data-cursor-text={item.label}>
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex">
              <InstitutionalButton variant="secondary" size={isScrolled ? "sm" : "md"} cursorState="CONNECT" cursorText="LOGIN" icon={<LogIn className="h-3.5 w-3.5" />}>
                Login
              </InstitutionalButton>
            </Link>

            <div className="hidden lg:block">
              <InstitutionalButton variant="primary" size={isScrolled ? "sm" : "md"} cursorState="FUND" cursorText="PARTNER" icon={<ArrowUpRight className="h-3.5 w-3.5" />} onClick={handleCtaClick}>
                {FOUNDATION_META.primaryCTA}
              </InstitutionalButton>
            </div>

            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden flex h-10 w-10 items-center justify-center border border-white/20 bg-black/80 backdrop-blur-xl text-white transition-colors hover:border-cyan-400" aria-label="Open Navigation Menu">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/98 backdrop-blur-3xl p-8 text-foreground">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center border border-white/30 bg-white/5"><span className="font-display text-sm font-bold text-white">α</span></div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">{FOUNDATION_META.name}</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white hover:border-white/40" aria-label="Close Navigation Menu"><X className="h-5 w-5" /></button>
            </div>

            <nav className="flex flex-col gap-6 my-auto py-8">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="font-display text-3xl sm:text-4xl font-normal uppercase tracking-wider text-cyan-300 hover:text-cyan-200 flex items-center justify-between border-b border-cyan-400/20 pb-4">
                <span>Login</span><LogIn className="h-5 w-5" />
              </Link>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item.href)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx, duration: 0.3 }} className="font-display text-3xl sm:text-4xl font-normal uppercase tracking-wider text-slate-200 hover:text-cyan-400 flex items-center justify-between border-b border-white/5 pb-4">
                  <span>{item.label}</span><span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <InstitutionalButton variant="cyan" size="lg" className="w-full justify-center" onClick={handleCtaClick}>{FOUNDATION_META.primaryCTA}</InstitutionalButton>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 uppercase tracking-widest pt-2"><span>Active Since 2003</span><span>South India CSR</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
