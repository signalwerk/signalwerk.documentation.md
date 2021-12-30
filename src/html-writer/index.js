import prettier from "prettier";
import html, { safe } from "escape-html-template-tag";
import { Html } from "./components/Html/index.js";
import { Markdown } from "./components/Markdown/index.js";
import { Image } from "./components/Image/index.js";
import { Collection } from "./components/Collection/index.js";
import { Document } from "./components/Document/index.js";
import { Grid } from "./components/Grid/index.js";
import { Item } from "./components/Item/index.js";

export function typeProcessor(data, context = {}) {
  switch (data.type) {
    case "collection": {
      return Collection(
        {
          children: data.children,
        },
        context
      );
      break;
    }
    case "item": {
      return Item(
        {
          span: data.span,
          children: data.children,
        },
        context
      );
      break;
    }
    case "grid": {
      return Grid(
        {
          columns: data.columns,
          children: data.children,
        },
        context
      );
      break;
    }

    case "document": {
      return Document(
        {
          title: data.title,
          subline: data.subline,
          info: data.info,
          children: data.children,
        },
        context
      );
      break;
    }

    case "html": {
      return Html(
        {
          title: data.title,
          lang: data.lang,
          description: data.description,
          template: data.template,
          className: data.className,
          debug: data.debug,
          children: data.children,
          headerFooter: data.headerFooter,
        },
        context
      );
      break;
    }

    case "markdown": {
      return Markdown(
        {
          markdown: data.markdown,
        },
        context
      );
      break;
    }
    case "image": {
      return Image(
        {
          src: data.url,
        },
        context
      );
      break;
    }

    default:
      // code block
      return `!!! ERROR: ${data.type}`;
  }
}

export function directusDataProcessor(data) {
  switch (data.__typename) {
    case "document": {
      return {
        id: data.id,
        type: data.__typename,
        title: data.title,
        lang: data.lang,
        slug: data.slug,
        children: [directusDataProcessor(data.content)],
      };
      break;
    }

    case "collection": {
      return {
        type: data.__typename,
        id: data.id,
        content: data.content,
        children: data.collection.map((item) =>
          directusDataProcessor(item.item)
        ),
      };
      break;
    }

    case "markdown": {
      return {
        type: data.__typename,
        id: data.id,
        markdown: data.content,
      };
      break;
    }

    case "image": {
      return {
        type: data.__typename,
        id: data.id,
        url: data.url,
      };
      break;
    }

    default:
      // code block
      return `!!! ERROR: ${data.__typename}`;
  }
}

function headerFooter(prefix, styleSelector) {
  return html`
    <!-- add fonts styles -->
    <link rel="preconnect" href="https://fonts.signalwerk.ch" />
    <link
      href="https://fonts.signalwerk.ch/css/latest/family=Open+Sans:ital,wght@0,300..800;1,300..800.css"
      rel="stylesheet"
    />

    <!-- custom styles -->
    <link
      rel="stylesheet"
      href="${safe(prefix)}${styleSelector}.critical.css"
      media="all"
    />
    <link
      rel="preload"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
      href="${safe(prefix)}${styleSelector}.rest.css"
      media="all"
    />
  `;
}

export function write({ data }) {
  let HTML = typeProcessor({
    type: "html",
    title: data.title,
    description: data.subline,
    lang: data.lang,
    debug: data.debug,
    children: [data],
    headerFooter: headerFooter(
      "https://rawcdn.githack.com/signalwerk/signalwerk.styles/0791db7/styles/",
      // "http://signalwerk.styles.local.signalwerk.ch:8081/",
      data.template === "blog" ? "blog" : "doc"
    ),
  });

  try {
    HTML = prettier.format(`${HTML}`, { parser: "html" });
  } catch (e) {
    // console.log(e);
    console.log("Prettier failed. Probably some syntax errors.");
  }

  return HTML;
}
