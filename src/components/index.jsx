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
export function typeProcessor(data) {
  // console.log("typeProcessor", { data });
  switch (data?.type) {
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
