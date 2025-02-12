import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  prefix: "",
  theme: {
    extend: {},
  },
  darkMode: "selector",
  plugins: [
    heroui(),
    typography
  ],
} satisfies Config;

export default config;
