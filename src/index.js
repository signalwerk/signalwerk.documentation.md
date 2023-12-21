import { getFilesFromDir } from "./getFilesFromDir.js";
import path, { join, dirname, resolve } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the file URL of the current module
// const __filename = fileURLToPath(import.meta.url);

// // Get the directory name of the current module
// const __dirname = dirname(__filename);

export const pagePath = getFilesFromDir("../../content", ".json");
export const slugs = [];

export const config = {
  slugs: [],
  data: {},
};

pagePath.forEach((originalPath) => {
  const data = {
    path: originalPath,
    slug: null,
    file: {
      content: null,
      data: null,
    },
  };

  data.file.content = fs.readFileSync(join(".", `${originalPath}`), "utf-8");
  data.file.data = JSON.parse(data.file.content);

  let slug = data.file.data.path;
  if (!slug) {
    const pathComponents = originalPath.split(path.sep).slice(1); // Skip the first folder
    slug = pathComponents.join(path.sep).slice(0, -5); // Construct the slug without file ending
  }

  console.log({ slug });
  data.file.data.slug = slug;
  config.data[slug] = data;

  config.slugs.push(slug);
});

console.log("finish index");
