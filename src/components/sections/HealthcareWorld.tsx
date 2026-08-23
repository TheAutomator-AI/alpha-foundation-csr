"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function HealthcareWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "healthcare") || IMPACT_PILLARS[1];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="05"
      alignment="right"
      vignetteStyle="default"
    />
  );
}
