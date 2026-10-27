/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  All Tidied Up Guernsey – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep aubergine – the background of the logo (#32293c)
        plum: {
          950: '#221b2a',
          900: '#32293c',
          800: '#41364f',
          700: '#524663',
          600: '#6a5d7e',
          500: '#857a97',
        },
        // Slate blue – the bucket and lettering shadow in the logo
        slate: {
          500: '#566b85',
          600: '#444b65',
        },
        // Soft sky blue – the bubbles in the logo (#87cae7)
        sky: {
          50: '#f1f8fc',
          100: '#e3f2fa',
          200: '#c8e6f4',
          300: '#a7d8ee',
          400: '#87cae7',
          600: '#3b85a8',
          700: '#2e6a87',
        },
        // Lilac – the pink-purple glow behind the bucket (#c998d4)
        lilac: {
          50: '#fbf5fc',
          100: '#f4e7f6',
          200: '#e9d0ee',
          300: '#dab5e2',
          400: '#c998d4',
          600: '#9a62a8',
          700: '#7d4d8a',
        },
        // Warm cream – the lettering in the logo (#f8f3eb)
        cream: {
          50: '#fdfbf7',
          100: '#f8f3eb',
          200: '#efe5d5',
          300: '#e2d3bb',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(50,41,60,.06), 0 12px 32px -14px rgba(50,41,60,.22)',
        lift: '0 2px 6px rgba(50,41,60,.06), 0 28px 56px -20px rgba(50,41,60,.35)',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(0) scale(.7)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'translateY(-90px) scale(1)', opacity: '0' },
        },
        twinkle: {
          '0%,100%': { transform: 'scale(.55) rotate(0deg)', opacity: '.5' },
          '50%': { transform: 'scale(1) rotate(45deg)', opacity: '1' },
        },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        sway: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      animation: {
        rise: 'rise 4.5s ease-in infinite',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
