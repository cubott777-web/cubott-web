/**
 * Cubott Tailwind preset — drop into any Cubott application:
 *   // tailwind.config.js
 *   module.exports = { presets: [require("./cubott.tailwind.preset.js")], content: [...] }
 * Values mirror tokens.json. Keep the two in sync; tokens.json is the source.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F3B", 900: "#071427", 800: "#0B1F3B", 700: "#122B4F", 600: "#1B3A66" },
        blue: { DEFAULT: "#2563EB", 50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 300: "#93C5FD", 400: "#60A5FA", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8" },
        slate: { DEFAULT: "#64748B", 200: "#E2E8F0", 500: "#64748B" },
        surface: { DEFAULT: "#F8FAFC", 2: "#F1F5F9" },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        line: { DEFAULT: "rgba(255,255,255,0.08)", strong: "rgba(255,255,255,0.18)" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.045em", display: "-0.03em" },
      borderRadius: { stage: "32px" },
      transitionTimingFunction: { house: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
}
