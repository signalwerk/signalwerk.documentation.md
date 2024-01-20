import { title } from "process";
import { mdToAstSync } from "../../../signalwerk.md/src/index.js";
import processor from "../../../../src/processor.js";

export function textMD(node) {
  if (node.type === "text") {
    const { ast } = mdToAstSync(node.body);
    node.children = [removePositions(ast)];
  } else if (node.type === "image") {
    const { ast } = mdToAstSync(node.caption);
    node.children = [removePositions(ast)];
  } else if (node.children) {
    node.children.map(textMD);
  }
  return node;
}
export function textMDfootnoteGlobal(settings) {
  return Object.keys(settings.definitions).map((key) => {
    const item = settings.definitions[key];
    return {
      type: "text",
      children: [
        {
          type: "root",
          children: [
            {
              type: "footnoteDefinition",
              identifier: item.identifier,
              index: item.index,
              children: item.children,
            },
          ],
        },
      ],
    };
  });
}

export function textMDfootnote(node, settings) {
  // console.log("!!!!!footnoteReference", node);
  if (node.type === "footnoteReference") {
    settings.usage.push(node.identifier);
    node.index = settings.index++;
  }
  if (node.type === "footnoteDefinition") {
    if (node.children.length > 0) {
      // find position of footnote
      const index = settings.usage.indexOf(node.identifier);
      settings.definitions[node.identifier] = node;
      node.index = index + 1;

      node.type = "noop";
    }
  } else if (node.children) {
    node.children.map((item) => textMDfootnote(item, settings));
  }
  return node;
}

function convertMediaStructure(data) {
  const children = data.children.map((child) => {
    // Extract the key (type) and its value
    const type = Object.keys(child)[0];
    const content = child[type];

    // Return a new object with type, path, and alt
    return {
      type,
      ...content,
    };
  });
  return {
    ...data,
    children,
  };
}

export function mediaItems(node) {
  if (node.type === "mediaItems") {
    const fixedNode = convertMediaStructure(node);
    return fixedNode;
  } else if (node.children) {
    return {
      ...node,
      children: node.children.map(mediaItems),
    };
  }
  return node;
}
function removePositions(node) {
  if (!node) return node;

  if (node.position) {
    delete node.position; // Remove the position property
  }

  if (node.children) {
    node.children.forEach(removePositions); // Apply recursively to children
  }

  return node;
}
function processDataSettings(node, processor) {
  if (!node) return node;
  if (!processor) return node;

  if (processor?.types?.[node.type]) {
    const currentProcessor = processor.types?.[node.type];

    return {
      ...currentProcessor(node),
    };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((node) =>
        processDataSettings(node, processor)
      ),
    };
  }

  return node;
}

export function fixPage(node, { settings, data, pathCache } = {}) {
  const footnote = {
    index: 1,
    usage: [],
    definitions: {
      // "fn-1": { type: "footnoteDefinition", identifier: "fn-1" … },
    },
  };

  const fixedNode = processDataSettings(
    mediaItems(textMDfootnote(textMD(node), footnote)),
    processor
  );

  const rawMenu = settings?.menus?.find((item) => item?.menu?.title === "main");

  const menu = rawMenu?.menu?.ref_page?.pages?.map((path) => {
    const filename = pathCache[path];
    const page = data[filename];
    return {
      label: page.title,
      path: page.path,
    };
  });

  return {
    type: ":root",
    children: [
      {
        type: "page",
        footnotes: textMDfootnoteGlobal(footnote),
        menus: {
          main: {
            title: rawMenu?.menu?.title,
            items: menu,
          },
        },
        ...fixedNode,
      },
    ],
  };
}
