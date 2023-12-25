import { typeProcessor } from "../index.jsx";

export function box(node, configuration) {
  return (
    <>
      <div className={`box ${node.class || ""}`}>
        <>{node.children && typeProcessor(node.children, configuration)}</>
      </div>
    </>
  );
}
