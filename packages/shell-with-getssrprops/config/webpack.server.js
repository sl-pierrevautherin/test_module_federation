const path = require("path");
const { webpackConfig, mfShared } = require("./webpack.shared");
const { UniversalFederationPlugin } = require("@module-federation/node");

module.exports = {
  ...webpackConfig,
  entry: "./src/server/index.ts",
  name: "server",
  target: false,

  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },

  stats: {
    colors: true,
  },

  plugins: [
    new UniversalFederationPlugin({
      isServer: true,
      ...mfShared,
      remotes: {
        remote1: "remote1@http://localhost:3007/server/remoteEntry.js",
      },
    }),
  ],
};
