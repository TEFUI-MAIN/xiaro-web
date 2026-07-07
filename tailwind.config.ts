import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        card: "#FFFFFF",
        ink: "#14181F",
        muted: "#5B6472",
        hairline: "#E3E1DA",
        green: { DEFAULT: "#1FA45B", deep: "#17834A" },
        amber: "#E8A13A",
        signal: "#D64545",
        panel: "#10141B"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
