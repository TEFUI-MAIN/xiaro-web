import type { Config } from "tailwindcss";

/** All colors consume MASTER §1 tokens; asphalt/paperlit are the fixed
 *  values MASTER §5 assigns to the footer (dark ground in both themes). */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        amber: "rgb(var(--amber) / <alpha-value>)",
        "amber-panel": "rgb(var(--amber-panel) / <alpha-value>)",
        "amber-ink": "rgb(var(--amber-ink) / <alpha-value>)",
        "sign-ink": "rgb(var(--sign-ink) / <alpha-value>)",
        good: "rgb(var(--good) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        asphalt: "#0E141D",
        paperlit: "#FAF8F3"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        card: "0 1px 2px rgb(20 32 46 / .05), 0 8px 28px rgb(20 32 46 / .07)"
      }
    }
  },
  plugins: []
};

export default config;
