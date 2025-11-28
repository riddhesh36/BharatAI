/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        'bharat-saffron': '#FF7A00',
        'tech-indigo': '#2A2F7F',
        'electric-blue': '#2B8CFF',
        'emerald-green': '#00996C',
        'royal-gold': '#D4A21A',
        'graphite-black': '#111111',
        'soft-grey': '#E6E6E6',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mukta: ['Mukta', 'sans-serif'],
      },
      backgroundImage: {
        'signature-gradient': 'linear-gradient(90deg, #FF7A00, #2B8CFF)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }
    },
  },
  plugins: [],
}
