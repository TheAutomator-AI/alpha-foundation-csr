"use client";

import React from "react";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-[0.02] mix-blend-screen"
      style={{
        backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(5,7,10,0.5) 100%)`,
      }}
    />
  );
}
