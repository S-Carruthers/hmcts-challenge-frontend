const path = require('path');

const govukFrontend = require(path.resolve(__dirname, "webpack/govukFrontend"));
const HtmlWebpack = require(path.resolve(__dirname, "webpack/htmlWebpack"));

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  plugins: [...govukFrontend.plugins, ...HtmlWebpack.plugins],
  entry: "/src/main/server.ts",
  target: "node",
  mode: devMode ? "development" : "production",
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader" ,
      exclude: /node_modules/
    }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "src/main/public"),
    filename: "bundle.js",
  }
};
