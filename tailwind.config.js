/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#07111F",
        panel: "#0E1B2B",
        accent: "#F97316",
        mist: "#94A3B8",
        success: "#22C55E",
        glow: "#22D3EE",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(7, 17, 31, 0.35)",
        neon: "0 0 0 1px rgba(34, 211, 238, 0.2), 0 30px 80px rgba(14, 165, 233, 0.15)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
