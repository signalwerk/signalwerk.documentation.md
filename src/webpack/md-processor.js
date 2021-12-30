import path, { dirname, resolve } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { parse } from "../md-parser/index.js";
import { write } from "../html-writer/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  content: { path: "./content" },
  build: { path: "./dist" },
};

// var builderRootPath = path.resolve(__dirname, "../..");
// var dataRootPath = path.resolve(builderRootPath, "../..");

let builderRootPath = path.resolve(__dirname, "../..");

if (process.env.AS_PACKAGE) {
  builderRootPath = path.resolve(__dirname, "../../../../");
}

var dataRootPath = path.resolve(builderRootPath, ".");
const contentPath = path.join(dataRootPath, config.content.path);
const buildPath = path.join(dataRootPath, config.build.path);

function generateHTML({ mdFile, destinationPath, isRoot }) {
  // create folder for desination
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

  // parse and write
  const content = fs.readFileSync(mdFile);
  const data = parse(`${content}`);

  const HTML = write({ data });

  fs.writeFileSync(destinationPath, `${HTML}`);
}

// Return a list of files of the specified file-ending in the provided dir
function getFilesFromDir(dir, fileEnding) {
  const filesToReturn = [];
  const stats = fs.statSync(dir);

  // it's a dir
  if (stats.isDirectory()) {
    function walkDir(currentPath) {
      const files = fs.readdirSync(currentPath);
      for (const i in files) {
        const curFile = path.join(currentPath, files[i]);
        if (fs.statSync(curFile).isFile() && curFile.endsWith(fileEnding)) {
          filesToReturn.push(curFile);
        } else if (fs.statSync(curFile).isDirectory()) {
          walkDir(curFile);
        }
      }
    }
    walkDir(dir);
  }

  if (stats.isFile()) {
    filesToReturn.push(dir);
  }
  return filesToReturn;
}

function changeExtension(file, extension) {
  const basename = path.basename(file, path.extname(file));
  return path.join(path.dirname(file), basename + extension);
}

function buildHTML({ compilation }) {
  // check if folder of content exists
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content folder doesn't exist (${contentPath})`);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    throw new Error(`Content path has to be a folder (${contentPath})`);
  }

  const mdFiles = getFilesFromDir(contentPath, ".md");

  mdFiles.forEach((mdFile) => {
    const relativePath = path.relative(contentPath, mdFile);
    const destinationPath = changeExtension(
      path.join(buildPath, relativePath),
      ".html"
    );

    // add for watcher
    // https://github.com/webpack/docs/wiki/how-to-write-a-plugin#monitoring-the-watch-graph
    compilation.fileDependencies.add(mdFile);

    generateHTML({
      //   template,
      mdFile,
      destinationPath,
      isRoot: relativePath === "index.md",
    });
  });
}

// function MarkdownPlugin(options) {
//   this.contentPath = path.join(dataRootPath, config.content.path);
//   this.buildPath = path.join(dataRootPath, config.build.path);
//   // this.exportPath = options.exportPath;

//   //   this.templateContent = fs.readFileSync(
//   //     path.join(builderRootPath, config.template.path),
//   //     { encoding: "utf8" }
//   //   );
// }

// MarkdownPlugin.prototype.apply = function (compiler) {
//   compiler.plugin("emit", (compilation, callback) => {
//     buildHTML({
//       //   templateContent: this.templateContent,
//       contentPath: this.contentPath,
//       buildPath: this.buildPath,
//       compilation,
//     });
//     callback();
//   });
// };

class MarkdownPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("Markdown Plugin", (compilation, callback) => {
      //   console.log("Hello World!");

      buildHTML({
        compilation,
      });
      callback();
    });
  }
}

export default MarkdownPlugin;
