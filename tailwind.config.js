/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        surface: {
          bg: '#070A0F',
          card: '#0E1522',
          'card-hover': '#141D2E',
          elevated: '#141D2E',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          'border-active': '#FFB800',
        },
        primary: {
          DEFAULT: '#FFB800',
          hover: '#FFC72C',
          glow: 'rgba(255, 184, 0, 0.25)',
          dark: '#B37F00',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          subtle: '#475569',
          accent: '#FFB800',
        },
        alert: {
          crimson: '#F43F5E',
          'crimson-bg': 'rgba(244, 63, 94, 0.12)',
        },
        streak: {
          flame: '#EA580C',
        },
        accent: {
          streak: '#FF782D',
          danger: '#F43F5E',
          success: '#10B981',
          arena: '#06B6D4',
          ai: '#A855F7',
        },
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
        'amber-3d': '0 4px 0 #B37F00',
        'card-glow': '0 8px 32px -4px rgba(0, 0, 0, 0.5), 0 0 16px -2px rgba(255, 184, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
