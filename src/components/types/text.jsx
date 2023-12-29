import { mdToAstSync } from "../../../../signalwerk.md/src";
import { renderNode } from "../../../../signalwerk.md/src/render.jsx";
import { renderToString } from "react-dom/server";

export function text(node) {
  if (!node) return null;
  if (!node.body) return null;

  const { ast } = mdToAstSync(node.body);

  const content = renderToString(renderNode(ast))
  .replaceAll(`<span class="--node-remove-html-start">`, "")
  .replaceAll(`<span class="--node-remove-html-end"></span></span>`, "");

  return (
    <div className={`node-text ${node.class || ""}`}
    dangerouslySetInnerHTML={{
      __html: content
    }}

    />)
}
