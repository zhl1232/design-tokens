import { css } from "atomico";
import { composed, tokens, classes } from "../src/core";

export const designTokens = composed(
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
      },
      variation: {
        small: {
          size: {
            xl: "40px",
            l: "32px",
            m: "28px",
            s: "20px",
            xs: "16px",
            xxs: "12px",
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
  .place.center {
    place-content: center;
  }
`);
