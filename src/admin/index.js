import CMS from "decap-cms-app";

// import CMS from "@staticcms/core";
// import "@staticcms/core/dist/main.css";
import Page from "./page.jsx";
// import config from './config';

// test
CMS.registerPreviewStyle("/index.8353e49f.css");
console.log("CMS.getPreviewStyles", CMS.getPreviewStyles());
CMS.registerPreviewTemplate("pages", Page);

// https://decapcms.org/docs/beta-features/#custom-formatters
// CMS.registerCustomFormat("json5", "json5", {
//   fromFile: (text) => JSON.parse(text),
//   toFile: (value) => JSON.stringify(value, null, 2),
// });

CMS.init();
