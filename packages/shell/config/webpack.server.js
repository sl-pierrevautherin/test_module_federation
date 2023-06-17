const path = require("path");
const shared = require("./webpack.shared");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("../package.json").dependencies;

module.exports = {
  ...shared,
  name: "server",
  target: "node",
  entry: "./src/server/index.ts",

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
      library: { type: "commonjs-module" },
      name: "client",
      remotes: {
        search: "search@http://localhost:3002/server/remoteEntry.js",
      },
      filename: "remoteEntry.js",
      shared: [
        ...Object.keys(pkgDependencies),
        "react/jsx-runtime",
        "react-dom/client",
      ].reduce((shared, name) => {
        shared[name] = {
          eager: false,
          singleton: true,
          requiredVersion: pkgDependencies[name],
        };

        return shared;
      }, {}),
    }),
  ],
};
