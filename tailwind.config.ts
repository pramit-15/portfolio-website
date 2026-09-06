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
        canvas: "#28282B", // Matte Black (60% background)
        surface: {
          DEFAULT: "#36454F", // Charcoal (30% surface)
          elevated: "#3E4E59",
          hover: "#435561",
        },
        border: {
          DEFAULT: "#818589", // Gunmetal Gray
          subtle: "#485560",
          accent: "#89CFF0",
        },
        primary: {
          DEFAULT: "#B2BEB5", // Ash Gray (soft high-contrast text)
          dim: "#9EA8A1",
        },
        muted: {
          DEFAULT: "#A9A9A9", // Dark Gray
          dark: "#7A8288",
        },
        accent: {
          DEFAULT: "#89CFF0", // Baby Blue (10% electric accent)
          secondary: "#6082B6", // Glaucous
          glow: "rgba(137, 207, 240, 0.25)",
        },
        terminal: {
          base: "#000000",
          header: "#171717",
          border: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(137, 207, 240, 0.25)",
        "glow-sm": "0 0 12px -2px rgba(137, 207, 240, 0.2)",
        "glow-cyan": "0 0 30px -4px rgba(137, 207, 240, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
