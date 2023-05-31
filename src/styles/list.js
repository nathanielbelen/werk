import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  container: {
    listStylePos: "inside",
    margin: "0px !important",
    boxShadow: "md",
  },
  item: {
    p: 1,
    "&::marker": {
      color: mode("green.500", "green.200")(props),
    },
  },
  icon: {
    color: mode("blue.500", "blue.200")(props),
  },
}));

const sizes = {
  xl: definePartsStyle({
    container: defineStyle({
      fontSize: "xl",
      p: 6,
    }),
    icon: defineStyle({
      boxSize: 6,
      mr: 5,
    }),
  }),
};

const custom = definePartsStyle((props) => ({
  container: {
    shadow: "none",
    display: "flex",
    flexDirection: "column",
    justify: "center",
    align: "center",
  },
  item: {
    background: mode("gray.50", "blackAlpha.100")(props),
    padding: 5,
    shadow: "xs",
    borderRadius: "lg",
  },
}));

export const listTheme = defineMultiStyleConfig({
  variants: {
    custom,
  },
  sizes,
  baseStyle,
})