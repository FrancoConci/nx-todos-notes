const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      spacing: {
        spacing2: '2px',
        spacing4: '4px',
        spacing8: '8px',
        spacing16: '16px',
        spacing32: '32px',
        inputHeight: '46px',
      },
      boxShadow: {
        'dark-color': '0 0 0px 1000px #393939 inset',
        'light-color': '0 0 0px 1000px #E0E0E0 inset',
      },
    },
    colors: {
      // dark theme colors
      'dark-primary-main': '#393939',
      'dark-primary-dark': '#232323',
      'dark-primary-light': '#646464',
      'dark-contrast-light': '#bbbbbb',
      'dark-contrast': '#e0e0e0',
      'dark-secondary-main': '#64d6e7',
      'dark-secondary-dark': '#3dafc0',
      'dark-secondary-saturated': '#00ddff',
      'dark-alert-main': '#d9de78',
      'dark-danger-main': '#e68d9e',
      // light theme colors
      'light-contrast': '#393939',
      'light-contrast-dark': '#232323',
      'light-primary-light': '#646464',
      'light-primary-main': '#E0E0E0',
      'light-secondary-main': '#167D8D',
      'light-secondary-dark': '#115E6A',
      'light-alert-main': '#d9de78',
      'light-danger-main': '#C92C49',
    },
  },
  plugins: [require('autoprefixer')],
};
