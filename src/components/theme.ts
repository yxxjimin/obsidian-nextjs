import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    "pre": {
      fontFamily: ["Fira Code", "Fira Mono", "Menlo", "Consolas", "DejaVu Sans Mono", "monospace"],
      fontSize: "0.8rem",
      backgroundColor: "hsl(230, 1%, 98%) !important",
      whiteSpace: "pre",
      wordBreak: "normal",
      padding: "1em",
      margin: "1em 0",
      overflow: "auto",
      borderRadius: "0.5em",
    },
    "code:not(:is(pre *))": {
      whiteSpace: "normal",
      color: "gray.900",
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
    "sup": {
      _after: {
        content: '"]"',
      },
      _before: {
        content: '"["',
      },
      color: "blue.500",
    },
    ".footnotes": {
      marginTop: "2em",
      borderTop: "0.5px solid #30363d",
    },
    ".footnotes > h2": {
      display: "none",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
