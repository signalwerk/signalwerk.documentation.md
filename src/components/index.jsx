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
import { box } from "./types/box.jsx";
import { Helmet } from "react-helmet";

export function typeProcessor(data, config) {
  // console.log("typeProcessor", { data });

  if (config?.types?.[data?.type]) {
    // console.log(`typeProcessor overwrite for ${data.type}`);
    const currentProcessor = config.types?.[data.type];
    const content = currentProcessor(data, {
      Helmet,
      processor: {
        run: (item) => typeProcessor(item, config),
      },
    });

    // if (config.env === "admin" && data?.type === ":root") {
    //   console.log("----- callback :root");
    //   console.log("----- callback context", config.context);
    //   console.log("----- callback", config?.callback?.[data?.type]);
    // }
    if (config.env === "admin" && config?.admin?.callback?.[data?.type]) {
      // console.log("----- callback");

      config?.admin?.callback?.[data?.type]({ CMS: config.context?.CMS });
    }

    return content;
  }

  switch (data?.type) {
    case ":root": {
      return (
        <>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          {data?.children?.map((item, index) => (
            <>{typeProcessor(item)}</>
          ))}
        </>
      );
    }
    case "page": {
      return (
        <div className="page">
          <Helmet>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
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
    case "box": {
      return <>{box(data)}</>;
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
