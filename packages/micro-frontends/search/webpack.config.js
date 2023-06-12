const { ModuleFederationPlugin } = require("webpack").container;

const mfConfig = {
  plugins: [
    new ModuleFederationPlugin({
      name: "search",
      library: { type: "var", name: "search" },
      filename: "remoteEntry.js",
      exposes: {
        "./Search": "./src/Search",
      },
      shared: {
        react: {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "react-dom": {
          requiredVersion: false,
          singleton: true,
          version: "0",
        },
      },
    }),
  ],
};

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

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

  ...mfConfig,
};
