let sandbox: HTMLIFrameElement;

export function getSheet(style: CSSStyleSheet | HTMLStyleElement) {
  if (style instanceof CSSStyleSheet) {
    return style;
  }

  if (style.sheet) {
    return style.sheet;
  }

  if (!sandbox) {
    sandbox = document.createElement("iframe");
    sandbox.style.display = "none";
    document.body.appendChild(sandbox);
  }

  const { contentDocument } = sandbox;

  contentDocument.head.appendChild(style);

  const { sheet } = style;

  const { cloneNode } = style;

  style.cloneNode = (deep?: boolean) => {
    const copy = cloneNode.call(style);
    const { cssRules } = sheet;
    for (let i = 0; i < cssRules.length; i++) {
      copy.textContent += cssRules[i].cssText;
    }
    return copy;
  };

  return sheet;
}

export function insertRule(
  target: HTMLStyleElement | CSSStyleSheet,
  cssRule: string,
  index?: number
) {
  let sheet = getSheet(target);
  sheet.insertRule(cssRule, index == null ? sheet.cssRules.length : index);
}
