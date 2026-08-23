"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface EarthGridProps {
  radius?: number;
}

export function EarthGrid({ radius = 2.004 }: EarthGridProps) {
  // Generate ultra-subtle, thin geographic coordinate lines
  const gridObject = useMemo(() => {
    const group = new THREE.Group();

    // Latitude circles (parallels every 30 degrees)
    const latDivisions = 6;
    for (let i = 1; i < latDivisions; i++) {
      const lat = (i / latDivisions) * Math.PI - Math.PI / 2;
      const r = radius * Math.cos(lat);
      const y = radius * Math.sin(lat);

      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.sin(theta), y, r * Math.cos(theta)));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const isEquator = i === 3;
      const mat = new THREE.LineBasicMaterial({
        color: isEquator ? new THREE.Color("#38bdf8") : new THREE.Color("#64748b"),
        transparent: true,
        opacity: isEquator ? 0.12 : 0.05,
        depthWrite: false,
      });
      group.add(new THREE.Line(geom, mat));
    }

    // Longitude circles (meridians every 45 degrees)
    const lonDivisions = 8;
    for (let i = 0; i < lonDivisions; i++) {
      const lon = (i / lonDivisions) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const lat = (j / segments) * Math.PI - Math.PI / 2;
        const r = radius * Math.cos(lat);
        const y = radius * Math.sin(lat);
        points.push(
          new THREE.Vector3(r * Math.sin(lon), y, r * Math.cos(lon))
        );
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#64748b"),
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      });
      group.add(new THREE.Line(geom, mat));
    }

    return group;
  }, [radius]);

  return <primitive object={gridObject} />;
}
