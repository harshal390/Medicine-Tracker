/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,ejs}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D185C",
        secondary: "#FF325D",
        "dark-gold": "#B38728",
        gold: "#ffd84f",
        "light-gold": "#BF953F",
        primary2: "#4B49AC",
        hoverprimary2: "#3f3d8f",
      },
      boxShadow: {
        shadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
      animation: {
        text: "text 5s ease infinite",
        round: "spin 0.8s linear infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        round: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
