import { visit } from "unist-util-visit";

// based on https://github.com/marekweb/rehype-components/blob/master/index.js

export function rehypeComponents(components = {}) {
  const processor = this;
  return (tree, vfile) => {
    const context = { tree, vfile, processor };
    visit(tree, (node, index, parent) => {
      const component = components[node.tagName];
      if (component) {
        component(node, context);
      }
    });
  };
}
