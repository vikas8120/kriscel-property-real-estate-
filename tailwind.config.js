export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5EF',
        cream: '#FFFFFF',
        sand: '#EEE7DC',
        gold: '#B08D57',
        champagne: '#C9B79C',
        bronze: '#8A6F4D',
        charcoal: '#1F2933',
        skysoft: '#E6EEF5',
        paletteCream: '#E7DEC8',
        paletteGold: '#CBAF87',
        paletteSlate: '#7E8A97',
        paletteNavy: '#30475E',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 30px 80px rgba(31, 41, 51, 0.12)',
        glow: '0 20px 50px rgba(176, 141, 87, 0.2)',
      },
      backgroundImage: {
        'hero-ivory':
          'radial-gradient(circle at top left, rgba(201,183,156,0.32), transparent 35%), radial-gradient(circle at 80% 20%, rgba(176,141,87,0.12), transparent 28%), linear-gradient(180deg, #fff 0%, #f8f5ef 100%)',
        'soft-wave':
          'linear-gradient(135deg, rgba(248,245,239,0.92), rgba(255,255,255,0.8))',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease both',
        shimmer: 'shimmer 1.9s linear infinite',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
