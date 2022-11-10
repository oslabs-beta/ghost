/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg) translateY(-15%)' },
          '50%': { transform: 'rotate(3deg) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
