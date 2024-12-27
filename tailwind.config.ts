import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  prefix: "",
  theme: {
    extend: {},
  },
  darkMode: "selector",
  plugins: [
    nextui(),
    typography
  ],
} satisfies Config;

export default config;
