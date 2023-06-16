import { renderToString, renderToPipeableStream } from "react-dom/server";
import type { FastifyReply, FastifyRequest } from "fastify";

import App from "../client/App";

export const render2 = (_: FastifyRequest, reply: FastifyReply) => {
  const html = renderToString(<App />);

  reply.type("text/html");
  reply.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, width=device-width" />
</head>
<body>
    <div id="root">${html}</div>
    <script async data-chunk="main" src="http://localhost:3000/static/main.js"></script>
</body>
</html>`);
};

export default render2;
