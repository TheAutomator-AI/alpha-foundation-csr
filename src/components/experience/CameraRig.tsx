"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  OperatingRegion,
  latLonToVector3,
} from "@/components/data/regionsData";

interface CameraRigProps {
  selectedRegion: OperatingRegion | null;
  hoveredRegionId: string | null;
  resetTrigger: number;
}

export function CameraRig({
  selectedRegion,
  hoveredRegionId,
  resetTrigger,
}: CameraRigProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  // Complete Earth framing (occupies ~50% of screen height with ample space)
  const defaultPosition = useRef(new THREE.Vector3(0, 0.2, 5.2));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));

  const targetPosition = useRef(new THREE.Vector3(0, 0.2, 5.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Update target coordinates when a region is selected or reset
  useEffect(() => {
    if (selectedRegion) {
      const nodePos = latLonToVector3(selectedRegion.lat, selectedRegion.lon, 2.0);
      const normal = nodePos.clone().normalize();

      // Smoothly approach region while retaining full Earth context
      targetPosition.current.copy(normal.multiplyScalar(3.9).add(new THREE.Vector3(0, 0.15, 0)));
      targetLookAt.current.copy(nodePos.clone().multiplyScalar(0.3));
    } else {
      targetPosition.current.copy(defaultPosition.current);
      targetLookAt.current.copy(defaultTarget.current);
    }
  }, [selectedRegion, resetTrigger]);

  useFrame((_, delta) => {
    // Damped smooth camera interpolation
    const lerpFactor = Math.min(1, delta * 2.5);
    camera.position.lerp(targetPosition.current, lerpFactor);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, lerpFactor);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false} // Crucial: allows natural web page scrolling
      enablePan={false}
      rotateSpeed={0.6}
      dampingFactor={0.06}
      enableDamping={true}
      minPolarAngle={Math.PI * 0.2}
      maxPolarAngle={Math.PI * 0.8}
    />
  );
}
