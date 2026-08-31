import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05060a",
        mist: "#0c1018",
        foam: "#e8edf7",
        cyan: { glow: "#7ef0e0" },
        violet: { glow: "#b49cff" },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(126, 240, 224, 0.45)",
        card: "0 30px 80px -40px rgba(0,0,0,0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
