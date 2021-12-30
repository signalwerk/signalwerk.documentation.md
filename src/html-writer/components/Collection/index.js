import html from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";

export function Collection({ children } = {}, context) {
  return html` <section class="collection">
    <!-- collection:children:start -->
    ${children?.map((item) => typeProcessor(item, context))}
    <!-- collection:children:end -->
  </section>`;
}


