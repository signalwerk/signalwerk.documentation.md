/*
original:
https://github.com/KingZhang/markdown-html-webpack-plugin
*/

const fs = require("fs");
const path = require("path");

const { buildHTML } = require("./builder");

// var pluginPath = __dirname;
var builderRootPath = path.resolve(__dirname, "../..");
var rootPath = path.resolve(builderRootPath, "../..");

const config = {
  content: { path: "./content" },
  build: { path: "./dist" },
  // exportPath: "./dist/",
  // isEncodeName: false, // if need to encode file name, like chinese
  template: { path: "./src/templates/default.html" },
};

function MarkdownPlugin(options) {
  this.contentPath = path.join(rootPath, config.content.path);
  this.buildPath = path.join(rootPath, config.build.path);
  // this.exportPath = options.exportPath;

  this.templateContent = fs.readFileSync(
    path.join(builderRootPath, config.template.path),
    { encoding: "utf8" }
  );
}

MarkdownPlugin.prototype.apply = function (compiler) {
  compiler.plugin("emit", (compilation, callback) => {
    buildHTML({
      templateContent: this.templateContent,
      contentPath: this.contentPath,
      buildPath: this.buildPath,
      compilation,
    });
    callback();
  });
};

module.exports = MarkdownPlugin;
