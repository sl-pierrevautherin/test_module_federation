const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
            remote: "remote@http://localhost:3001/remote.js",
            search: "search@http://localhost:3002/remoteEntry.js",
          },
          filename: "static/chunks/remoteEntry.js",
        })
      );
    }

    return config;
  },
};
