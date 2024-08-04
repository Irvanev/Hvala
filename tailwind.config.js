/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#03989F',
        customColor2: '#FFBF34',
        customColor3: '#FFFFFF',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover', 'focus', 'active'],
    },
  },
  plugins: [],
}

