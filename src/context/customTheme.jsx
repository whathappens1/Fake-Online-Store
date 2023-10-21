const { cyan } = require("@mui/material/colors");

const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          custom: {
            main: cyan[700],
            light: cyan[50],
            dark: cyan[800],
          },
        }
      : {
          // palette values for dark mode
          custom: {
            main: "#007494",
            light: "#9deafff5",
            dark: "#0a5b71",
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      // @ts-ignore as = after small >> لا يروح بالك بعيد
      as: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default getDesignTokens;
