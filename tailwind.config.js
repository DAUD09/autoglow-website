export default {
  content: ['./*.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:   '#124E78',
          cyan:   '#03BCF1',
          light:  '#DCF8FE',
          deeper: '#091E35',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
