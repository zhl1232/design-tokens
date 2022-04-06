import { Tokens, insertRule, mapTokens } from "./apply-tokens";

function applyClasses(sheet: CSSStyleSheet, tokens: Tokens) {
  const { cssRules } = sheet;
  const mediaRules = [];
  const addRule = (cssText: string) =>
    sheet.insertRule(cssText, sheet.cssRules.length);
  const { media, variations, ...currentTokens } = tokens;

  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules[i];
    if (!(rule instanceof CSSStyleRule)) continue;

    const { selectorText, cssText } = rule;
    const test = selectorText.match(/\.(--([\w]+))/);
    if (test) {
      const [all, id, option] = test;
      mapTokens(currentTokens[option] as Tokens, (value, prop) => {
        addRule(
          cssText
            .replace(
              selectorText,
              selectorText.replace(
                all,
                ("." + prop.replace(/-+/g, ".")).replace(/\./g, "\\.")
              )
            )
            .replace(RegExp(id, "g"), `${id}-${prop}`)
        );
        return "";
      });
    } else if (selectorText.startsWith(".")) {
      mediaRules.push(rule);
    }
  }
  // for (let prop in media) {
  //   addRule(
  //     `@media ${media[prop]}{${mediaRules.reduce(
  //       (cssRules, rule) =>
  //         cssRules +
  //         rule.cssText.replace(
  //           rule.selectorText,
  //           `${rule.selectorText}\\:${prop}`
  //         ),
  //       ""
  //     )}}`
  //   );
  // }
}

export const classes =
  (localTokens?: Tokens) => (cssSheets: CSSStyleSheet, tokens: Tokens) =>
    applyClasses(cssSheets, { ...tokens, ...localTokens });
