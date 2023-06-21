import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import { join } from "node:path";
import { RouteHandler } from "fastify";

const port = 3004;
const fastify = Fastify({
  logger: true,
});

fastify.register(staticPlugin, {
  prefix: "/static/",
  root: join(process.cwd(), "./dist/client"),
});

const render: RouteHandler = async (_, reply) => {
  const render = (await import("./render")).default;

  return render(_, reply);
};

fastify.get("*", render);

fastify.listen({ port }, (error) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
});
