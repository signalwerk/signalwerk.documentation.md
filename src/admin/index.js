import CMS from "decap-cms-app";

// import CMS from "@staticcms/core";
// import "@staticcms/core/dist/main.css";
import Page from "./page.jsx";
// import config from './config';

var linkTag = document.querySelector('link[rel="preview-stylesheet"]');
if (linkTag) {
  console.log(linkTag.href); // This will log the href attribute value to the console

  // CMS.registerPreviewStyle("/index.8353e49f.css");
  CMS.registerPreviewStyle(linkTag.href);
} else {
  console.log("Link tag with rel='preview-stylesheet' not found");
}

// test
// console.log("CMS.getPreviewStyles", CMS.getPreviewStyles());
CMS.registerPreviewTemplate("pages", Page);

// https://decapcms.org/docs/beta-features/#custom-formatters
// CMS.registerCustomFormat("json5", "json5", {
//   fromFile: (text) => JSON.parse(text),
//   toFile: (value) => JSON.stringify(value, null, 2),
// });

CMS.init();
