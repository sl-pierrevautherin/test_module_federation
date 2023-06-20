const path = require("path");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("./package.json").dependencies;

const DEV_PORT = 3002;

const baseConfig = {
  entry: "./src/index.ts",
  mode: "production",
  cache: false,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
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

const clientConfig = {
  name: "client",
  ...baseConfig,
  target: "web",
  output: {
    path: path.resolve(__dirname, "./dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: `http://localhost:${DEV_PORT}/client/`,
  },
  plugins: [
    new UniversalFederationPlugin({
      isServer: false,
      name: "searchzz",
      filename: "remoteEntry.js",
      exposes: {
        "./Search": "./src/index",
      },
      shared: [
        ...Object.keys(pkgDependencies),
        "react/jsx-runtime",
        "react-dom/client",
      ].reduce((shared, moduleName) => {
        shared[moduleName] = {
          eager: false,
          singleton: true,
          requiredVersion: pkgDependencies[moduleName],
          strictVersion: false,
        };

        return shared;
      }, {}),
    }),
  ],
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
  name: "server",
  ...baseConfig,
  target: false,
  output: {
    path: path.resolve(__dirname, "./dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  plugins: [
    new UniversalFederationPlugin({
      isServer: true,
      name: "searchzz",
      filename: "remoteEntry.js",
      library: { type: "commonjs-module", name: "searchzz" },
      exposes: {
        "./Search": "./src/index.ts",
      },
      shared: [
        ...Object.keys(pkgDependencies),
        "react/jsx-runtime",
        "react-dom/client",
      ].reduce((shared, moduleName) => {
        shared[moduleName] = {
          eager: false,
          singleton: true,
          requiredVersion: pkgDependencies[moduleName],
          strictVersion: false,
        };

        return shared;
      }, {}),
    }),
  ],
};

module.exports = [clientConfig, serverConfig];
