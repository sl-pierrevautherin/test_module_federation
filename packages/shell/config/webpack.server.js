const path = require("path");
const shared = require("./webpack.shared");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("../package.json").dependencies;

module.exports = {
  ...shared,
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
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        searchzz: "searchzz@http://localhost:3002/server/remoteEntry.js",
      },
      shared: [...Object.keys(pkgDependencies)].reduce((shared, name) => {
        shared[name] = {
          eager: true,
          singleton: true,
          requiredVersion: pkgDependencies[name],
        };

        return shared;
      }, {}),
    }),
  ],
};
