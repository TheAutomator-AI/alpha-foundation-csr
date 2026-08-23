"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CursorState } from "@/components/experience/CustomCursor";

interface InstitutionalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  cursorState?: CursorState;
  cursorText?: string;
  icon?: React.ReactNode;
  asChild?: boolean;
}

export function InstitutionalButton({
  children,
  variant = "primary",
  size = "md",
  cursorState,
  cursorText,
  icon,
  className,
  ...props
}: InstitutionalButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 select-none overflow-hidden active:scale-[0.98]";

  const sizes = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-8 py-4 text-xs font-semibold",
  };

  const variants = {
    primary:
      "bg-white text-black hover:bg-slate-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white",
    secondary:
      "bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/40 border border-white/20 backdrop-blur-md",
    cyan:
      "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] border border-cyan-400 font-semibold",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10",
  };

  return (
    <button
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      data-cursor={cursorState || (variant === "primary" ? "FUND" : "EXPLORE")}
      data-cursor-text={cursorText}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
      {/* Subtle shine highlight */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
    </button>
  );
}
