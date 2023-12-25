import { mdToAstSync } from "../../../../signalwerk.md/src";
import { renderNode } from "../../../../signalwerk.md/src/render.jsx";

export function text(node) {
  if (!node) return null;
  if (!node.body) return null;

  const { ast } = mdToAstSync(node.body);

  return (
    <div className={`node-text ${node.class || ""}`}>{renderNode(ast)}</div>
  );
}
