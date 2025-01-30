import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "var(--primary-light)",
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: "var(--secondary)",
        neutral: {
          light: "var(--neutral-light)",
          DEFAULT: "var(--neutral)",
          dark: "var(--neutral-dark)",
        },
        accent: "var(--accent)",
      },
      fontFamily: {
        shrikhand: ["Shrikhand", "sans-serif"], // Agregas la fuente aquí
        saira: ["Saira", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
