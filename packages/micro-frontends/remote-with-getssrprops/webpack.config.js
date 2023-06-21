const path = require("path");
const { UniversalFederationPlugin } = require("@module-federation/node");

const pkgDependencies = require("./package.json").dependencies;

const DEV_PORT = 3007;

const applicationName = {
  client: "client",
  server: "server",
};
const remoteName = "remote1";

const mode = {
  development: "development",
  production: "production",
};

const baseConfig = {
  entry: "./src/index.ts",
  mode: mode.development,
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

const mfConfig = {
  name: "remote1",
  filename: "remoteEntry.js",
  exposes: {
    "./Remote": "./src/index.ts",
  },
  shared: [...Object.keys(pkgDependencies)].reduce((shared, moduleName) => {
    shared[moduleName] = {
      eager: false,
      singleton: true,
      requiredVersion: pkgDependencies[moduleName],
      strictVersion: false,
    };

    return shared;
  }, {}),
};

const clientConfig = {
  name: applicationName.client,
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
      ...mfConfig,
    }),
  ],
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
  name: applicationName.server,
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
      library: { type: "commonjs-module", name: "remote1" },
      ...mfConfig,
    }),
  ],
};

module.exports = [clientConfig, serverConfig];
