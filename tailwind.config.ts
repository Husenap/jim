import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

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
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

export default config;
