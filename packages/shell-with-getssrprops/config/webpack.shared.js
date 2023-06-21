const pkgDependencies = require("../package.json").dependencies;

const webpackConfig = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};

const hostname = "shell";

const mfShared = {
  name: hostname,
  filename: "remoteEntry.js",

  shared: [...Object.keys(pkgDependencies)].reduce((shared, name) => {
    shared[name] = {
      eager: true,
      singleton: true,
      requiredVersion: pkgDependencies[name],
    };

    return shared;
  }, {}),
};

module.exports = { webpackConfig, mfShared, hostname };
