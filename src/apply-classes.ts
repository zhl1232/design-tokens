import { Tokens, insertRule, mapTokens } from "./apply-tokens";

function applyClasses(sheet: CSSStyleSheet, tokens: Tokens) {
  const { cssRules } = sheet;
  const mediaRules = [];
  const { media, variations, ...currentTokens } = tokens;

  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules[i];
    if (!(rule instanceof CSSStyleRule)) continue;

    const { selectorText, cssText } = rule;
    const test = selectorText.match(/\.(--([\w\-]+))/);
    if (test) {
      const [all, id, option] = test;
      const map = option.split("-");

      mapTokens(
        map.reduce((value, index) => value[index], currentTokens) as Tokens,
        (value, prop) => {
          insertRule(
            sheet,
            cssText
              .replace(
                selectorText,
                selectorText
                  .replace(all, "." + prop.replace(/-+/g, "."))
                  .replace(/(.)\./g, "$1\\.")
              )
              .replace(RegExp(id, "g"), `${id}-${prop}`)
          );
          return "";
        }
      );
    } else if (selectorText.startsWith(".")) {
      mediaRules.push(rule);
    }
  }
  for (let prop in media) {
    insertRule(
      sheet,
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
