var fs = require("fs");
var path = require("path");
var marked = require("marked");
var frontmatter = require("front-matter");
var hljs = require("highlight.js");
// const Handlebars = require("handlebars");

var mdReg = /\.md$/g;

function changeExtension(file, extension) {
  const basename = path.basename(file, path.extname(file));
  return path.join(path.dirname(file), basename + extension);
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

function buildHTML({
  templateContent,
  contentPath,
  buildPath,
  compilation,
  Handlebars,
}) {
  // check if folder of content exists
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content folder doesn't exist (${contentPath})`);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    throw new Error(`Content path has to be a folder (${contentPath})`);
  }

  const template = Handlebars.compile(templateContent);

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
      template,
      mdFile,
      destinationPath,
      isRoot: relativePath === "index.md",
      contentPath,
      Handlebars,
    });
  });
}

function generateHTML({
  template,
  mdFile,
  destinationPath,
  isRoot,
  contentPath,
  Handlebars,
}) {
  const mdContent = fs.readFileSync(mdFile, { encoding: "utf8" });
  const content = frontmatter(mdContent);

  const data = {
    process: {
      file: {
        root: {
          isRoot,
          path: path.relative(path.dirname(mdFile), contentPath),
        },
      },
      content: {
        frontmatter: content.attributes,
        body: { md: content.body, html: null },
      },
    },
  };

  const mdTemplate = Handlebars.compile(content.body);

  const body = marked(mdTemplate(data), {
    // highlight: function (code, lang) {
    //   return hljs.highlight(lang, code).value;
    // },

    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code, true).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    },
  });

  data.process.content.body.html = body;

  // generate desitnation path
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

  const HTML = template(data);

  fs.writeFileSync(destinationPath, HTML, { encoding: "utf8" });
}

exports.buildHTML = buildHTML;
