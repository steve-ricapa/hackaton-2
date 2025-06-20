// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // o 'media' si prefieres
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Tus extensiones de theme aquí (colores, spacing, fuentes…)
    },
  },
  plugins: [
    // Añade aquí plugins oficiales como require('@tailwindcss/forms') si los necesitas
  ],
}
