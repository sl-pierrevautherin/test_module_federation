const path = require("path");
const shared = require("./webpack.shared");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("../package.json").dependencies;
console.log({ pkgDependencies });
console.log(...Object.keys(pkgDependencies));

const sharedDeps = [...Object.keys(pkgDependencies)].reduce((shared, name) => {
  shared[name] = {
    eager: false,
    singleton: true,
    requiredVersion: pkgDependencies[name],
  };

  return shared;
}, {});

console.log({ sharedDeps });

module.exports = {
  ...shared,
  entry: "./src/client/index.ts",
  name: "client",
  target: "web",

  mode: "production",
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
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        searchzz: "searchzz@http://localhost:3002/client/remoteEntry.js",
      },
      shared: sharedDeps,
    }),
  ],
};
