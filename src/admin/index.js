import React from "react";
import CMS from "decap-cms-app";
import config from "../../../../src/config.jsx";
import settings from "../../../../src/settings.json";

import Page from "./page.jsx";
import SignalwerkEditor from "./editor.jsx";

// get the css elements defined in header HTML
const linkTag = document.querySelector('link[rel="stylesheet"]');

if (linkTag) {
  // css from /src/style.scss
  CMS.registerPreviewStyle(linkTag.href);

  // css from settings
  if (settings?.page?.head?.stylesheets) {
    settings.page.head.stylesheets.forEach((stylesheet) => {
      CMS.registerPreviewStyle(stylesheet.path);
    });
  }

  // config itnit
  if (config?.admin?.init) {
    config.admin.init({ CMS });
  }
} else {
  console.log("Link tag with rel='stylesheet' not found");
}

// register pages
CMS.registerPreviewTemplate("pages", ({ entry }) => Page({ entry, CMS }));

const CmsString = CMS.getWidget("string").control;

CMS.registerWidget("SignalwerkEditor", ({ field, value, onChange }) => {
  return (
    <>
      {/* --{value}-- */}
      <div style={{ height: "550px", border: "2px solid rgb(223, 223, 227)" }}>
        <SignalwerkEditor value={value} onChange={onChange} />
      </div>
    </>
  );
});

CMS.registerWidget("pathpreview", (props) => {
  const images = props.field.get("images", []);

  console.log("images", JSON.stringify(images[0], null, 2));
  return (
    <>
      <CmsString {...props} />

      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "0.5em",
          paddingTop: "0.3em",
          lineHeight: 1,
          alignItems: "center",
        }}
      >
        {images.map((image) => {
          const url = image.get("url");
          const img = image.get("img");
          const name = image.get("name");
          return (
            <>
              <a href={url} target="_blank">
                <img src={img} alt={name || "image"} />
              </a>
            </>
          );
        })}
        <a href={props.value} target="_blank">
          show current page ↗
        </a>
      </div>
    </>
  );
});

// https://decapcms.org/docs/beta-features/#custom-formatters
// CMS.registerCustomFormat("json5", "json5", {
//   fromFile: (text) => JSON.parse(text),
//   toFile: (value) => JSON.stringify(value, null, 2),
// });

CMS.init();
