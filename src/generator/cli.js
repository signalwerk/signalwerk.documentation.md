import fs from "fs";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * https://gist.github.com/signalwerk/eadabea1fc42795ed8af2882693d20e1
 *
 * Return the value at `path` in `object`
 * @param {Object} object
 * @param {string|array} path
 * @returns {*} value if found otherwise undefined
 */
const get = (object, path) => {
  let parts = path;
  if (typeof path === "string" || typeof path === "number") {
    parts = `${path}`.split(/[\.\[\]\"\']{1,2}/).filter((part) => !!part);
  }
  return parts.reduce((acc, part) => (acc ? acc[part] : undefined), object);
};

// check
// https://github.com/Pinjasaur/templater.js/blob/master/src/templater.js
// https://github.com/jasonmoo/t.js

function replace(content, object) {
  let newContent = content.replace(/\{\{(.+?)\}\}/g, (match, path) => {
    const val = get(object, path);
    return val ? val : "";
  });
  return newContent;
}

function template(filename, object) {
  const from = path.resolve(__dirname, `./${filename}`);
  const to = path.resolve(__dirname, `../../../../${filename}`);
  fs.mkdirSync(path.dirname(to), { recursive: true });

  const content = fs.readFileSync(from, { encoding: "utf8" });
  let newContent = replace(content, object);
  fs.writeFileSync(to, newContent);
}

function copy(filename, toFilename) {
  const from = path.resolve(__dirname, `./${filename}`);
  const to = path.resolve(__dirname, `../../../../${toFilename || filename}`);
  fs.mkdirSync(path.dirname(to), { recursive: true });

  fs.copyFileSync(from, to);
}

/* -------------------------------- */
/* -------------------------------- */
/* -------------------------------- */
/* -------------------------------- */
/* -------------------------------- */

function config(key) {
  template("./config.json", { key });
}
function pkg(object) {
  template("./package.json", object);
  copy(".gitignore");
}

function example() {
  copy("../../content/index.md", "./content/index.md");
}

function nvm(object) {
  template("./.nvmrc", object);
}
function CNAME(object) {
  template("./static/CNAME", object);
}
function CI(object) {
  template("./.drone.yml", object);
}

if (process.argv) {
  const mode = get(process.argv, 2);

  if (mode === "setup") {
    const key = get(process.argv, 3);
    config(key);
    example();
    copy("root.css");
  }
  if (mode === "setup" || mode === "update") {
    const object = JSON.parse(fs.readFileSync(path.resolve("./config.json")));
    pkg(object);
    nvm(object);
    CNAME(object);
    CI(object);
  }
}
