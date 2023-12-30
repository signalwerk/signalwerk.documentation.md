import path, { join, dirname, resolve } from "path";

import fs from "fs";
import { getFilesFromDir } from "./src/getFilesFromDir.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const mainRoot = path.join(__dirname, "../../");
const contentRoot = path.join(mainRoot, "./content/pages");
const settingsPath = path.join(mainRoot, "src/settings.json");

export const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

export const pagePath = getFilesFromDir(contentRoot, ".json");
