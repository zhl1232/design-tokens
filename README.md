# @atomico/design-tokens

Hi I am [@uppercod](https://twitter.com/uppercod) author of [atomico](http://github.com/atomicojs/atomico), I want to share with all of you `@atomico/design-tokens` techniques and tools that I have created to simplify the maintenance of design systems in webcomponents.

With `@atomico/design-tokens` you can:

1. [resolve scalability and maintenance issues with your design tokens](#resolve-scalability-and-maintenance-issues-with-your-design-tokens).
2. [Create utility classes from design tokens](#create-utility-classes-to-be-used-internally-by-your-component-system).

## Resolve scalability and maintenance issues with your design tokens.

Design systems are complex to develop, due to the number of configurations that are shared between all our components, with `@atomico/design-tokens` we will solve:

1. Naming problems of the custom properties of your design tokens.
2. Legibility of your CSS.

### How does @atomico/design-tokens solve the scalability of your design tokens?

For this example we will use Atomico, by the way you can use `@atomico/design-tokens` with any library.

```tsx
import { css } from "atomico";
import { composed, tokens } from "@atomico/design-tokens";

const designTokens = composed(tokens("--my-ds"));

export const tokensSize = designTokens(
  css`
    :host {
      --size: {
        xl: 40px;
        l: 32px;
        m: 28px;
        s: 20px;
      }
    }
  `
);
```

What happened?:

1. `const designTokens = composed(tokens("--my-ds"));` : create a function that manipulates the CSSStyleSheet instance.
2. `export const tokensSize`: exports the CSS StyleSheet already manipulated by `designTokens`.

internally the CSS result is as follows:

```css
:host {
  --size-xl: var(--my-ds--size-xl, 40px);
  --size-l: var(--my-ds--size-l, 32px);
  --size-m: var(--my-ds--size-m, 28px);
  --size-s: var(--my-ds--size-s, 20px);
}
```

This is a technique that I have created to improve the scalability of design tokens, with it you can:

1. edit the token through custom properties accessible from root, example:

```css
:root {
  --my-ds--size-xl: 50px;
}
```

This is also applicable within a selector.

2. Simplify maintenance, since your components will use the custom properties without a prefix.

## Create utility classes to be used internally by your component system.

I am personally a fan of custom properties, but their use would become repetitive, to avoid this and improve maintenance @atomico/design-tokens introduces `classes`, a generator of utility classes based on the proposed design tokens, example:

```tsx
import { css } from "atomico";
import { composed, tokens, classes } from "@atomico/design-tokens";

const designTokens = composed(tokens("--my-ds"), classes());

export const tokensSize = designTokens(
  css`
    :host {
      --size: {
        xl: 40px;
        l: 32px;
        m: 28px;
        s: 20px;
      }
    }

    .gap\.--size {
      gap: var(--size);
    }
  `
);
```

The `classes` middleware will parse the CSSStyleSheet to relate the custom propeprtiy `--size` as a class of `.gap`, internally the `css` will be as follows:

```css
:host {
  --size-xl: var(--my-ds--size-xl, 40px);
  --size-l: var(--my-ds--size-l, 32px);
  --size-m: var(--my-ds--size-m, 28px);
  --size-s: var(--my-ds--size-s, 20px);
}

.gap\.xl {
  gap: var(--size-xl);
}

.gap\.l {
  gap: var(--size-l);
}

.gap\.m {
  gap: var(--size-m);
}

.gap\.s {
  gap: var(--size-s);
}
```

This makes it really simple to reuse the tokens, example:

```tsx
import { c } from "atomico";
import { tokensSize } from "./tokens";

function button() {
  return (
    <host shadowDom>
      <button class="gap.xl">
        <slot />
      </button>
    </host>
  );
}

button.styles = tokensSize;

customElements.define("my-button", c(button));
```
