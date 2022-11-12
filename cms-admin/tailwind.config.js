/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        montserrat: ["Montserrat"],
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
  // important: true,
};

