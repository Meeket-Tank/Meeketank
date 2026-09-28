/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      opacity: { 15: "0.15", 35: "0.35", 45: "0.45", 55: "0.55", 65: "0.65", 85: "0.85" },
      colors: {
        ink: {
          950: "#04060a",
          900: "#070b11",
          800: "#0c121b",
          700: "#121a26",
          600: "#1b2636",
        },
        up: "#00e396",
        down: "#ff4d6d",
        amber: { DEFAULT: "#ffb020" },
        cyan: { DEFAULT: "#35d0ff" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: { "50%": { opacity: "0" } },
        scan: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".4", transform: "scale(.8)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        blink: "blink 1s step-end infinite",
        scan: "scan 6s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
