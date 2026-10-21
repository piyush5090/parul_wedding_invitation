/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon:  { DEFAULT: '#5A0F1B', light: '#7A1A2A', dark: '#3D0A12' },
        gold:    { DEFAULT: '#C9A24B', light: '#E0BC6B', dark: '#A8832E' },
        saffron: { DEFAULT: '#F28C28', light: '#F5A84D', dark: '#D4750F' },
        ivory:   { DEFAULT: '#FBF3E4', dark: '#F0E4CC' },
        rose:    { DEFAULT: '#B8475A', light: '#CC6070', dark: '#9A3448' },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        greatVibes: ['var(--font-great-vibes)', 'cursive'],
        rozha:     ['var(--font-rozha)', 'serif'],
        kalam:     ['var(--font-kalam)', 'cursive'],
        hind:      ['var(--font-hind)', 'sans-serif'],
        lora:      ['var(--font-lora)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-foil': "url('/images/textures/gold-foil.png')",
        'grain':     "url('/images/textures/grain.png')",
      },
      animation: {
        shimmer:     'shimmer 2.5s linear infinite',
        petalFall:   'petalFall 6s ease-in infinite',
        flicker:     'flicker 1.5s ease-in-out infinite alternate',
        equalize:    'equalize 0.8s ease-in-out infinite alternate',
        curtainLift: 'curtainLift 1.8s cubic-bezier(0.76,0,0.24,1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-10px) rotate(0deg)', opacity: 0 },
          '10%':  { opacity: 1 },
          '90%':  { opacity: 0.7 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.6 },
        },
        equalize: {
          '0%':   { height: '4px' },
          '100%': { height: '20px' },
        },
        curtainLift: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      boxShadow: {
        gold:     '0 0 30px rgba(201,162,75,0.4)',
        goldLg:   '0 0 60px rgba(201,162,75,0.6)',
        maroon:   '0 8px 40px rgba(90,15,27,0.4)',
        glow:     '0 0 20px rgba(242,140,40,0.5)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
