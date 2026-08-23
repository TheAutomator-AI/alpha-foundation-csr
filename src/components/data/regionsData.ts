import * as THREE from "three";

export interface OperatingRegion {
  id: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  causes: string[];
  description: string;
  leaderDirection: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const OPERATING_REGIONS: OperatingRegion[] = [
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    code: "TN-01",
    lat: 11.1271,
    lon: 78.6569,
    causes: [
      "EDUCATION",
      "HEALTHCARE",
      "ENVIRONMENT",
      "COMMUNITY",
      "WOMEN EMPOWERMENT",
    ],
    description:
      "Core operating state supporting multi-sector social infrastructure, school initiatives, and community healthcare access.",
    leaderDirection: "bottom-left",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    code: "KA-02",
    lat: 15.3173,
    lon: 75.7139,
    causes: [
      "EDUCATION",
      "HEALTHCARE",
      "ENVIRONMENT",
      "COMMUNITY",
      "WOMEN EMPOWERMENT",
    ],
    description:
      "Active operating state with programs focused on learning access, ecological sustainability, and community resilience.",
    leaderDirection: "top-left",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    code: "AP-03",
    lat: 15.9129,
    lon: 79.7400,
    causes: [
      "EDUCATION",
      "HEALTHCARE",
      "ENVIRONMENT",
      "COMMUNITY",
      "WOMEN EMPOWERMENT",
    ],
    description:
      "Regional operating footprint delivering healthcare outreach, rural infrastructure support, and disaster response preparedness.",
    leaderDirection: "top-right",
  },
  {
    id: "puducherry",
    name: "Puducherry",
    code: "PY-04",
    lat: 11.9416,
    lon: 79.8083,
    causes: [
      "EDUCATION",
      "HEALTHCARE",
      "ENVIRONMENT",
      "COMMUNITY",
      "WOMEN EMPOWERMENT",
    ],
    description:
      "Coastal operating region with targeted initiatives in vulnerable community care, women empowerment, and educational support.",
    leaderDirection: "bottom-right",
  },
];

/**
 * Converts Latitude and Longitude (degrees) to 3D Cartesian coordinates on a sphere of radius R.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number = 2.0
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}
