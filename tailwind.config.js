/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: { 100:"#f1f1f1",200:"#dedede",300:"#cccccc",400:"#aaaaaa",500:"#909090",600:"#707070" },
        carbon: {
          950: '#050505',
          900: '#090909',
          850: '#101010',
          800: '#171717',
          700: '#242424',
          600: '#333333',
        },
        accent: {
          cyan: '#eeeeee',
          blue: '#cecece',
          lime: '#ffffff',
          silver: '#dedede',
          muted: '#aaaaaa'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        condensed: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        sans: ['Arial', 'sans-serif'],
        mono: ['Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'widest-editorial': '0.25em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(35px)' },
        }
      }
    },
  },
  plugins: [],
}

