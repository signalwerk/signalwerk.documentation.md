import html from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";
import { attr } from "../../util/html.js";

export function Item({ span, children } = {}, context) {
  let style = null;

  if (span) {
    style = `--grid-item-column--span: ${span}`;
  }

  return html`
    <div class="item" ${attr({ style })}>
      ${children?.map((item) => typeProcessor(item, context))}
    </div>
  `;
}
