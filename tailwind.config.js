/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: "",
        heading: "#343a40",
        body: "#6c757d",

        success: "#28a745",
        info: "#17a2b8",
        warning: "#ffc107",
        danger: "#dc3545",

        lightGrey: "#fafafa",
        lightBlue: "#eaf6f6",
        lightOrange: "#feead1",
      },
      fontFamily: {
        // ubuntu: ["Ubuntu", "sans-serif"],
        // roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "576px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
