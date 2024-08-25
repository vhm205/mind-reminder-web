import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import colors from "./colors";
import styles from "./styles";
import Button from "./components/button";
import Checkbox from "./components/checkbox";
import Input from "./components/input";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    config,
    colors,
    styles,
    components: {
      Button,
      Input,
      Checkbox,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand.primary" }),
);

export default theme;
