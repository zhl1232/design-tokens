import { css } from "atomico";
import { compose, tokens, classes } from "../src/core";

export const designTokens = compose(
  tokens(
    {
      size: {
        xl: "40px",
        l: "32px",
        m: "28px",
        s: "20px",
        xs: "16px",
        xxs: "12px",
      },
      color: {
        primary: {
          60: "black",
          30: "red",
          10: "transparent",
        },
        secondary: {
          60: "@color.primary.60",
        },
      },
      variation: {
        [`size=small`]: {
          size: {
            xl: "32px",
            l: "28px",
            m: "20px",
            s: "16px",
            xs: "12px",
            xxs: "8px",
          },
        },
      },
      media: {
        xl: "(min-width: 320px)",
      },
    },
    "ds"
  ),
  classes()
);

export default designTokens(css`
  .row {
    display: flex;
  }
  .gap.--size {
    gap: var(--size);
  }
  .size.--size {
    width: var(--size);
    height: var(--size);
  }
  .font.size.--size {
    font-size: var(--size);
  }
  .color.--color {
    color: var(--color);
  }
  .color.bg.--color {
    background: var(--color);
  }
`);
