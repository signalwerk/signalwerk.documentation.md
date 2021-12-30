import html from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";
import { attr } from "../../util/html.js";

export function Image({ src } = {}, context) {
  return html`
    <div class="image">
      <img ${attr({ src })} />
    </div>
  `;
}
