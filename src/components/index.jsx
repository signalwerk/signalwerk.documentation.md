// import html, { safe } from "escape-html-template-tag";
// import { Html } from "./components/Html/index.js";
// import { Markdown } from "./components/Markdown/index.js";
// import { Image } from "./components/Image/index.js";
// import { Collection } from "./components/Collection/index.js";
// import { Document } from "./components/Document/index.js";
// import { Grid } from "./components/Grid/index.js";
// import { Item } from "./components/Item/index.js";

import { mediaItems } from "./types/mediaItems.jsx";
import { image } from "./types/image.jsx";
import { page } from "./types/page.jsx";
import { text } from "./types/text.jsx";
import { gridColumn } from "./types/gridColumn.jsx";
import { grid } from "./types/grid.jsx";
import { box } from "./types/box.jsx";
import { Helmet } from "react-helmet";

export function typeProcessor(data, configuration = {}) {
  if (!data) return null;

  // if data is an array, process each item
  if (Array.isArray(data)) {
    return data.map((item) => typeProcessor(item, configuration));
  }

  const { config, settings } = configuration;

  if (config?.types?.[data.type]) {
    const currentProcessor = config.types?.[data.type];
    const content = currentProcessor(data, {
      Helmet,
      processor: {
        run: (item) => typeProcessor(item, configuration),
      },
    });

    if (config.env === "admin" && config?.admin?.callback?.[data.type]) {
      config?.admin?.callback?.[data.type]({ CMS: config.context?.CMS });
    }

    return content;
  }

  switch (data.type) {
    case ":root": {
      const lang = settings?.page?.html?.lang || "en";
      return (
        <>
          <Helmet htmlAttributes={{ lang }}>
            {settings?.page?.head?.stylesheets.map((stylesheet) => (
              <link href={stylesheet.path} rel="stylesheet" />
            ))}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>

          <>{data.children && typeProcessor(data.children, configuration)}</>
        </>
      );
    }
    case "page": {
      return page(data, configuration);
    }
    case "text": {
      return text(data, configuration);
    }
    case "grid": {
      return <>{grid(data, configuration)}</>;
    }
    case "box": {
      return <>{box(data, configuration)}</>;
    }
    case "grid-column": {
      return gridColumn(data);
    }
    case "mediaItems": {
      return mediaItems(data);
    }
    case "image": {
      return image(data);
    }

    default:
      console.warn("Unsupported data type: ", data.type);
      return (
        <>
          <p>!!! ERROR Unsupported data type: {data.type}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      );
  }
}
