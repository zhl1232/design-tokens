import { expect } from "@esm-bundle/chai";
import { classes } from "../src/apply-classes";

describe("tokens", () => {
  it("default", () => {
    const sheet = new CSSStyleSheet();

    //@ts-ignore
    sheet.replaceSync(`
    .gap.--size{
        gap: var(--size);
    }
    `);

    classes({
      size: {
        xl: "10px",
        l: "8px",
        m: "4px",
      },
    })(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text).to.equal(
      `.gap.--size { gap: var(--size); }.gap\\.xl { gap: var(--size-xl); }.gap\\.l { gap: var(--size-l); }.gap\\.m { gap: var(--size-m); }`
    );
  });

  it("deep 2", () => {
    const sheet = new CSSStyleSheet();

    //@ts-ignore
    sheet.replaceSync(`
    .color.--color{
        color: var(--color);
    }
    `);

    classes({
      color: {
        primary: {
          60: "black",
          30: "red",
          10: "orange",
        },
      },
    })(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text).to.equal(
      `.color.--color { color: var(--color); }.color\\.primary\\.10 { color: var(--color-primary-10); }.color\\.primary\\.30 { color: var(--color-primary-30); }.color\\.primary\\.60 { color: var(--color-primary-60); }`
    );
  });

  it("media", () => {
    const sheet = new CSSStyleSheet();

    //@ts-ignore
    sheet.replaceSync(`
    .show{
        display: block;
    }
    `);

    classes({
      media: {
        xl: "(min-width: 820px)",
        l: "(min-width: 520px)",
      },
    })(sheet);

    const text = [...sheet.cssRules].reduce(
      (cssText, rule) => cssText + rule.cssText,
      ""
    );

    expect(text.replace(/\n/g, "")).to.equal(
      `.show { display: block; }@media (min-width: 820px) {  .show\\:xl { display: block; }}@media (min-width: 520px) {  .show\\:l { display: block; }}`
    );
  });
});
