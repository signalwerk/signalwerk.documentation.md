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

export function mediaItems(node) {
  if (node.type === "mediaItems") {
    node.children.map((mediaItem) => {
      mediaItem.type = "mediaItem";
    });
  } else if (node.children) {
    node.children.map(mediaItems);
  }
  return node;
}
function removePositions(node) {
  if (node.position) {
    delete node.position; // Remove the position property
  }

  if (node.children) {
    node.children.forEach(removePositions); // Apply recursively to children
  }

  return node;
}

export function fixPage(node) {
  node.type = "page";

  mediaItems(textMD(node));
  return node;
}
