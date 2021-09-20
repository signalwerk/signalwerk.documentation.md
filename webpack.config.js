const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const markdownPlugin = require("./webpack/md-to-html-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// postcss plugins
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postcssVars = require("postcss-simple-vars");
const postcssCalc = require("postcss-calc");
const postcssNested = require("postcss-nested");
const postConditionals = require("postcss-conditionals");
const postcssPresetEnv = require("postcss-preset-env");
const PostCssPipelineWebpackPlugin = require("postcss-pipeline-webpack-plugin");
const criticalSplit = require("postcss-critical-split");
const postcssMqPacker = require("css-mqpacker");

const isProduction = process.env.NODE_ENV === "production";

const root = "./"; // __dirname

let localCSSsearch = "./src/main.css";
let localJSsearch = "./src/index.js";
let packageCSS = "./packages/signalwerk.documentation.md/root.css";
let rootCSS = packageCSS;

const aliasSearch = path.resolve(__dirname, "src/");

if (fs.existsSync(path.resolve(root, localCSSsearch))) {
  rootCSS = localCSSsearch;
}

const mainEntry = [path.resolve(root, rootCSS)];

if (fs.existsSync(path.resolve(root, localJSsearch))) {
  mainEntry.push(path.resolve(root, localJSsearch));
}

module.exports = {
  // webpack optimization mode
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",

  resolve: {
    alias: {
      "@": aliasSearch,
    },
    // extensions: [".css"],
  },

  // entry file(s)
  entry: {
    main: mainEntry,
  },

  // output file(s) and chunks
  output: {
    path: path.resolve(root, "dist"),
    filename: "index.js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpg|jpeg|png|woff|otf|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isProduction ? false : true,
            },
          },
          // Add PostCSS
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins() {
                return [
                  postcssImport(),
                  postcssVars({
                    variables: () => ({
                      debug: isProduction ? 0 : 1,
                    }),
                  }),
                  postcssCalc(),
                  postcssPresetEnv({
                    stage: 0,
                    browsers: ["last 2 versions", "IE > 10"],
                  }),
                  postConditionals(),
                  postcssNested(),
                  postcssMqPacker(),
                ];
              },
              // Enable sourcemaps in development
              sourceMap: isProduction ? false : true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // new CopyWebpackPlugin([{ from: path.resolve(root, "static"), to: "/" }]),

    // new CopyPlugin([
    //   {
    //     from: path.resolve(root, "static"),
    //     to: "/", // copies all files to dist/assets
    //   },
    // ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "./styles/[name].css",
      chunkFilename: "./styles/[id].css",
    }),

    new PostCssPipelineWebpackPlugin({
      suffix: "critical",
      processor: postcss([
        criticalSplit({
          output: criticalSplit.output_types.CRITICAL_CSS,
        }),
      ]),
    }),
    new PostCssPipelineWebpackPlugin({
      suffix: "rest",
      processor: postcss([
        criticalSplit({
          output: criticalSplit.output_types.REST_CSS,
        }),
      ]),
    }),
    new markdownPlugin({
      // filePath: "./content",
      // exportPath: "./dist/",
      // isEncodeName: false, // if need to encode file name, like chinese
      // template: "./public/index.html",
    }),
  ],

  // development server configuration
  devServer: {
    contentBase: path.join(root, "dist"),
    compress: true,
    port: 9001,
    watchContentBase: true,

    // open browser on server start
    // open: true
  },
};
