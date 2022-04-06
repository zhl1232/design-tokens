import { c, css } from "atomico";
import tokens from "./tokens";

function component() {
  return (
    <host shadowDom>
      <div class="row gap.xl">
        <button class="color.primary font.size.xxs size.xl">xl</button>
        <button class="color.primary font.size.xxs size.l">l</button>
        <button class="color.primary font.size.xxs size.m">m</button>
        <button class="color.primary font.size.xxs size.s">s</button>
        <button class="color.primary font.size.xxs size.xs">xs</button>
      </div>
    </host>
  );
}

component.styles = [
  tokens,
  css`
    button {
      padding: 0px;
    }
  `,
];

customElements.define("my-example", c(component));
