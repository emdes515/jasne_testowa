/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jasne: {
          DEFAULT: '#FFB800',
          hover: '#FFC72C',
          dark: '#D97706',
          glow: 'rgba(255, 184, 0, 0.25)',
          surface: 'rgba(255, 184, 0, 0.08)',
          border: 'rgba(255, 184, 0, 0.25)',
          blue: '#38BDF8',
        },
      },
      boxShadow: {
        'jasne-glow': '0 0 20px rgba(255, 184, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
