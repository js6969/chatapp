import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.800", // Overall background
        color: "gray.100", // Primary text color
      },
    },
  },
  colors: {
    brand: {
      primary: "#2D3748", // Matches gray.800
      accent: "#38B2AC", // Teal accent
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "teal.500",
          color: "gray.100",
          _hover: { bg: "teal.400" },
          _active: { bg: "teal.600" },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "gray.700",
            _hover: { bg: "gray.600" },
            _focus: { borderColor: "teal.500" },
          },
        },
      },
    },
  },
});
export default theme;
