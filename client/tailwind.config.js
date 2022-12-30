/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    './pages/**/*.{html, js}',
    './components/**/*.{html,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
