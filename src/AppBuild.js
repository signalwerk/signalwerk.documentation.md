import fs from "fs";
import path, { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import React from "react";
import { typeProcessor } from "./components";
// // import prettier from "prettier";
import { fixPage } from "./utils/fixPage.js";
import config from "../../../src/config.jsx";

const outputHtml = "./docs/index.html";

const __filename = process.argv[1] || fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainRoot = path.join(__dirname, "../../../../");

// console.log({ mainRoot, __filename: resolve(__filename) });

const dataContent = fs.readFileSync(
  path.join(mainRoot, "./content/2023-12-17-root.json"),
  "utf8"
);

const data = fixPage(JSON.parse(dataContent));

const content = renderToString(typeProcessor(data, config));
const helmet = Helmet.renderStatic(); // Extract head data

const htmlString = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${content}</div>
    </body>
  </html>`;

// const formattedHtml = await prettier.format(htmlString, { parser: "html" });
// fs.writeFileSync(outputHtml, formattedHtml);
fs.writeFileSync(path.join(mainRoot, outputHtml), htmlString);

console.log("!!!!!!! finish index");