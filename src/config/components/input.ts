import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  baseStyle: {
    field: {
      _dark: {
        bg: "whiteAlpha.50",
      },
      _hover: {
        _dark: {
          bg: "whiteAlpha.100",
        },
      },
      _focus: {
        // border: "0px solid",
        _dark: {
          bg: "whiteAlpha.100",
        },
      },
    },
  },
  defaultProps: {
    focusBorderColor: "brand.single",
    variant: "outline",
  },
});
