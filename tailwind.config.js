/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "error-borders": "hsl(0, 100%, 66%)",
        white: "hsl(0, 0%, 100%)",
        "grayish-violet": "hsl(270, 3%, 87%)",
        "dark-grayish-violet": "hsl(279, 6%, 55%)",
        "very-dark-violet": "hsl(278, 68%, 11%)",
      },
      fontSize: {
        small: "10px",
      },
    },

    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
