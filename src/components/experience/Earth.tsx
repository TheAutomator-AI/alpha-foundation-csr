"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EarthGrid } from "./EarthGrid";
import { EarthAtmosphere } from "./EarthAtmosphere";

interface EarthProps {
  radius?: number;
  autoRotate?: boolean;
  selectedRegionId: string | null;
  onEarthPointerOver?: () => void;
  onEarthPointerOut?: () => void;
}

export function Earth({
  radius = 2.0,
  autoRotate = true,
  selectedRegionId,
  onEarthPointerOver,
  onEarthPointerOut,
}: EarthProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
  }, []);

  // Load local textures
  const [dayTexture, nightTexture, specularTexture, cloudsTexture] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const day = loader.load("/textures/earth/earth_day.jpg");
    const night = loader.load("/textures/earth/earth_lights.png");
    const specular = loader.load("/textures/earth/earth_specular.jpg");
    const clouds = loader.load("/textures/earth/earth_clouds.png");

    day.colorSpace = THREE.SRGBColorSpace;
    night.colorSpace = THREE.SRGBColorSpace;

    return [day, night, specular, clouds];
  }, []);

  // Initial rotation angle to center India (approx 78°E Longitude facing camera)
  useEffect(() => {
    if (earthGroupRef.current) {
      // In equirectangular mapping with standard Three.js sphere:
      // Offset so South India is positioned directly toward the front viewer
      earthGroupRef.current.rotation.y = -Math.PI * 0.45;
      earthGroupRef.current.rotation.x = 0.15; // slight 15-degree tilt
    }
  }, []);

  // Gentle auto-rotation when no region is actively selected
  useFrame((_, delta) => {
    if (earthGroupRef.current && autoRotate && !selectedRegionId && !prefersReducedMotion) {
      earthGroupRef.current.rotation.y += delta * 0.025;
    }
    // Clouds rotate slightly faster for natural atmospheric movement
    if (cloudsRef.current && !prefersReducedMotion) {
      cloudsRef.current.rotation.y += delta * 0.032;
    }
  });

  return (
    <group
      ref={earthGroupRef}
      onPointerOver={onEarthPointerOver}
      onPointerOut={onEarthPointerOut}
    >
      {/* 1. Core Dark Institutional Earth Surface */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={dayTexture}
          color="#1e2c3d" // Dark blue-gray institutional tone
          roughness={0.7}
          metalness={0.15}
          roughnessMap={specularTexture}
          emissiveMap={nightTexture}
          emissive="#1e3a5f"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* 2. Subtle Transparent Cloud Layer (Hugging Earth at radius * 1.008) */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.008, 48, 48]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Ultra-subtle Institutional Coordinate Grid (0.07 opacity) */}
      <EarthGrid radius={radius * 1.002} />

      {/* 4. Delicate Rayleigh Atmospheric Rim Shell (Hugging Earth at radius * 1.018) */}
      <EarthAtmosphere radius={radius * 1.018} />
    </group>
  );
}
