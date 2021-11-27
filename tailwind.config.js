const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        chartGray: { default: "#17181e" },
        chartLightGray: { default: "#8b8b8e" },
      },
    },
  },
  variants: {},
  plugins: [],
};
