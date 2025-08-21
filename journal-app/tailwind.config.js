/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          1: '#ef4444', // red-500
          2: '#f97316', // orange-500
          3: '#eab308', // yellow-500
          4: '#22c55e', // green-500
          5: '#3b82f6', // blue-500
        }
      }
    },
  },
  plugins: [],
}