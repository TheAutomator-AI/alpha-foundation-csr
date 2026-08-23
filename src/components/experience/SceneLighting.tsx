"use client";

import React from "react";

export function SceneLighting() {
  return (
    <>
      {/* 1. Balanced ambient fill allowing natural terminator depth */}
      <ambientLight intensity={0.65} color="#1e293b" />

      {/* 2. Primary directional sunlight key (illuminates Earth with distinct terminator) */}
      <directionalLight
        position={[6, 3.5, 5]}
        intensity={2.4}
        color="#ffffff"
      />

      {/* 3. Subtle sapphire rim backlight */}
      <directionalLight
        position={[-6, -2, -5]}
        intensity={1.6}
        color="#38bdf8"
      />

      {/* 4. Soft deep space bounce fill */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.35}
        color="#0ea5e9"
      />
    </>
  );
}
