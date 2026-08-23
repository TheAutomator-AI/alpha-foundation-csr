"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function EnvironmentWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "environment") || IMPACT_PILLARS[2];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="06"
      alignment="left"
      vignetteStyle="minimal"
    />
  );
}
