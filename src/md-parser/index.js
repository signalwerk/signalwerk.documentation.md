import { rehypeComponents } from "./util/custom-components.js";
import remarkParse from "remark-parse";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import fm from "front-matter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// this is a special handler to split up the content
// into sections of normal markdown and sections for grid-elements

function grid(content) {
  let currentPos = 0;
  const gridItems = [];
  const context = {
    body: content,
  };

  const HTML = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeComponents, {
      grid: (node) => {
        const { grid, start, end } = processGrid(node, context);

        if (currentPos < start) {
          gridItems.push({
            type: "markdown",
            markdown: content.substring(currentPos, start),
          });
        }
        currentPos = end;

        gridItems.push(grid);
      },
    })
    .use(rehypeStringify)
    .processSync(content);

  if (currentPos < content.length - 1) {
    gridItems.push({
      type: "markdown",
      markdown: content.substring(currentPos, content.length - 1),
    });
  }

  return gridItems;
}

// used to split the content into the frontmatter-data part and the content-part
function frontmatter(content) {
  let data = {};
  let body = content;

  try {
    data = fm(content);
    body = data.body;
  } catch (e) {
    console.log(e);
  }

  return { data: data.attributes, body };
}

// based on position-object get the selected content of the body
function getBody(position, body) {
  const { start, end } = position;
  return body.substring(start.offset, end.offset);
}

// indsige the grid we have the items. so let's extract them and the containing markdown
function processItem(node, context) {
  const { properties } = node;
  const { type, ...attr } = properties;

  const text = getBody(node.position, context.body);
  const start = text.indexOf(">");
  const end = text.lastIndexOf("<");

  const content = text.substring(start + 1, end);

  const item = {
    type: "item",
    ...attr,
    children: [
      {
        type: "markdown",
        markdown: content,
      },
    ],
  };

  return item;
}

// process the grid-element and extract the items
function processGrid(node, context) {
  const { properties, children } = node;
  const { type, ...attr } = properties;

  const grid = {
    type: "grid",
    ...attr,
    children: children
      .filter((item) => item.tagName === "item")
      .map((child) => {
        return processItem(child, context);
      }),
  };

  const { start, end } = node.position;

  return { grid, start: start.offset, end: end.offset };
}

export function parse(content) {
  const { data, body } = frontmatter(content);
  const doc = {
    type: "document",
    slug: data.slug,
    lang: data.lang,
    title: data.title,
    subline: data.subline,
    info: data.info,
    debug: data.debug,
    template: data.template,
    children: [],
  };
  const collection = {
    type: "collection",
    debug: "collection",
    children: [],
  };

  collection.children = grid(body);

  doc.children = [collection];

  return doc;
}
