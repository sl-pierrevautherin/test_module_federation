const path = require("path");
const shared = require("./webpack.shared");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("../package.json").dependencies;
console.log({ pkgDependencies });
console.log(...Object.keys(pkgDependencies));

const sharedDeps = [...Object.keys(pkgDependencies)].reduce((shared, name) => {
  shared[name] = {
    eager: true,
    singleton: true,
    requiredVersion: pkgDependencies[name],
  };

  return shared;
}, {});

console.log({ sharedDeps });

module.exports = {
  ...shared,
  name: "client",
  entry: "./src/client/index.tsx",
  target: "web",
  cache: false,
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3005/static/",
  },
  plugins: [
    new UniversalFederationPlugin({
      isServer: false,
      name: "client",
      remotes: {
        search: "search@http://localhost:3002/client/remoteEntry.js",
      },
      filename: "remoteEntry.js",
      shared: sharedDeps,
    }),
  ],
};
