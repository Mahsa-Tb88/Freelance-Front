/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        web1: "#FEF3E2",
        web2: "#BEC6A0",
        web3: "#708871",
        web4: "#606676",
      },
      fontSize: {
        xxs: "10px",
        xxxs: "8px",
      },
      inset: {
        "23%": "23%",
        "7%": "7%",
        "13%": "13%",
      },
      height: {
        "102": "105px",
      },
    },
  },
  plugins: [],
};
