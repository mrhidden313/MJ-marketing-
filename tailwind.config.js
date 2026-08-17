/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0c112c',
          50: '#f0f1f9',
          100: '#d8daef',
          200: '#a8adda',
          300: '#6b72c0',
          400: '#3d4499',
          500: '#1e2468',
          600: '#131847',
          700: '#0c112c',
          800: '#080d20',
          900: '#040815',
        },
        gold: {
          DEFAULT: '#e9c400',
          50: '#fffde7',
          100: '#fff8c0',
          200: '#ffee7a',
          300: '#ffe033',
          400: '#f0c800',
          500: '#e9c400',
          600: '#c4a000',
          700: '#9a7d00',
          800: '#705b00',
          900: '#3d3100',
        },
        surface: {
          DEFAULT: '#13193a',
          low: '#0c112c',
          mid: '#1a2045',
          high: '#222850',
          card: '#1e2545',
        },
        'surface-mid': '#1a2045',
      },
      fontFamily: {
        display: ["'Inter'", 'sans-serif'],
        heading: ["'Inter'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        label: ["'Inter'", 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,7vw,6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem,5.5vw,4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem,4vw,3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(233,196,0,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(233,196,0,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, transparent 25%, rgba(233,196,0,0.4) 50%, transparent 75%)',
        'navy-gradient': 'linear-gradient(135deg, #0c112c 0%, #1a2045 50%, #0c112c 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center top, rgba(233,196,0,0.12) 0%, transparent 60%), linear-gradient(180deg, #0c112c 0%, #080d20 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(233,196,0,0.2)',
        'gold-md': '0 0 30px rgba(233,196,0,0.3)',
        'gold-lg': '0 0 60px rgba(233,196,0,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
