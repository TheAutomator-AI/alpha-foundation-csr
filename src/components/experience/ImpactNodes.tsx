"use client";

import React, { useState, useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  OPERATING_REGIONS,
  OperatingRegion,
  latLonToVector3,
} from "@/components/data/regionsData";
import { useCursor } from "@/components/experience/CustomCursor";

interface ImpactNodesProps {
  radius?: number;
  selectedRegionId: string | null;
  onSelectRegion: (region: OperatingRegion) => void;
  onHoverNode?: (regionId: string | null) => void;
}

// Directional offset mappings to prevent label overlap
const OFFSET_MAP: Record<string, { x: number; y: number; z: number }> = {
  "karnataka": { x: -0.22, y: 0.18, z: 0.08 },
  "andhra-pradesh": { x: 0.22, y: 0.18, z: 0.08 },
  "tamil-nadu": { x: -0.22, y: -0.18, z: 0.08 },
  "puducherry": { x: 0.22, y: -0.18, z: 0.08 },
};

export function ImpactNodes({
  radius = 2.0,
  selectedRegionId,
  onSelectRegion,
  onHoverNode,
}: ImpactNodesProps) {
  const { setCursorState, setCursorText } = useCursor();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handlePointerOver = (e: any, region: OperatingRegion) => {
    e.stopPropagation();
    setHoveredId(region.id);
    setCursorState("DISCOVER");
    setCursorText(region.name.toUpperCase());
    if (onHoverNode) onHoverNode(region.id);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHoveredId(null);
    setCursorState("ROTATE");
    setCursorText("ROTATE");
    if (onHoverNode) onHoverNode(null);
  };

  const handleClick = (e: any, region: OperatingRegion) => {
    e.stopPropagation();
    onSelectRegion(region);
  };

  return (
    <group>
      {OPERATING_REGIONS.map((region) => {
        const position = latLonToVector3(region.lat, region.lon, radius);
        const isHovered = hoveredId === region.id;
        const isSelected = selectedRegionId === region.id;
        const isDimmed = selectedRegionId !== null && !isSelected;

        const normal = position.clone().normalize();
        const beamLength = isSelected ? 0.18 : 0.12;
        const beamCenter = position.clone().add(normal.clone().multiplyScalar(beamLength / 2));

        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);

        // Intelligent offset for non-overlapping labels
        const offset = OFFSET_MAP[region.id] || { x: 0, y: 0.15, z: 0 };
        const labelPosition = position
          .clone()
          .add(normal.clone().multiplyScalar(beamLength))
          .add(new THREE.Vector3(offset.x, offset.y, offset.z));

        return (
          <group key={region.id}>
            {/* 1. Large Interactive Click Target */}
            <mesh
              position={position}
              onPointerOver={(e) => handlePointerOver(e, region)}
              onPointerOut={handlePointerOut}
              onClick={(e) => handleClick(e, region)}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* 2. Delicate Luminous Core Pin */}
            <mesh position={position}>
              <sphereGeometry args={[isSelected ? 0.032 : isHovered ? 0.026 : 0.018, 16, 16]} />
              <meshBasicMaterial
                color={isSelected ? "#00f5d4" : isHovered ? "#38bdf8" : "#ffffff"}
                transparent
                opacity={isDimmed ? 0.25 : 1}
              />
            </mesh>

            {/* 3. Subtle Halo Ring */}
            <mesh position={position} quaternion={quaternion} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.02, isSelected ? 0.06 : isHovered ? 0.045 : 0.035, 32]} />
              <meshBasicMaterial
                color="#00f5d4"
                transparent
                opacity={isSelected ? 0.8 : isHovered ? 0.5 : isDimmed ? 0.1 : 0.25}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>

            {/* 4. Fine Vertical Marker Beam */}
            <mesh position={beamCenter} quaternion={quaternion}>
              <cylinderGeometry args={[0.002, 0.002, beamLength, 8]} />
              <meshBasicMaterial
                color="#00f5d4"
                transparent
                opacity={isSelected ? 0.9 : isHovered ? 0.7 : isDimmed ? 0.1 : 0.4}
                depthWrite={false}
              />
            </mesh>

            {/* 5. Non-Overlapping Offset Regional Label */}
            <Html
              position={labelPosition}
              center
              distanceFactor={8}
              className="pointer-events-none select-none"
            >
              <div
                onClick={(e) => handleClick(e, region)}
                className="pointer-events-auto cursor-pointer group flex flex-col items-center"
              >
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 border backdrop-blur-md transition-all duration-200 ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/90 text-white shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-105"
                      : isHovered
                      ? "border-cyan-400/70 bg-black/80 text-white shadow-[0_0_10px_rgba(56,189,248,0.25)]"
                      : "border-white/15 bg-black/65 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      isSelected ? "bg-cyan-400 animate-ping" : "bg-cyan-400"
                    }`}
                  />
                  <span className="font-mono text-[8px] sm:text-[8.5px] font-medium uppercase tracking-wider whitespace-nowrap">
                    {region.name}
                  </span>
                  <span className="font-mono text-[6.5px] text-cyan-300">
                    {region.code}
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
