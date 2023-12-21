// const express = require("express");
// const path = require("path");
import express from "express";
import path, { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const root = (app) => {
  const mainRoot = path.join(__dirname, "../../");

  // Logger middleware for debugging
  app.use((req, res, next) => {
    console.log("Requested URL:", req.originalUrl);
    next();
  });

  app.use(express.static(path.join(mainRoot, "admin")));

  // Serve the assets directory
  app.use("/public", express.static(path.join(mainRoot, "public")));
};


export default root;
