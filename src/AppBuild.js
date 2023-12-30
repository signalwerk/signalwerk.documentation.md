import fs from "fs";
import path, { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { typeProcessor } from "./components";
import prettier from "prettier";
import { fixPage } from "./utils/fixPage.js";
import config from "../../../src/config.jsx";
import settings from "../../../src/settings.json";
import { getFilesFromDir } from "./getFilesFromDir";
import crypto from "crypto";

const outputHtml = "./index.html";
const stylesheetPath = "/style.css";

const __filename = process.argv[1] || fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainRoot = path.join(__dirname, "../../../../");
const outputRoot = path.join(mainRoot, "./docs");
const contentRoot = path.join(mainRoot, "./content/pages");

export const pagePath = getFilesFromDir(contentRoot, ".json");

const pathCache = {}; // map from slug to original path
const pageData = {}; // data with id = path

pagePath.forEach((originalPath) => {
  const content = fs.readFileSync(originalPath, "utf-8");
  const data = JSON.parse(content);
  pageData[originalPath] = data;
  let slug = data.path;
  pathCache[slug] = originalPath;
});

const stylesheet = fs.readFileSync(
  path.join(outputRoot, stylesheetPath),
  "utf8"
);
const hash = crypto.createHash("md5").update(stylesheet).digest("hex"); // create hash from stylesheet

pagePath.forEach((originalPath) => {
  const data = pageData[originalPath];
  const slug = data.path;

  // const dataContent = fs.readFileSync(originalPath, "utf8");

  // const data = JSON.parse(dataContent);

  const page = fixPage(data, { settings, data: pageData, pathCache });

  const content = renderToString(typeProcessor(page, { config, settings }));
  // Remove `html injected

  const helmet = Helmet.renderStatic(); // Extract head data

  const htmlString = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="stylesheet" href="${stylesheetPath}?bust=${
        // bust cache
        hash.slice(0, 6)
      }" />
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${content}</div>
    </body>
  </html>`;

  fs.mkdirSync(path.join(outputRoot, slug), { recursive: true }, (err) => {
    if (err) throw err;
  });

  // fs.writeFileSync(path.join(outputRoot, slug, outputHtml), htmlString);

  const formattedHtml = prettier
    .format(htmlString, { parser: "html" })
    .then((formattedHtml) => {
      fs.writeFileSync(path.join(outputRoot, slug, outputHtml), formattedHtml);

      console.log(`build  ${slug}`);
    });
});
