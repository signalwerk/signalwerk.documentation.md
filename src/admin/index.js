import CMS from "decap-cms-app";
import config from "../../../../src/config.jsx";
import settings from "../../../../src/settings.json";

import Page from "./page.jsx";

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

// https://decapcms.org/docs/beta-features/#custom-formatters
// CMS.registerCustomFormat("json5", "json5", {
//   fromFile: (text) => JSON.parse(text),
//   toFile: (value) => JSON.stringify(value, null, 2),
// });

CMS.init();
