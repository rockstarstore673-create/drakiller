/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#b7e3ff',
          300: '#82d1ff',
          400: '#4eb2ff',
          500: '#1c8dff',
          600: '#106fe6',
          700: '#0d5bc0',
          800: '#104ca0',
          900: '#143f7d'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(76, 166, 255, 0.4), 0 18px 40px rgba(31, 93, 255, 0.2)'
      }
    }
  },
  plugins: []
};
