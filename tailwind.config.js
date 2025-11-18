/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16213e',
        secondary: '#19b5fe',
        accent: '#e74c3c',
      },
      animation: {
        'slide-up': 'slideUp 0.5s forwards',
        'fade-out': 'fadeOut 2s forwards 2s',
        'print-paper': 'printPaper 1.5s infinite',
        'shine': 'shine 3s infinite',
        'float': 'float linear infinite',
      },
      keyframes: {
        slideUp: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0', visibility: 'hidden' },
        },
        printPaper: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-40px)' },
          '100%': { transform: 'translateY(-80px)', opacity: '0' },
        },
        shine: {
          '0%': { left: '-50%' },
          '100%': { left: '150%' },
        },
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-100px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}