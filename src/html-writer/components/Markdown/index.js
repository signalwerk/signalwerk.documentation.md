import html, { safe } from "escape-html-template-tag";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import rehypeExternalLinks from "rehype-external-links";
import { remarkGfm } from "./gfm.js";

export function Markdown({ markdown } = {}) {
  const HTML = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, { subset: false })

    .use(rehypeSanitize, {
      ...defaultSchema,

      // allow style tags for special tag handling
      tagNames: [...defaultSchema.tagNames, "style"],

      // allow classNames on code, div and span
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes.code || []), "className"],
        div: [...(defaultSchema.attributes.div || []), "className"],
        span: [...(defaultSchema.attributes.span || []), "className"],
      },
    })

    .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(remarkGfm)
    .use(rehypeStringify)
    .processSync(markdown);

  return html`
    <div class="markdown">
      <div class="markdown__inner">${safe(HTML)}</div>
    </div>
  `;
}
