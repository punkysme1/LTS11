/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Untuk file index.html di root proyek
    "./src/**/*.{js,ts,jsx,tsx}", // Untuk semua file JS/TS/JSX/TSX di dalam folder src/
    // Jika Anda punya file React/Vue/Svelte/HTML lain di luar src/ (misal di root atau public/), tambahkan di sini
    // Contoh: "./public/**/*.html" jika ada HTML di public/ selain index.html
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        }
      }
    },
  },
  plugins: [],
}