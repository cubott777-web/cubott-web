import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3B",
          900: "#071427",
          800: "#0B1F3B",
          700: "#122B4F",
          600: "#1B3A66",
        },
        blue: {
          DEFAULT: "#2563EB",
          600: "#2563EB",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD",
          200: "#BFDBFE",
          100: "#DBEAFE",
          50: "#EFF6FF",
        },
        slate: {
          DEFAULT: "#64748B",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          2: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        content: "1200px",
        wide: "1400px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,59,0.06), 0 8px 24px -8px rgba(11,31,59,0.10)",
        frame: "0 1px 0 rgba(11,31,59,0.06), 0 24px 64px -24px rgba(11,31,59,0.28)",
        "frame-dark": "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px -30px rgba(0,0,0,0.6)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
export default config
