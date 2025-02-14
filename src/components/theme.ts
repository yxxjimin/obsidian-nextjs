import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    ":root": {
      "--sh-class": "#2d5e9d",
      "--sh-identifier": "#354150",
      "--sh-sign": "#8996a3",
      "--sh-property": "#0550ae",
      "--sh-entity": "#249a97",
      "--sh-jsxliterals": "#6266d1",
      "--sh-string": "#00a99a",
      "--sh-keyword": "#f47067",
      "--sh-comment": "#a19595",
    },
    "code:not(:is(pre *))": {
      whiteSpace: "normal",
      color: "gray.900",
      background: "white",
      fontWeight: "600",
      _after: {
        content: '"`"',
      },
      _before: {
        content: '"`"',
      },
      _dark: {
        color: "gray.50",
      }
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
