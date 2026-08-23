"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OPERATING_REGIONS, latLonToVector3 } from "@/components/data/regionsData";

interface ConnectionLinesProps {
  radius?: number;
  selectedRegionId: string | null;
}

export function ConnectionLines({
  radius = 2.25,
  selectedRegionId,
}: ConnectionLinesProps) {
  const lineGroupRef = useRef<THREE.Group>(null);

  // Generate Bezier arcs from the core to each region node
  const arcCurves = useMemo(() => {
    return OPERATING_REGIONS.map((region) => {
      const target = latLonToVector3(region.lat, region.lon, radius);
      const origin = new THREE.Vector3(0, 0, 0);

      // Mid-point arched outward slightly
      const mid = target.clone().multiplyScalar(0.65);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, target);
      const points = curve.getPoints(32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("#00f5d4"),
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);

      return {
        id: region.id,
        line,
        material,
      };
    });
  }, [radius]);

  // Subtle breathing pulse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcCurves.forEach((arc, idx) => {
      const isSelected = selectedRegionId === arc.id;
      const isDimmed = selectedRegionId !== null && !isSelected;
      const baseOpacity = isSelected ? 0.85 : isDimmed ? 0.1 : 0.3;
      arc.material.opacity = baseOpacity + Math.sin(t * 2 + idx) * 0.1;
    });
  });

  return (
    <group ref={lineGroupRef}>
      {arcCurves.map((arc) => (
        <primitive key={arc.id} object={arc.line} />
      ))}
    </group>
  );
}
