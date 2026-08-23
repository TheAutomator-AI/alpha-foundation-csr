"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function CommunityWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "community") || IMPACT_PILLARS[5];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="09"
      alignment="right"
      vignetteStyle="default"
    />
  );
}
