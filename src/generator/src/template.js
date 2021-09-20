const fs = require("fs");
const path = require("path");

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

const replace = (content, object) => {
  let newContent = content.replace(/\{\{(.+?)\}\}/g, (match, path) => {
    const val = get(object, path);
    return val ? val : "";
  });
  return newContent;
};

function template(from, to, object) {
  const content = fs.readFileSync(from, { encoding: "utf8" });
  let newContent = replace(content, object);
  fs.writeFileSync(to, newContent);
}

// ES6 module
// const ROOT_PATH = path.resolve(
//   `/${path.dirname(import.meta.url).replace(/^file:\/\/\//, "")}/../../..`
// );
const ROOT_PATH = path.resolve(
  __dirname, `../../..`
);

exports.get = get;
exports.template = template;
exports.ROOT_PATH = ROOT_PATH;
