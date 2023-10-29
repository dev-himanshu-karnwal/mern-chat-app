/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'authbg': "url('../public/images/authbg1.jpg')",
      },
    },
  },
  
  plugins: [],
}