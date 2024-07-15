/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(100px, 1fr))",
      },
      colors: {
        "custom-dark": "#030712",
        "custom-light": "#ffffff",
        "custom-primary": "#2892F9",
        "cog-green": "#38B44B",
        "cog-orange": "#F17822",
        "cog-blue": "#00AAED",
        "cog-red": "#E01D27",
        "cog-purple": "#662482",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        carouselSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        showProjectContent: {
          "0%": {
            transform: "translateY(50px)",
            filter: "blur(30px)",
            opacity: 0,
          },
          "100%": { transform: "translateY(0)", filter: "blur(0)", opacity: 1 },
        },
      },
      animation: {
        carouselSlide: "carouselSlide 30s infinite linear",
        showProjectContentOrganisation:
          "showProjectContent 0.5s ease-in-out 0.7s forwards",
        showProjectContentTitle:
          "showProjectContent 0.5s ease-in-out 0.9s forwards",
        showProjectContentDescription:
          "showProjectContent 0.5s ease-in-out 1.1s forwards",
        showProjectContentButton:
          "showProjectContent 0.5s ease-in-out 1.3s forwards",
      },
      gridTemplateColumns: {
        "40-60": "40% 60%",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
