#!/usr/bin/env node
// const { execSync } = require("child_process");
// const fs = require("fs");
// const path = require("path");
import path, { join, dirname, resolve } from "path";
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the script name from the command line arguments
const scriptName = process.argv[2];

// Check if the script name is provided
if (!scriptName) {
  console.error("Error: No script name provided.");
  process.exit(1);
}

// Path to the package.json file
const packageJsonPath = path.join(__dirname, "../package.json");

// Read the package.json file
let packageJson;
try {
  const packageJsonRaw = fs.readFileSync(packageJsonPath, "utf8");
  packageJson = JSON.parse(packageJsonRaw);
} catch (error) {
  console.error(`Error reading package.json: ${error.message}`);
  process.exit(1);
}

// Check if the script exists
const scripts = packageJson.scripts;
if (!scripts || !scripts[scriptName]) {
  console.error(`Error: Script "${scriptName}" not found in package.json.`);
  process.exit(1);
}

// Execute the script
try {
  execSync(`npm run --prefix ./packages/signalwerk.documentation.md ${scriptName}`, { stdio: "inherit" });
} catch (error) {
  console.error(`Error executing script "${scriptName}": ${error.message}`);
  process.exit(1);
}
