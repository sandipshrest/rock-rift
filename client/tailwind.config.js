/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        brandColor: "#FA7071",
        secondColor: "#910A67",
        thirdColor: "#720455",
      },
      keyframes: {
        motion: {
          "0%, 100%": { left: "25%" },
          "50%": { left: "72%" },
        },
      },
      animation: {
        "slow-motion": "motion 5s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
