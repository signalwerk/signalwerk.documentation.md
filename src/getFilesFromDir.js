import fs from "fs";
import path, { resolve } from "path";

// Return a list of files of the specified file-ending in the provided dir
export function getFilesFromDir(dir, fileEnding) {
  try {
    const filesToReturn = [];

    console.log("stats start");
    const stats = fs.statSync(dir);
    console.log("stats end");

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
  } catch (err) {
    console.error(err);
    console.error(`couldn't read ${dir}`);
  }
}
