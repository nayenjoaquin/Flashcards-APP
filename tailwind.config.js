/** @type {import('tailwindcss').Config} */
module.exports = {
    
      content: ["./App.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}",
    "./screens/**/*.{js,ts,tsx}"],
    
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: {
            '50': '#fffbea',
            '100': '#fff1c5',
            '200': '#ffe485',
            '300': '#ffcf46',
            '400': '#ffb91b',
            '500': '#ff9500',
            '600': '#e26e00',
            '700': '#bb4a02',
            '800': '#983908',
            '900': '#7c2f0b',
            '950': '#481600',
          },
          secondary: {
            '50': '#f3f4fa',
            '100': '#e8edf7',
            '200': '#d6dcef',
            '300': '#bdc6e4',
            '400': '#a1a8d8',
            '500': '#8a8eca',
            '600': '#7776bc',
            '700': '#6260a2',
            '800': '#514f84',
            '900': '#45466a',
            '950': '#28283e',
        },

        }
      },
    },
    plugins: [],
  }
