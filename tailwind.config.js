/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'dark-text-87': 'rgba(255,255,255,0.87)',
        'dark-text-60': 'rgba(255,255,255, 0.6)',
        'dark-text-38': 'rgba(255,255,255, 0.38)',
        'dark-background': '#121212',
        'dark-panel': '#222222',
        'dark-border': 'rgba(255,255,255, 0.09)',
        'dark-primary': '#2673dd',
        'dark-primary-30': 'rgba(38, 115, 221, 0.3)',
        'dark-primary-14': 'rgba(38, 115, 221, 0.14)',
        'light-text-87': 'rgba(0, 0, 0, 0.87)',
        'light-text-60': 'rgba(0, 0, 0, 0.6)',
        'light-text-38': 'rgba(0, 0, 0, 0.38)',
        'light-background': '#F0F2F5',
        'light-panel': '#FAFAFA',
        'light-border': '#E8E8E8',
        'light-primary': '#2673dd',
        'light-primary-20': 'rgba(38, 115, 221, 0.2)',
        'light-primary--5': 'rgba(38, 115, 221, 0.05)',
      },
    },
  },
  plugins: [],
}

