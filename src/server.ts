import Fastify, { FastifyInstance } from "fastify";
import { URLRoute } from "./routes/url.route";

export class Server {
  private readonly app: FastifyInstance = Fastify({
    logger: {
      level: "info",
      file: "logs/out.log",
    },
  });
  constructor() {
    this.routes();
  }

  private routes = () => {
    const routes = new URLRoute();
    this.app.register(routes.register);
  };

  public start = async () => {
    try {
      await this.app.listen({ port: 3000 });
      console.log(`🚀 Server listening on port 3000`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  };
}
