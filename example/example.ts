import { composed, tokens, classes } from "../src/core";

const { sheet } = document.querySelector<HTMLStyleElement>("#style");

composed(
  tokens(
    {
      size: {
        xl: "40px",
        l: "32px",
        m: "28px",
        s: "20px",
        xs: "16px",
      },
      color: {
        primary: {
          60: "black",
          30: "red",
          10: "transparent",
        },
      },
      variation: {
        small: {
          size: {
            xl: "40px",
            l: "32px",
            m: "28px",
            s: "20px",
            xs: "16px",
          },
        },
      },
    },
    "ds"
  ),
  classes()
)(sheet);

console.log([...sheet.cssRules]);
