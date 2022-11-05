/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#A6D6A8',
        'gray1': '#D9D9D9',
        'gray2': '#828282',
      },
      keyframes: {
        'bounce-ghost': {
          
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg) translateY(-15%)' },
          '50%': { transform: 'rotate(3deg) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}


// green '#B2CAB3', 
// darker green '#9cb59d', 
// blue '#B8E8FC', 
// orange '#EDC09E', 
// yellow '#FDFDBD', 
// pink '#FFCACA', 
// purple '#D2DAFF'
// bg gray EBEBEB
// lighter gray F5F5F5