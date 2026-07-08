import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E141F",
        cream: "#F5F5F2",
        night: "#07111F",
        navy: "#0B2142",
        volt: "#84F27A",
        sky: "#18D9FF",
        azure: "#1677FF",
        "green-deep": "#17834A",
        hairline: "#E6E8EC",
        amber: "#E8A13A",
        signal: "#D64545"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
