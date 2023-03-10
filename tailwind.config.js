module.exports = {
  important : true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#fad5c8",
      secondary: "#f8f8f8"
    },
    plugins: [
      require('tailwind-clip-path'),
    ]
  }
}