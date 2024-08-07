/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './main.ts'],
  darkMode: 'media',
  theme: {
    screens: {
      xs: '0',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      width: {
        320: '320px',
        640: '640px',
        768: '768px',
        1024: '1024px',
        1280: '1280px',
        1536: '1536px',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-primeui')],
}
