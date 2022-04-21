import { expect } from "@esm-bundle/chai";
import { getSheet, insertRule } from "../src/utils";

describe("getSheet", () => {
  it("HTMLStyleElement", () => {
    const style = document.createElement("style");

    style.textContent = "body{color:red}:root{display:block}";

    const sheet = getSheet(style);

    expect(sheet.cssRules.length).to.equal(2);

    expect([...sheet.cssRules].map((rule) => rule.cssText)).to.deep.equal([
      "body { color: red; }",
      ":root { display: block; }",
    ]);
  });
});

describe("insertRule", () => {
  it("HTMLStyleElement", () => {
    const style = document.createElement("style");

    insertRule(style, "body{color:red}");
    insertRule(style, ":root{display: block;}");

    const sheet = getSheet(style);

    expect(sheet.cssRules.length).to.equal(2);

    expect([...sheet.cssRules].map((rule) => rule.cssText)).to.deep.equal([
      "body { color: red; }",
      ":root { display: block; }",
    ]);
  });
});
