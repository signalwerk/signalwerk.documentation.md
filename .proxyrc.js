// const express = require("express");
// const path = require("path");
import express from "express";
import path, { join, dirname, resolve } from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { getFilesFromDir } from "./src/getFilesFromDir.js";
import { fixPage } from "./src/utils/fixPage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainRoot = path.join(__dirname, "../../");
const contentRoot = path.join(mainRoot, "./content");

const settingsPath = path.join(mainRoot, "src/settings.json");
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

export const pagePath = getFilesFromDir(contentRoot, ".json");

const pathCache = {}; // map from slug to original path
const pageData = {}; // data with id = path

pagePath.forEach((originalPath) => {
  const content = fs.readFileSync(originalPath, "utf-8");
  const data = JSON.parse(content);
  pageData[originalPath] = data;
  let slug = data.path;
  pathCache[slug] = originalPath;
});

const root = (app) => {
  // Logger middleware for debugging
  app.use((req, res, next) => {
    console.log("Requested URL:", req.originalUrl);
    next();
  });

  app.use("/api", (req, res, next) => {
    const slug = req.originalUrl
      .replace("/api", "")
      .replace("index.json", "")
      .replace(/\/+/g, "/");

    // console.log("Requested URL:", req.originalUrl);
    // console.log("Requested slug:", slug);
    // console.log("Requested pathCache:", pathCache[slug]);

    // const content = fs.readFileSync(`${pathCache[slug]}`, "utf-8");
    // const data = JSON.parse(content);
    const data = pageData[pathCache[slug]];
    data.type = "page";

    const fixedData = fixPage(data, { settings, data: pageData, pathCache });

    res.end(JSON.stringify(fixedData, null, 3));
  });

  app.use(
    "/admin/config.yml",
    express.static(path.join(mainRoot, "src/config.yml"))
  );
  app.use("/config.yml", express.static(path.join(mainRoot, "src/config.yml")));

  // Serve the assets directory
  app.use("/assets", express.static(path.join(mainRoot, "public/assets")));
};

export default root;
