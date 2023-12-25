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

const outputHtml = "./index.html";

const __filename = process.argv[1] || fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainRoot = path.join(__dirname, "../../../../");
const outputRoot = path.join(mainRoot, "./docs");
const contentRoot = path.join(mainRoot, "./content");

export const pagePath = getFilesFromDir(contentRoot, ".json");

pagePath.forEach((originalPath) => {
  const dataContent = fs.readFileSync(originalPath, "utf8");

  const data = JSON.parse(dataContent);
  let slug = data.path;

  const page = fixPage(data);

  const content = renderToString(typeProcessor(page, { config, settings }));
  const helmet = Helmet.renderStatic(); // Extract head data

  const htmlString = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${content}</div>
    </body>
  </html>`;

  fs.mkdirSync(path.join(outputRoot, slug), { recursive: true }, (err) => {
    if (err) throw err;
  });

  const formattedHtml = prettier
    .format(htmlString, { parser: "html" })
    .then((formattedHtml) => {
      fs.writeFileSync(path.join(outputRoot, slug, outputHtml), formattedHtml);

      console.log(`build  ${slug}`);
    });
});
