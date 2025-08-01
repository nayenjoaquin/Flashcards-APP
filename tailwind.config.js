import appTheme from './shared/const/app-theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
    
      content: ["./App.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}",
    "./screens/**/*.{js,ts,tsx}"],
    
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: appTheme.color
      },
    },
    plugins: [],
  }
