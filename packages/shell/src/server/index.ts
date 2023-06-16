import Fastify from "fastify";
import staticPlugin from "@fastify/static";
import { join } from "node:path";
import { RouteHandler } from "fastify";

const port = 3005;
const fastify = Fastify({
  logger: true,
});

fastify.register(staticPlugin, {
  prefix: "/static/",
  root: join(process.cwd(), "./dist/client"),
});

const render: RouteHandler = async (_, reply) => {
  const render2 = (await import("./render2")).default;

  return render2(_, reply);
};

fastify.get("*", render);

fastify.listen({ port }, (error) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
});
