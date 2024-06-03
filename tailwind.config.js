/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,ejs}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#191d30",
        "green": "#67B779",
        "green-2": "#E9F3E1",
        "gray": "#8c8e97",
        "gray-2": "#c4cacf",
        "gray-3": "#ecedef",
        "gray-4": "#f2f6f7",
        "gray-5": "#f4f4f5",
        "white": "#ffffff",
        "blue": "#1892fa",
        "orange": "#f95721"
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
