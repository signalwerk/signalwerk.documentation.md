const fs = require("fs");
const path = require("path");
const { template, get, ROOT_PATH } = require("./src/generator/src/template.js");

function config(key) {
  const from = path.resolve(ROOT_PATH, "src/generator/config.json");
  const to = path.resolve("./config.json");

  template(from, to, { key });
}
function pkg(object) {
  const from = path.resolve(ROOT_PATH, "src/generator/package.json");
  const to = path.resolve("./package.json");
  template(from, to, object);
}
function CNAME(object) {
  const from = path.resolve(ROOT_PATH, "src/generator/static/CNAME");
  const to = path.resolve("./static/CNAME");
  template(from, to, object);
}
function CI(object) {
  const from = path.resolve(ROOT_PATH, "src/generator/.drone.yml");
  const to = path.resolve("./.drone.yml");
  template(from, to, object);
}

if (process.argv) {
  const mode = get(process.argv, 2);

  if (mode === "setup") {
    const key = get(process.argv, 3);

    config(key);
    pkg();
  }
  if (mode === "update") {
    const object = JSON.parse(
      fs.readFileSync(path.resolve("./config.json"), {
        encoding: "utf8",
      })
    );
    pkg(object);
    CNAME(object);
    CI(object);
  }
}
