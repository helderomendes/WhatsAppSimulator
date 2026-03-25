/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wa: {
          green: '#25D366',
          teal: '#128C7E',
          dark: '#075E54',
          bubble: {
            in: '#1F2C34',
            out: '#005C4B',
            'in-light': '#FFFFFF',
            'out-light': '#D9FDD3',
          },
          bg: {
            dark: '#0B141A',
            light: '#E5DDD5',
          },
          header: {
            dark: '#1F2C34',
            light: '#075E54',
          },
          input: {
            dark: '#1F2C34',
            light: '#F0F2F5',
          },
          text: {
            primary: '#E9EDEF',
            secondary: '#8696A0',
            'primary-light': '#111B21',
            'secondary-light': '#667781',
          },
        },
      },
    },
  },
  plugins: [],
}
