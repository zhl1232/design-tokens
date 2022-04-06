type TokenValue =
  | string
  | {
      [prop: string]: TokenValue;
    };

export interface Tokens {
  [token: string]: TokenValue;
}

export const mapTokens = (
  tokens: Tokens,
  fn: (value: string, index: string) => string,
  current = ""
) => {
  let cssText = "";
  for (let prop in tokens) {
    let next = (current ? current + "-" : "") + prop;
    if (typeof tokens[prop] === "object") {
      cssText += mapTokens(tokens[prop] as any, fn, next);
    } else {
      cssText += fn(tokens[prop] as string, next);
    }
  }
  return cssText;
};

export const insertRule = (sheet: CSSStyleSheet, cssRules: string) =>
  sheet.insertRule(cssRules, sheet.cssRules.length);

function applyTokens(
  sheet: CSSStyleSheet,
  tokens: Tokens = {},
  prefix: string
) {
  const { variation, ...currentTokens } = tokens;

  const createRule = (selector: string, tokens: Tokens, variation = "") =>
    insertRule(
      sheet,
      `${selector}{${mapTokens(
        tokens,
        (value, index) =>
          `--${index}:${
            prefix
              ? `var(--${prefix}${
                  variation ? "-" + variation : ""
                }--${index}, ${value})`
              : value
          };`
      )}}`
    );

  const selector = ":host";

  createRule(selector, currentTokens);

  for (let prop in variation as Tokens) {
    createRule(`${selector}[${prop}]`, variation[prop], prop);
  }

  return tokens;
}

export const tokens =
  (token: Tokens, prefix: string) => (cssSheets: CSSStyleSheet) =>
    applyTokens(cssSheets, token, prefix);
