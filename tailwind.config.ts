import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#693AAE",
        bg: "#EBD9FF",
        card: "#FDFDFF",
        text: "#10121A",
        muted: "#6B6F76",
        br: "#E1D2FF"
      },
      borderRadius: { hero: "24px", card: "16px" },
      maxWidth: { rail: "1280px" }
    }
  },
  corePlugins: {},
  plugins: []
} satisfies Config;
