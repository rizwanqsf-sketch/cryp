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
        background: '#10131a',
        surface: '#1d2026',
        primary: '#00d1ff',
        secondary: '#00ffa3',
        error: '#ffb4ab',
        textMain: '#e0e2eb',
        textMuted: '#bbc9cf',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
