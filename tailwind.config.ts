import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#693AAE", // your existing accent color
          light: "#8B5CF6",
          dark: "#4C1D95"
        }
      }
    }
  },
  plugins: []
};

export default config;
