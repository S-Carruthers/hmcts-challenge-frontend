const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const cssPath = path.resolve(__dirname, '../src/main/views/webpack/css-template.njk');
const jsPath = path.resolve(__dirname, '../src/main/views/webpack/js-template.njk');

const cssWebpackPlugin = new HtmlWebpackPlugin({
  template: cssPath,
  publicPath: "/",
  filename: cssPath.replace("-template", ""),
  inject: false,
});

const jsWebpackPlugin = new HtmlWebpackPlugin({
  template: jsPath,
  publicPath: "/",
  filename: jsPath.replace("-template", ""),
  inject: false,
});

module.exports = {
  plugins: [cssWebpackPlugin, jsWebpackPlugin],
};

/*
 TODO this is supposed to be copying css-template.njk and js-template.njk into webpack format, but where did those
  original files come from? It seems like they are generated but idk from where yet.
*/
