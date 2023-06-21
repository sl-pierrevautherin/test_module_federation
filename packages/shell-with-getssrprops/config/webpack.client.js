const path = require("path");
const { webpackConfig, mfShared } = require("./webpack.shared");

const { UniversalFederationPlugin } = require("@module-federation/node");

module.exports = {
  ...webpackConfig,
  entry: "./src/client/index.ts",
  name: "client",
  target: "web",
  cache: false,
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3004/static/",
  },
  plugins: [
    new UniversalFederationPlugin({
      isServer: false,
      ...mfShared,
      remotes: {
        remote1: "remote1@http://localhost:3007/client/remoteEntry.js",
      },
    }),
  ],
};
