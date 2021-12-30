import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { write } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileName = "test-parser";
const content = fs.readFileSync(
  resolve(__dirname, `../../md-parser/test/${fileName}.json`)
);

const data = JSON.parse(content, null, 2);

const HTML = write({ data });

fs.writeFileSync(
  resolve(__dirname, `./${fileName}.html`),
  `${HTML}`
);

console.log("-- end generator");
