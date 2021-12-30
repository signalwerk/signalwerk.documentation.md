import html from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";
import { attr } from "../../util/html.js";

export function Grid({ columns, children } = {}, context) {
  let style = null;

  if (columns) {
    style = `--grid-columns-count: ${columns}`;
  }

  return html`
    <div class="grid" ${attr({ style })}>
      <div class="grid__inner">
        ${children?.map((item) => typeProcessor(item, context))}
      </div>
    </div>
  `;
}
