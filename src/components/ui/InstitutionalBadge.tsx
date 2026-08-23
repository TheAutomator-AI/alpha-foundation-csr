import React from "react";
import { cn } from "@/lib/utils";

interface InstitutionalBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "gold" | "outline";
  className?: string;
}

export function InstitutionalBadge({
  children,
  variant = "default",
  className,
}: InstitutionalBadgeProps) {
  const variants = {
    default:
      "border-white/10 bg-white/[0.03] text-slate-300 backdrop-blur-md",
    cyan: "border-cyan-500/30 bg-cyan-950/20 text-cyan-300 backdrop-blur-md shadow-[0_0_12px_rgba(34,211,238,0.08)]",
    gold: "border-amber-500/30 bg-amber-950/20 text-amber-300 backdrop-blur-md",
    outline: "border-white/15 bg-transparent text-slate-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-none border px-3 py-1 font-mono text-[11px] font-medium tracking-institutional uppercase transition-all duration-300",
        variants[variant],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
      {children}
    </div>
  );
}
