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
      ":host { --size-xl:var(--ds--size-xl); --size-l:var(--ds--size-l); --size-m:var(--ds--size-m); }"
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
      `:host { --size-xl:var(--ds--size-xl); --size-l:var(--ds--size-l); --size-m:var(--ds--size-m); }:host([small]) { --size-xl:var(--ds-small--size-xl); --size-l:var(--ds-small--size-l); --size-m:var(--ds-small--size-m); }`
    );
  });
});
