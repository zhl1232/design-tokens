import { expect } from "@esm-bundle/chai";
import { tokens } from "../src/apply-tokens";

describe("tokens", () => {
  it("default", () => {
    const sheet = new CSSStyleSheet();

    tokens(
      {
        size: {
          xl: "10px",
          l: "8px",
          m: "4px",
        },
      },
      "ds"
    )(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text).to.equal(
      ":host { --size-xl:var(--ds--size-xl, 10px); --size-l:var(--ds--size-l, 8px); --size-m:var(--ds--size-m, 4px); }"
    );
  });

  it("variations", () => {
    const sheet = new CSSStyleSheet();

    tokens(
      {
        size: {
          xl: "10px",
          l: "8px",
          m: "4px",
        },
        variation: {
          small: {
            size: {
              xl: "8px",
              l: "6px",
              m: "2px",
            },
          },
        },
      },
      "ds"
    )(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text).to.equal(
      `:host { --size-xl:var(--ds--size-xl, 10px); --size-l:var(--ds--size-l, 8px); --size-m:var(--ds--size-m, 4px); }:host([small]) { --size-xl:var(--ds-small--size-xl, 8px); --size-l:var(--ds-small--size-l, 6px); --size-m:var(--ds-small--size-m, 2px); }`
    );
  });
});
