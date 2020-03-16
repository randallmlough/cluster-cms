const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffe4de",
          200: "#ffcabd",
          300: "#ffaf9b",
          400: "#ff957a",
          500: "#FF7A59", // main
          600: "#cc6247",
          700: "#994935",
          800: "#663124",
          900: "#331812"
        },
        secondary: {
          100: "#ccedf2",
          200: "#99dbe5",
          300: "#66c8d7",
          400: "#33b6ca",
          500: "#00a4bd", // secondary
          600: "#008397",
          700: "#006271",
          800: "#00424c",
          900: "#002126"
        },
        // gray: {
        //   100: "#d5d9dc",
        //   200: "#acb2b9",
        //   300: "#828c96",
        //   400: "#596573",
        //   500: "#2f3f50", // secondary
        //   600: "#263240",
        //   700: "#1c2630",
        //   800: "#131920",
        //   900: "#090d10"
        // },
        black: {
          default: colors.black,
          100: "#d5d9dc",
          200: "#acb2b9",
          300: "#828c96",
          400: "#596573",
          500: "#2f3f50", // secondary
          600: "#263240",
          700: "#1c2630",
          800: "#131920",
          900: "#090d10"
        },
        success: {
          ...colors.green
        },
        danger: {
          ...colors.red
        },
        info: {
          ...colors.blue
        }
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "focus-within"],
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
    borderColor: ["responsive", "hover", "focus", "focus-within"]
  }
};
