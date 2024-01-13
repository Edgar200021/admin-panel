/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#0E0C15',
        secondary: '#121825',
      },
      colors: {
        green: '#1ABB34',
        red: '#FE4242',
        gray: {
          100: '#616D8D',
          200: '#9CA3AF',
        },
        primary: '#0E0C15',
      },
      fontFamily: {
        sans: ['IBM Plex Sans'],
      },
      borderRadius: {
        primary: '17px',
      },
      borderColor: {
        primary: '#222B44',
      },
      screens: {
        tablet: { max: '835px' },
        'mini-tablet': { max: '740px' },
        phone: { max: '400px' },
        'md-phone': { max: '500px' },
      },
    },
  },
  plugins: [],
}
