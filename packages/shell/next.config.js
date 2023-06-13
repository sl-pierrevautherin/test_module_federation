const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const navRemote = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return `nav@http://localhost:3003/_next/static/${location}/remoteEntry.js`;
};

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          remote: "remote@http://localhost:3001/remote.js",
          search: "search@http://localhost:3002/remoteEntry.js",
          nav: navRemote(options.isServer),
        },
        filename: "static/chunks/remoteEntry.js",
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );

    return config;
  },
};
