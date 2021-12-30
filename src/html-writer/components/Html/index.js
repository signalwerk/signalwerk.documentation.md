import html, { safe } from "escape-html-template-tag";
import { typeProcessor } from "../../index.js";
import { Document } from "../Document/index.js";
import { attr } from "../../util/html.js";

const DOMAIN = "http://digital-typography.local.signalwerk.ch:9011";

export function Html(
  {
    title,
    lang = "en",
    template = "document",
    description = "",
    className = "",
    debug = false,
    headerFooter = "",
    children = [],
  } = {},
  context
) {
  const classNames = [
    className,
    `template--${template}`,
    ...(debug ? ["debug"] : []),
  ];
  const classStr = classNames.filter((name) => name).join(" ");

  return html`<!DOCTYPE html>
    <html
      ${attr({
        lang,
        class: classStr,
      })}
    >
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${description
          ? html`<meta name="description" content="${description}" />`
          : ""}
        ${headerFooter}
      </head>
      <body class="body">
        <main>
          <!-- html:children:start -->
          ${children?.map((item) => typeProcessor(item, context))}
          <!-- html:children:end -->
        </main>
      </body>
    </html>`;
}
