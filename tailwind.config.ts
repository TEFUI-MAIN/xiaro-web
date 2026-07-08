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
        signal: "#D64545",
        // TEMPORARY compat aliases while old sections are ported (removed in Task 8)
        paper: "#FFFFFF",
        card: "#F5F5F2",
        muted: "#5B6472",
        panel: "#11110D",
        green: { DEFAULT: "#1FA45B", deep: "#17834A" }
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
