/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#A6D6A8',
        'gray1': '#D9D9D9',
        'gray2': '#828282'
      },
    },
  },
  plugins: [],
}
