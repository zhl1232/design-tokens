export interface Tokens {
  [token: string]: {
    [prop: string]: string;
  };
}

function applyTokens(
  sheet: CSSStyleSheet,
  prefix: string = "",
  tokens: Tokens = {}
) {
  const { length } = sheet.cssRules;
  for (let i = 0; i < length; i++) {
    const rule = sheet.cssRules[i];
    if (
      rule instanceof CSSStyleRule &&
      /^:(host|root)/.test(rule.selectorText)
    ) {
      const { selectorText, style } = rule;
      let cssText = "";
      for (let si = 0; si < style.length; si++) {
        const rootProp = style[si];
        const value = style.getPropertyValue(rootProp);

        value.replace(
          /([\w\-]+) *: *([^;]+);/g,
          (all: string, prop: string, value: string) => {
            const cssProp = `${rootProp}-${prop}`;
            const idProp = rootProp.replace(/^-+/, "");
            tokens[idProp] = tokens[idProp] || {};
            tokens[idProp][prop] = value;
            cssText += `${cssProp}: ${
              selectorText.startsWith(":root")
                ? value
                : `var(${prefix}${cssProp}, ${value})`
            };`;
            return "";
          }
        );
      }
      if (cssText) {
        sheet.deleteRule(i);
        sheet.insertRule(`${selectorText}{${cssText}}`, i);
      }
    } else {
      break;
    }
  }
  return tokens;
}

export const tokens = (prefix?: string) => (cssSheets: CSSStyleSheet) =>
  applyTokens(cssSheets, prefix);
