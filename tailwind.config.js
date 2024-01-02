/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter Variable"],
    },
    extend: {
      animation: {
        "spin-fast": "spin 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};
