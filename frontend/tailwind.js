const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        secondary: { ...colors.orange, default: colors.orange[500] },
        secondary: { ...colors.gray, default: colors.blue[500] },
        success: {
          ...colors.green,
          light: colors.green[300],
          default: colors.green[500],
          dark: colors.green[700]
        },
        danger: {
          ...colors.red,
          light: colors.red[300],
          default: colors.red[500],
          dark: colors.red[700]
        },
        info: {
          ...colors.blue,
          light: colors.blue[300],
          default: colors.blue[500],
          dark: colors.blue[700]
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
