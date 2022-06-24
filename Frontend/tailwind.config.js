module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'false', // 'media' reads from operative system, 'false' or 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
