const path = require("path");
const shared = require("./webpack.shared");
const {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require("@module-federation/node");
const deps = require("../package.json").dependencies;

module.exports = {
  ...shared,
  name: "server",
  target: false,
  entry: "./src/server/index.ts",

  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  plugins: [
    new NodeFederationPlugin({
      name: "shell",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      remotes: {
        remote1: "remote1@http://localhost:3001/server/remoteEntry.js",
      },
      shared: [{ react: deps.react, "react-dom": deps["react-dom"] }],
    }),
    new StreamingTargetPlugin({
      name: "shell",
      library: { type: "commonjs-module" },
      remotes: {
        remote1: "remote1@http://localhost:3001/server/remoteEntry.js",
      },
    }),
  ],
  stats: {
    colors: true,
  },
};
