var path = require("path");
var fs = require("fs");

function jsonHelper({ Handlebars, config }, context, options) {
  const currentFolder = options.data.root.process.file.path.absolute.folder;
  const jsonFile = path.join(currentFolder, context);

  if (!fs.existsSync(jsonFile)) {
    throw new Error(`JSON doesn't exist (${jsonFile})`);
  }

  const json = require(jsonFile);

  return options.fn({ ...options.data.root, json });
}

const helpers = [{ name: "json", hanlder: jsonHelper }];

exports.helpers = helpers;
