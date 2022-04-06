import { Tokens } from "./apply-tokens";

export * from "./apply-tokens";
export * from "./apply-classes";

export const composed =
  (...args: ((sheet: CSSStyleSheet, options?: any) => any)[]) =>
  (target: CSSStyleSheet | HTMLStyleElement, options?: Tokens) => {
    let sheet = target instanceof HTMLStyleElement ? target.sheet : target;
    args.reduce((value, fn) => fn(sheet, value), options);
    return target;
  };
