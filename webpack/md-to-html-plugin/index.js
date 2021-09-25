/*
original:
https://github.com/KingZhang/markdown-html-webpack-plugin
*/

const fs = require("fs");
const path = require("path");

const { buildHTML } = require("./builder");
const { helpers: exampleHelper } = require("./plugin/example");
const { helpers: dateHelper } = require("./plugin/date");
const Handlebars = require("handlebars");

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

// wow this is ugly...
[...exampleHelper, ...dateHelper].forEach((plugin) =>
  Handlebars.registerHelper(plugin.name, (text, options) =>
    plugin.hanlder(Handlebars, text, options)
  )
);

// Handlebars.registerHelper("example", function (options) {
//   return new Handlebars.SafeString('<div class="mybold">' + "</div>");
// });

MarkdownPlugin.prototype.apply = function (compiler) {
  compiler.plugin("emit", (compilation, callback) => {
    buildHTML({
      templateContent: this.templateContent,
      contentPath: this.contentPath,
      buildPath: this.buildPath,
      compilation,
      Handlebars,
    });
    callback();
  });
};

module.exports = MarkdownPlugin;
