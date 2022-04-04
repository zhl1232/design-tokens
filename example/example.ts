import { composed, tokens, classes } from "../src/core";

const { sheet } = document.querySelector<HTMLStyleElement>("#style");

composed(tokens(), classes())(sheet);

console.log([...sheet.cssRules]);
