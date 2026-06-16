import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#030711",
        navy: "#07111f",
        cyan: "#18d9ff",
        blue: "#1677ff"
      },
      boxShadow: {
        glow: "0 0 80px rgba(24, 217, 255, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
