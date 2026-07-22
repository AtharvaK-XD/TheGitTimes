/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        masthead: ['"UnifrakturMaguntia"', 'serif'],
        headline: ['"Playfair Display"', 'serif'],
        body: ['"EB Garamond"', '"Old Standard TT"', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        typewriter: ['"Special Elite"', '"Courier New"', 'monospace'],
      },
      colors: {
        paper: {
          light: '#f9f5eb',
          DEFAULT: '#f2e8d5',
          dark: '#e6d7bc',
          aged: '#d8c5a4',
          border: '#ba9e74',
        },
        ink: {
          DEFAULT: '#1a1615',
          muted: '#3b342e',
          sepia: '#544237',
        }
      }
    },
  },
  plugins: [],
}
