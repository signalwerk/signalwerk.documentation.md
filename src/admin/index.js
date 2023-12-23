import CMS from "decap-cms-app";
import config from "../../../../src/config.jsx";

// import CMS from "@staticcms/core";
// import "@staticcms/core/dist/main.css";
import Page from "./page.jsx";
// import config from './config';

// wait for DOM ready
// document.addEventListener("DOMContentLoaded", () => {
// get the form elements defined in your form HTML above
var linkTag = document.querySelector('link[rel="stylesheet"]');
if (linkTag) {
  console.log(linkTag.href); // This will log the href attribute value to the console

  CMS.registerPreviewStyle(linkTag.href);
  CMS.registerPreviewStyle(
    "https://fonts.signalwerk.ch/css/latest/family=Work+Sans:ital,wght@0,100..900;1,100..900.css"
  );

  // if (config?.admin?.init) {
  //   console.log("init CMS");
  //   config.admin.init({ CMS });
  // }

  // linkTag.href = "";
} else {
  console.log("Link tag with rel='preview-stylesheet' not found");
}

// test
// console.log("CMS.getPreviewStyles", CMS.getPreviewStyles());
CMS.registerPreviewTemplate("pages", ({ entry }) => Page({ entry, CMS }));

// https://decapcms.org/docs/beta-features/#custom-formatters
// CMS.registerCustomFormat("json5", "json5", {
//   fromFile: (text) => JSON.parse(text),
//   toFile: (value) => JSON.stringify(value, null, 2),
// });

CMS.init();
// });
