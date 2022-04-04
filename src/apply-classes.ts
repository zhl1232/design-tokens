import { Tokens } from "./apply-tokens";

function applyClasses(sheet: CSSStyleSheet, tokens: Tokens) {
  const { cssRules } = sheet;
  const mediaRules = [];
  const addRule = (cssText: string) =>
    sheet.insertRule(cssText, sheet.cssRules.length);
  const { media } = tokens;

  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules[i];
    if (!(rule instanceof CSSStyleRule)) continue;

    const { selectorText, cssText } = rule;
    const test = selectorText.match(/\.(--([\w]+))/);

    if (test) {
      const [all, id, option] = test;
      const value = tokens[option];
      if (!value) continue;
      for (let prop in value) {
        addRule(
          cssText
            .replace(selectorText, selectorText.replace(id, prop))
            .replace(RegExp(id, "g"), `${id}-${prop}`)
        );
      }
    } else if (selectorText.startsWith(".")) {
      mediaRules.push(rule);
    }
  }
  for (let prop in media) {
    addRule(
      `@media ${media[prop]}{${mediaRules.reduce(
        (cssRules, rule) =>
          cssRules +
          rule.cssText.replace(
            rule.selectorText,
            `${rule.selectorText}\\:${prop}`
          ),
        ""
      )}}`
    );
  }
}

export const classes =
  (localTokens?: Tokens) => (cssSheets: CSSStyleSheet, tokens: Tokens) =>
    applyClasses(cssSheets, { ...tokens, ...localTokens });
