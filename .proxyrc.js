const express = require("express");
const path = require("path");

module.exports = function (app) {
  const mainRoot = path.join(__dirname, "../../");

  // Logger middleware for debugging
  app.use((req, res, next) => {
    console.log("Requested URL:", req.originalUrl);
    next();
  });

  app.use(express.static(path.join(mainRoot, "admin")));

  // Serve the assets directory
  app.use("/static", express.static(path.join(mainRoot, "static")));
};
