/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "1024px",  // ⬅️ subimos md a 1024px (hasta 1023px se ve “mobile”)
      lg: "1280px",
      xl: "1536px",
      "2xl": "1920px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        white: "#FFFFFF",
        ink: "#191919",
        accent: "#B58B5A",
      },
    },
  },
  plugins: [],
};
