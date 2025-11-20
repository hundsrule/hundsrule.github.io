/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'phantom-red': '#E60012',
        'phantom-black': '#101010',
        'phantom-gray': '#2A2A2A',
        'phantom-white': '#F2F2F2'
      },
      fontFamily: {
        'display': ['"Black Ops One"', 'sans-serif'],
        'marker': ['"Permanent Marker"', 'cursive'],
        'sans': ['"Anton"', '"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
        'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' }
        }
      }
    }
  },
  plugins: [],
}