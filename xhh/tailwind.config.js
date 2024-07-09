/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'filter-dark': 'rgba(0, 0, 0, 0.4)',
        'filter-extra-dark': 'rgba(0, 0, 0, 0.7)',
        'red-500': 'rgb(205, 20, 33)'
      },
      width: {
        'container': 'min(1200px, 100% - 2rem)',
        'container-large': 'min(1240px, 100% - 2rem)',
        'container-extra-large': 'min(1360px, 100% - 1rem)',
        'sidenav': 'min(24rem, 100% - 4rem)',
        'post': 'min(400px, 100% - 1rem)',
        'product-card': 'min(300px, 100% - 1rem)'
      },
      height: {
        'plus-15': 'calc(100% + 15px)'
      },
      screens: {
        '-xl': { 'max': '1279px' } ,
        '-md': { 'max': '767px' } ,
        '-xs': { 'max': '300px' } ,
      },
      backgroundImage: {
        'hero-background': "url('../../src/styles/assets/hero-image.png')",
        'italy-background': "url('../../src/styles/assets/italy-vector.png')",
        'vietnam-background': "url('../../src/styles/assets/vietnam-vector.png')",
      },
      keyframes: {
        'fade-in': {
          '0%': { 'opacity': 0 },
          '100%': { 'opacity': 1 }
        },
        'fade-out': {
          '0%': { 'opacity': 1 },
          '100%': { 'opacity': 0 }
        },
        'slide-in-bl': {
          '0%': {
            'transform': 'translate(40%, 40%)',
            'opacity': 0
          },
          '100%': {
            'transform': 'translate(0, 0)',
            'opacity': 1
          },
        },
        'slide-in-from-right': {
          '0%': {
            'right': '30%',
          },
          '100%': {
            'right': '50%',
          },
        },
        'fade-in-up': {
          '0%': { 'opacity': 0, 'transform': 'translateY(20%)' },
          '100%': { 'opacity': 1, 'transform': 'translateY(0)' }
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'fade-out': 'fade-out 1s ease-out',
        'slide-in-bl': 'slide-in-bl 0.5s ease-out',
        'slide-in-from-right': 'slide-in-from-right 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
      },
      backgroundImage: {
        'about-background': "url('../../public/assets/interior-3.jpg')",
        'footer-background': "url('../../public/assets/interior-5.jpg')",
      },
      gridTemplateColumns: {
        'product-list': '1fr 4fr',
      },
      boxShadow: {
        'inner-right': "inset -2px 0 6px 2px rgb(0 0 0 / 0.1)",
        'bold': "2px 4px 7px rgb(0 0 0 / 0.5)",
        'light': "0 0 10px rgb(0 0 0 / 0.1)",
        'card': "0px 0px 5px 3px rgb(0 0 0 / 0.1)"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // ...
  ]
}
