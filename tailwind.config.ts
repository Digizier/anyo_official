import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0D0D0D",
          charcoal: "#1B1B1B",
          dark: "#2E2E2E",
          white: "#FFFFFF",
          cream: "#F8F7F4",
          beige: "#EDE7DD",
          gold: "#C9A44C",
          "gold-dark": "#B8892F",
          "gold-light": "#E4C26A",
          gray: "#888888",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        label: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 8px 40px rgba(0,0,0,0.12)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.25)",
        gold: "0 4px 20px rgba(201,164,76,0.25)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.85" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "pulse-slow": "pulseSlow 3s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
