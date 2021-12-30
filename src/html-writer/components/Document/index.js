import html from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";

export function Document(
  { title, subline, info, children = [] } = {},
  context
) {
  const hasHeader = title || subline || info;
  let header = [];
  if (hasHeader) {
    title && header.push(html`<h1 class="header__title">${title}</h1>`);
    subline && header.push(html`<p class="header__subline">${subline}</p>`);
    info && header.push(html`<p class="header__info">${info}</p>`);

    header = html`<header class="header">
      <div class="header__inner">${header}</div>
    </header>`;
  }

  return html`
    <article class="document">
      ${header}

      <!-- document:children:start -->
      ${children?.map(
        (item) => html`
          <div class="document__item">${typeProcessor(item, context)}</div>
        `
      )}
      <!-- document:children:end -->
    </article>
  `;
}
