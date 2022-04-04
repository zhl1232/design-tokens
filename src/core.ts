import { Tokens } from "./apply-tokens";

export * from "./apply-tokens";
export * from "./apply-classes";

export const composed =
  (...args: ((sheet: CSSStyleSheet, options?: any) => any)[]) =>
  (sheet: CSSStyleSheet, options?: Tokens) => {
    args.reduce((value, fn) => fn(sheet, value), options);
    return sheet;
  };
