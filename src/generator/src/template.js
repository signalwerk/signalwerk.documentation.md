import fs from "fs";
import path from "path";

/**
 * https://gist.github.com/signalwerk/eadabea1fc42795ed8af2882693d20e1
 *
 * Return the value at `path` in `object`
 * @param {Object} object
 * @param {string|array} path
 * @returns {*} value if found otherwise undefined
 */
export const get = (object, path) => {
  let parts = path;
  if (typeof path === "string" || typeof path === "number") {
    parts = `${path}`.split(/[\.\[\]\"\']{1,2}/).filter((part) => !!part);
  }
  return parts.reduce((acc, part) => (acc ? acc[part] : undefined), object);
};

// check
// https://github.com/Pinjasaur/templater.js/blob/master/src/templater.js
// https://github.com/jasonmoo/t.js

const replace = (content, object) => {
  let newContent = content.replace(/\{\{(.+?)\}\}/g, (match, path) => {
    const val = get(object, path);
    return val ? val : "";
  });
  return newContent;
};

export function template(from, to, object) {
  const content = fs.readFileSync(from, { encoding: "utf8" });
  let newContent = replace(content, object);
  fs.writeFileSync(to, newContent);
}

// export const ROOT_PATH = path.resolve(path.dirname(import.meta.url), "../../../..");
export const ROOT_PATH = path.resolve(
  `/${path.dirname(import.meta.url).replace(/^file:\/\/\//, "")}/../../..`
);
