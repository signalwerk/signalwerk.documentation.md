// import html, { safe } from "escape-html-template-tag";
// import { Html } from "./components/Html/index.js";
// import { Markdown } from "./components/Markdown/index.js";
// import { Image } from "./components/Image/index.js";
// import { Collection } from "./components/Collection/index.js";
// import { Document } from "./components/Document/index.js";
// import { Grid } from "./components/Grid/index.js";
// import { Item } from "./components/Item/index.js";

import { mdToAstSync } from "../../../signalwerk.md/src";
import { renderNode } from "../../../signalwerk.md/src/render.jsx";
import { mediaItems } from "./types/mediaItems.jsx";
import { column } from "./types/column.jsx";
import { grid } from "./types/grid.jsx";
import { Helmet } from "react-helmet";

export function typeProcessor(data) {
  // console.log("typeProcessor", { data });
  switch (data?.type) {
    case "page": {
      return (
        <div className="page">
          <Helmet>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          {data?.children?.map((item, index) => (
            <>{typeProcessor(item)}</>
          ))}
        </div>
      );
    }
    case "text": {
      const { ast } = mdToAstSync(data.body);
      return renderNode(ast);
    }
    case "grid": {
      return <>{grid(data)}</>;
    }
    case "grid-column": {
      return column(data);
    }
    case "mediaItems": {
      return mediaItems(data);
    }

    // case "image": {
    // }

    default:
      console.warn("Unsupported data type: ", data?.type);
      return (
        <>
          <p>!!! ERROR Unsupported data type: {data?.type}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      );
  }
}
