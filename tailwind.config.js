/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('assets/img/Banner4.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
}
