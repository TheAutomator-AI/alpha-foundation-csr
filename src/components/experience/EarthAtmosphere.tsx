"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface EarthAtmosphereProps {
  radius?: number;
}

export function EarthAtmosphere({ radius = 2.036 }: EarthAtmosphereProps) {
  // Custom delicate Rayleigh rim glow shader
  const atmosphereShader = useMemo(() => {
    return {
      uniforms: {
        glowColor: { value: new THREE.Color("#38bdf8") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          // Sharp exponential falloff to keep glow strictly confined to outer rim
          float intensity = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.8);
          gl_FragColor = vec4(glowColor, intensity * 0.75);
        }
      `,
    };
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        args={[atmosphereShader]}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
