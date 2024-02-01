/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaceMono: ["Space Mono", "monospace"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      screens: {
        vsm: "450px",
        xmd: "900px",
        xxl: "1330px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};
