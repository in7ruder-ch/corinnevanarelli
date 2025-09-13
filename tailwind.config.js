/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
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
