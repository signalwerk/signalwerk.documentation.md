import { Helmet } from "react-helmet";
import { typeProcessor } from "../index.jsx";

export function page(node, configuration) {
  if (!node) return null;
  return (
    <>
      {/* <pre>{JSON.stringify(node, null, 2)}</pre> */}
      <Helmet>
        <title>{node.title}</title>
        <meta name="description" content={node.description} />
      </Helmet>
      <div className={`node-page ${node.class || ""}`}>
        <>{node.children && typeProcessor(node.children, configuration)}</>
      </div>
    </>
  );
}
