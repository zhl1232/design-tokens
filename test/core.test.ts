import { expect } from "@esm-bundle/chai";
import { compose, tokens, classes } from "../src/core";

describe("tokens", () => {
  it("default", () => {
    const sheet = new CSSStyleSheet();

    //@ts-ignore
    sheet.replaceSync(`
       .gap.--size{
           gap: var(--size);
       }
    `);

    const designTokens = compose(
      tokens(
        {
          size: {
            xl: "10px",
            l: "8px",
            m: "4px",
          },
        },
        "ds"
      ),
      classes()
    );

    designTokens(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text).to.equal(
      `:host { --size-xl:var(--ds--size-xl, 10px); --size-l:var(--ds--size-l, 8px); --size-m:var(--ds--size-m, 4px); }.gap.--size { gap: var(--size); }.gap\\.xl { gap: var(--size-xl); }.gap\\.l { gap: var(--size-l); }.gap\\.m { gap: var(--size-m); }`
    );
  });
});
