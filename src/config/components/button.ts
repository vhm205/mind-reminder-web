import { defineStyleConfig } from "@chakra-ui/react";

export default defineStyleConfig({
  variants: {
    custom: {
      color: "white",
      bg: "brand.primary",
      _hover: {
        opacity: 0.8,
      },
    },
  },
});
