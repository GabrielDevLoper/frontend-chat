import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // colors: {
  //   gray: {
  //     "900": "#181b23",
  //     "800": "#1f2029",
  //     "700": "#353646",
  //     "600": "#4b4d63",
  //     "500": "#616480",
  //     "400": "#797d9a",
  //     "200": "#b3b5c6",
  //     "300": "#9699b0",
  //     "100": "#d1d2dc",
  //     "50": "#eeeef2",
  //   },
  // },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.50" : "gray.600",
        lineHeight: "tall",
      },
    }),
  },
});