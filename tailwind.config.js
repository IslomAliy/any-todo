/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      mainBlue: "#072768",
      white: "#fff",
      orangish: "#FC6454",
      darkLinen: "#e3d6c2",
      borderColor: "#ddd",
      red: "#F13C20",
      slate: "rgb(148, 163, 184)",
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
  },
  plugins: [],
};
