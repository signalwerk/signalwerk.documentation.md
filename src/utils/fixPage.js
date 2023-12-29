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

export function fixPage(node) {
  const fixedNode = mediaItems(textMD(node));
  return {
    type: ":root",
    children: [
      {
        type: "page",
        ...fixedNode,
      },
    ],
  };
}
