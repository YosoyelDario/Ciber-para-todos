/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#101B2D", 2: "#182640" },
        paper: { DEFAULT: "#F6F3EC", 2: "#FFFFFF" },
        ink: { DEFAULT: "#182233", soft: "#4C5568" },
        amber: { DEFAULT: "#E7A33E", ink: "#5C3B0B" },
        teal: "#3E8E86",
        line: "#DCD6C7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
