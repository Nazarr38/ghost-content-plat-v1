/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7f4',
          100: '#F7F1E5', // beige clair principal
          200: '#ede5d3',
          300: '#ddd0b7',
          400: '#cab896',
          500: '#b8a077',
          600: '#a68b63',
          700: '#8a7052',
          800: '#725d47',
          900: '#5d4d3d',
        },
        navy: {
          50: '#f1f5f9',
          100: '#e2eaf4',
          200: '#cbd5e4',
          300: '#a6b8cc',
          400: '#7a94ad',
          500: '#5a7491',
          600: '#485d7a',
          700: '#3d4d63',
          800: '#364253',
          900: '#0C2340', // bleu principal
        },
        gold: {
          50: '#fefbf3',
          100: '#fef7e6',
          200: '#fbedcc',
          300: '#f7dfa7',
          400: '#f2ca7a',
          500: '#D4AF37', // doré principal
          600: '#c49830',
          700: '#a37c2a',
          800: '#856427',
          900: '#6e5324',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '18px',
        '2xl': '24px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'counter': 'counter 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        counter: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};