const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack5: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "nav",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./nav": "./components/nav.js",
        },
        shared: {},
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );

    return config;
  },
};
