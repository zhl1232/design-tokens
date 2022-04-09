type TokenValue =
  | string
  | {
      [prop: string]: TokenValue;
    };

export interface GenericTokens {
  [token: string]: TokenValue;
}

export interface Tokens extends GenericTokens {
  media?: {
    [media: string]: string;
  };
}

export const mapTokens = (
  tokens: Tokens,
  fn: (value: string, index: string) => string,
  current = ""
) => {
  let cssText = "";
  for (let prop in tokens) {
    if (prop == "$set") {
      cssText += fn(tokens[prop] as string, current);
    } else {
      let next = (current ? current + "-" : "") + prop;
      if (typeof tokens[prop] === "object") {
        cssText += mapTokens(tokens[prop] as any, fn, next);
      } else {
        cssText += fn(tokens[prop] as string, next);
      }
    }
  }
  return cssText;
};

export const insertRule = (
  sheet: CSSStyleSheet,
  cssRules: string,
  index = sheet.cssRules.length
) => sheet.insertRule(cssRules, index);

function applyTokens(
  sheet: CSSStyleSheet,
  tokens: Tokens = {},
  prefix: string
) {
  const { variation, media, ...currentTokens } = tokens;
  let i = 0;
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
      )}}`,
      i++
    );

  const selector = ":host";

  createRule(selector, currentTokens);

  for (let prop in variation as Tokens) {
    createRule(
      `${selector}([${prop}])`,
      variation[prop],
      prop.replace(/[^\w]+/g, "-")
    );
  }

  return tokens;
}

export const tokens =
  (token: Tokens, prefix: string) => (cssSheets: CSSStyleSheet) =>
    applyTokens(cssSheets, token, prefix);
