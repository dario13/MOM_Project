module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'false', // 'media' reads from operative system, 'false' or 'class',
  theme: {
    extend: {},
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      0.5: '0.5px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      16: '16px',
    },
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
