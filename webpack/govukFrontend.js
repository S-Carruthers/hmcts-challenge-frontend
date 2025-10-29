const path = require('path');

const CopyWebPackPlugin = require("copy-webpack-plugin");

const rootExport = require.resolve("govuk-frontend");
const root = path.resolve(rootExport, "..");

const assets = path.resolve(root, "assets");
const fonts = path.resolve(assets, "fonts");
const images = path.resolve(assets, "images");

const sass = path.resolve(root, "all.scss");
const javascript = path.resolve(root, "all.js");
const components = path.resolve(root, "components");

const copyGovukTemplateAssets = new CopyWebPackPlugin({
  patterns: [
    { from: images, to: "assets/images" },
    { from: fonts, to: "assets/fonts" },
    { from: `${root}/components`, to: "../views/govuk/components" },
    { from: `${root}/template.njk`, to: "../views/govuk" },
  ]
});

module.exports = {
  paths: { template: root, components, sass, javascript, assets },
  plugins: [copyGovukTemplateAssets],
}
