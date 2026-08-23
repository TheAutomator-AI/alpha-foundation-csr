"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function EducationWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "education") || IMPACT_PILLARS[0];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="04"
      alignment="left"
      vignetteStyle="default"
    />
  );
}
