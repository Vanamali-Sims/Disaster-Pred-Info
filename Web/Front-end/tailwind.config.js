/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar" : {
          display : "none",
        },
        ".no-scrollbar" : {
          "-ms-overflow-style" : "none",
          "scrollbar-width" : "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
});
