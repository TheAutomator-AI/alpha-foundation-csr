import { HeroSection } from "@/components/sections/HeroSection";
import { TrustGateway } from "@/components/sections/TrustGateway";
import { ImpactWorldIntro } from "@/components/sections/ImpactWorldIntro";
import { ImpactWorldSection } from "@/components/sections/ImpactWorldSection";
import { EducationWorld } from "@/components/sections/EducationWorld";
import { HealthcareWorld } from "@/components/sections/HealthcareWorld";
import { EnvironmentWorld } from "@/components/sections/EnvironmentWorld";
import { DisasterWorld } from "@/components/sections/DisasterWorld";
import { WomenWorld } from "@/components/sections/WomenWorld";
import { CommunityWorld } from "@/components/sections/CommunityWorld";
import { TrustVault } from "@/components/sections/TrustVault";
import { CSRPartnershipLab } from "@/components/sections/CSRPartnershipLab";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-graphite-950 text-foreground overflow-x-hidden">
      {/* SCENE 01 — HERO (ARRIVE) */}
      <HeroSection />

      {/* SCENE 02 — ENTER THE TRUST (ENTER) */}
      <TrustGateway />

      {/* SCENE 03 — IMPACT WORLD INTRO (EXPLORE) */}
      <ImpactWorldIntro />

      {/* SCENE 04 — INTERACTIVE 3D IMPACT EARTH (EXPLORE THE IMPACT WORLD) */}
      <ImpactWorldSection />

      {/* SCENE 05 — EDUCATION (LEARN) */}
      <EducationWorld />

      {/* SCENE 06 — HEALTHCARE (HEAL) */}
      <HealthcareWorld />

      {/* SCENE 07 — ENVIRONMENT (RESTORE) */}
      <EnvironmentWorld />

      {/* SCENE 08 — DISASTER RESPONSE (RELIEF) */}
      <DisasterWorld />

      {/* SCENE 09 — WOMEN EMPOWERMENT (EMPOWER) */}
      <WomenWorld />

      {/* SCENE 10 — COMMUNITY DEVELOPMENT (BUILD) */}
      <CommunityWorld />

      {/* SCENE 11 — THE TRUST VAULT (INSTITUTIONAL INFORMATION & VERIFICATION) */}
      <TrustVault />

      {/* SCENE 12 — THE CSR PARTNERSHIP LAB (STRATEGIC ONBOARDING & CONVERSION) */}
      <CSRPartnershipLab />
    </div>
  );
}
