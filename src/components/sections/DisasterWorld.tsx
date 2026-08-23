"use client";

import React from "react";
import { IMPACT_PILLARS } from "@/components/data/foundationData";
import { PillarWorldScene } from "./PillarWorldScene";

export function DisasterWorld() {
  const pillar = IMPACT_PILLARS.find((p) => p.id === "disaster") || IMPACT_PILLARS[3];

  return (
    <PillarWorldScene
      pillar={pillar}
      sceneIndex="07"
      alignment="right"
      vignetteStyle="intense"
    />
  );
}
