import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { parse } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function main() {
  const fileName = "test-parser";
  const content = fs.readFileSync(
    resolve(__dirname, `../../../content/${fileName}.md`)
  );

  const data = parse(`${content}`);

  fs.writeFileSync(
    resolve(__dirname, `./${fileName}.json`),
    JSON.stringify(data, null, 2)
  );

  console.log("-- finish parsed");
}

main();
