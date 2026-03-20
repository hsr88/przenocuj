import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e0ebe3',
          200: '#c2d7c8',
          300: '#96b8a0',
          400: '#659473',
          500: '#437851',
          600: '#2d5a3d',
          700: '#234830',
          800: '#1d3927',
          900: '#182f21',
        },
        wood: {
          50: '#f9f6f3',
          100: '#f0ebe4',
          200: '#e0d3c4',
          300: '#cbb49d',
          400: '#b59275',
          500: '#a77856',
          600: '#8b6144',
          700: '#704d39',
          800: '#5c4032',
          900: '#4d352b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
