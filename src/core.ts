import { Tokens } from "./apply-tokens";
export * from "./utils";
export * from "./apply-tokens";
export * from "./apply-classes";

export const compose =
  (
    ...args: ((sheet: CSSStyleSheet | HTMLStyleElement, options?: any) => any)[]
  ) =>
  (target: CSSStyleSheet | HTMLStyleElement, options?: Tokens) => {
    args.reduce((value, fn) => fn(target, value), options);
    return target;
  };
