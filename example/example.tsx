import { c, css } from "atomico";
import tokens from "./tokens";

function component() {
  return (
    <host shadowDom>
      <div class="row gap.xl">
        <button class="color.bg.primary.60 size.xl"></button>
        <button class="color.bg.primary.60 size.l"></button>
        <button class="color.bg.primary.60 size.m"></button>
        <button class="color.bg.primary.60 size.s"></button>
        <button class="color.bg.secondary.60 size.xs"></button>
      </div>
    </host>
  );
}

component.styles = [
  tokens,
  css`
    button {
      padding: 0px;
      border: none;
    }
  `,
];

customElements.define("my-example", c(component));
