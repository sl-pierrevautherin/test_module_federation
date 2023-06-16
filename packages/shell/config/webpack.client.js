const path = require("path");
const shared = require("./webpack.shared");
const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  ...shared,
  name: "client",
  entry: "./src/client/index.tsx",
  cache: false,
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3000/static/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "container.js",
      remotes: {
        remote1: "remote1@http://localhost:3001/client/remoteEntry.js",
      },
      shared: [{ react: deps.react, "react-dom": deps["react-dom"] }],
    }),
  ],
};
