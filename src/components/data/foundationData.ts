export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "IMPACT", href: "#impact-intro" },
  { label: "GLOBE", href: "#impact-world" },
  { label: "TRUST", href: "#trust-vault" },
  { label: "CSR LAB", href: "#csr-lab" },
  { label: "CONTACT", href: "#trust-contact" },
];

export const FOUNDATION_META = {
  name: "ALPHA FOUNDATION",
  tagline: "CSR • SOCIAL IMPACT • INDIA",
  heroHeadline: "A World Equal For All.",
  heroSupportingText:
    "Transform CSR capital into meaningful social infrastructure, community opportunity and long-term social impact across South India.",
  primaryCTA: "START A CSR PARTNERSHIP",
  secondaryCTA: "EXPLORE THE IMPACT",
  activeSince: "2003",
  operatingRegions: [
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Puducherry",
  ],
};

export interface ImpactPillar {
  id: string;
  label: string;
  code: string;
  headline: string;
  copy: string;
  ctaText: string;
  videoSrc: string;
  stepNumber: string;
}

export const IMPACT_PILLARS: ImpactPillar[] = [
  {
    id: "education",
    label: "EDUCATION",
    code: "PIL-01",
    headline: "BUILD ACCESS TO LEARNING.",
    copy: "Support school and adult education initiatives that expand opportunity and strengthen communities.",
    ctaText: "EXPLORE EDUCATION",
    videoSrc: "/videos/education.mp4",
    stepNumber: "05",
  },
  {
    id: "healthcare",
    label: "HEALTHCARE",
    code: "PIL-02",
    headline: "BRING CARE CLOSER.",
    copy: "Support accessible healthcare infrastructure and Siddha and Ayurvedic medical initiatives designed around community needs.",
    ctaText: "EXPLORE HEALTHCARE",
    videoSrc: "/videos/healthcare.mp4",
    stepNumber: "06",
  },
  {
    id: "environment",
    label: "ENVIRONMENT",
    code: "PIL-03",
    headline: "RESTORE WHAT COMMUNITIES DEPEND ON.",
    copy: "Support environmental restoration and initiatives that contribute to healthier and more resilient communities.",
    ctaText: "EXPLORE ENVIRONMENT",
    videoSrc: "/videos/environment.mp4",
    stepNumber: "07",
  },
  {
    id: "disaster",
    label: "DISASTER RESPONSE",
    code: "PIL-04",
    headline: "WHEN CRISIS ARRIVES, RESPONSE CANNOT WAIT.",
    copy: "Support disaster-response initiatives that help communities recover when emergencies disrupt homes, livelihoods and essential services.",
    ctaText: "EXPLORE DISASTER RESPONSE",
    videoSrc: "/videos/disaster.mp4",
    stepNumber: "08",
  },
  {
    id: "women",
    label: "WOMEN EMPOWERMENT",
    code: "PIL-05",
    headline: "CREATE PATHWAYS TO GREATER INDEPENDENCE.",
    copy: "Support empowerment initiatives that expand capability, participation and opportunity for women.",
    ctaText: "EXPLORE EMPOWERMENT",
    videoSrc: "/videos/women.mp4",
    stepNumber: "09",
  },
  {
    id: "community",
    label: "COMMUNITY DEVELOPMENT",
    code: "PIL-06",
    headline: "BUILD STRONGER COMMUNITIES.",
    copy: "Support rural and urban development initiatives designed to improve community infrastructure, opportunity and quality of life.",
    ctaText: "EXPLORE COMMUNITY IMPACT",
    videoSrc: "/videos/community.mp4",
    stepNumber: "10",
  },
];

export const CSR_FOCUS_PILLARS = IMPACT_PILLARS;

export const INTRO_IMPACT_AREAS = [
  "EDUCATION",
  "HEALTHCARE",
  "ENVIRONMENT",
  "DISASTER RELIEF",
  "COMMUNITY DEVELOPMENT",
  "WOMEN EMPOWERMENT",
  "DESTITUTE CARE",
];

export const STORY_STAGES = [
  { id: "hero", title: "ARRIVE", index: "01" },
  { id: "trust-gateway", title: "ENTER", index: "02" },
  { id: "impact-intro", title: "EXPLORE", index: "03" },
  { id: "impact-world", title: "GLOBE", index: "04" },
  { id: "education", title: "LEARN", index: "05" },
  { id: "healthcare", title: "HEAL", index: "06" },
  { id: "environment", title: "RESTORE", index: "07" },
  { id: "disaster", title: "RELIEF", index: "08" },
  { id: "women", title: "EMPOWER", index: "09" },
  { id: "community", title: "BUILD", index: "10" },
  { id: "trust-vault", title: "VAULT", index: "11" },
  { id: "csr-lab", title: "PARTNER", index: "12" },
];
