import { Helmet } from "react-helmet";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import type { FastifyReply, FastifyRequest } from "fastify";

import App from "../client/App";

export default async (_: FastifyRequest, res: FastifyReply) => {
  const helmet = Helmet.renderStatic();
  const html = renderToString(<App />);

  res.type("text/html");
  res.send(`<!DOCTYPE html>
      <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body>
      <div id="root">
      ${html}
      </div>
      <script async data-chunk="main" src="http://localhost:3000/static/main.js"></script></body></html>`);
};
