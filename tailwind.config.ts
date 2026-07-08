import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11110D",
        cream: "#F5F5F2",
        forest: "#1C3626",
        volt: "#A8F26B",
        "green-deep": "#17834A",
        hairline: "#E8E8E4",
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
