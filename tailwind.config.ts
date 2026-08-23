import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070a",
        foreground: "#f8fafc",
        graphite: {
          950: "#05070a",
          900: "#0a0e17",
          850: "#0f1523",
          800: "#161e31",
          700: "#222d46",
          600: "#334155",
          400: "#94a3b8",
          300: "#cbd5e1",
          100: "#f1f5f9",
        },
        institutional: {
          cyan: "#22d3ee",
          "cyan-glow": "rgba(34, 211, 238, 0.15)",
          gold: "#d4af37",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
        institutional: "0.18em",
      },
      borderWidth: {
        thin: "1px",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
