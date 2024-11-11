import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        messenger: {
          primary: "#14171A",
          secondary: "#F5F8FA",
          accent: "#1DA1F2",
          neutral: "AAB8C2",
          info: "#E1E8ED",
          success: "#657786"
        }
      }
    ]
  }
}