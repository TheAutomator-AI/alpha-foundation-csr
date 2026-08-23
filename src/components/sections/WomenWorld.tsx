"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function WomenWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "women") || IMPACT_PILLARS[4];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="08"
      alignment="left"
      vignetteStyle="default"
    />
  );
}
