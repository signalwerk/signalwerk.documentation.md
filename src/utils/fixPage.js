import { title } from "process";
import { mdToAstSync } from "../../../signalwerk.md/src/index.js";

export function textMD(node) {
  if (node.type === "text") {
    const { ast } = mdToAstSync(node.body);
    node.children = [removePositions(ast)];
  } else if (node.children) {
    node.children.map(textMD);
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

export function fixPage(node, { settings, data, pathCache }) {
  const fixedNode = mediaItems(textMD(node));

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
